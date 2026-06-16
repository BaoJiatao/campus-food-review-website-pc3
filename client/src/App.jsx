import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const stalls = [
    {
      id: 1,
      name: "Chicken Rice Stall",
      category: "Asian Food",
      location: "Campus Cafeteria Level 1",
      openingHours: "9:00 AM - 5:00 PM",
      priceRange: "$5 - $8",
      rating: 4.2,
      image:
        "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
      description:
        "A popular lunch option for students who want a quick, affordable, and filling meal between classes.",
      menu: [
        { item: "Chicken Rice", price: "$5.50" },
        { item: "Roasted Chicken Rice", price: "$6.00" },
        { item: "Chicken Noodle", price: "$5.00" },
      ],
      reviews: [
        {
          name: "Student",
          rating: 4,
          comment: "Good price and fast service.",
        },
        {
          name: "Student",
          rating: 4,
          comment: "The chicken rice is tasty, but the queue can be long.",
        },
      ],
    },
    {
      id: 2,
      name: "Noodle House",
      category: "Chinese Food",
      location: "Library Cafe",
      openingHours: "10:00 AM - 6:00 PM",
      priceRange: "$4 - $7",
      rating: 4.0,
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
      description:
        "A convenient noodle stall near the library, suitable for students who want a simple meal while studying.",
      menu: [
        { item: "Dry Noodle", price: "$4.50" },
        { item: "Soup Noodle", price: "$5.00" },
        { item: "Dumpling Noodle", price: "$6.50" },
      ],
      reviews: [
        {
          name: "Student",
          rating: 4,
          comment: "Affordable and filling.",
        },
        {
          name: "Student",
          rating: 4,
          comment: "Good option when I need a quick lunch.",
        },
      ],
    },
    {
      id: 3,
      name: "Western Corner",
      category: "Western Food",
      location: "Student Hub",
      openingHours: "11:00 AM - 7:00 PM",
      priceRange: "$6 - $10",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=800&q=80",
      description:
        "A western food stall with larger portions, suitable for students who want a heavier meal.",
      menu: [
        { item: "Chicken Chop", price: "$7.50" },
        { item: "Fish and Chips", price: "$8.00" },
        { item: "Pasta", price: "$6.80" },
      ],
      reviews: [
        {
          name: "Student",
          rating: 5,
          comment: "Large portion and good taste.",
        },
        {
          name: "Student",
          rating: 4,
          comment: "A bit expensive, but the food quality is good.",
        },
      ],
    },
    {
      id: 4,
      name: "Healthy Bowl Bar",
      category: "Healthy Food",
      location: "Sports Hall Cafe",
      openingHours: "8:30 AM - 4:30 PM",
      priceRange: "$6 - $9",
      rating: 4.4,
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
      description:
        "A healthier option for students who prefer rice bowls, vegetables, and lighter meals.",
      menu: [
        { item: "Teriyaki Chicken Bowl", price: "$7.20" },
        { item: "Salmon Rice Bowl", price: "$8.80" },
        { item: "Vegetable Protein Bowl", price: "$6.50" },
      ],
      reviews: [
        {
          name: "Student",
          rating: 4,
          comment: "Fresh ingredients and good for a light lunch.",
        },
        {
          name: "Student",
          rating: 5,
          comment: "My favourite place after gym sessions.",
        },
      ],
    },
    {
      id: 5,
      name: "Cafe Express",
      category: "Drinks & Snacks",
      location: "Main Building Lobby",
      openingHours: "8:00 AM - 8:00 PM",
      priceRange: "$2 - $6",
      rating: 4.1,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      description:
        "A quick stop for coffee, tea, pastries, and snacks before or after class.",
      menu: [
        { item: "Iced Latte", price: "$4.50" },
        { item: "Hot Cappuccino", price: "$4.00" },
        { item: "Butter Croissant", price: "$3.20" },
      ],
      reviews: [
        {
          name: "Student",
          rating: 4,
          comment: "Good coffee, but it gets busy in the morning.",
        },
        {
          name: "Student",
          rating: 4,
          comment: "Convenient location and nice snacks.",
        },
      ],
    },
    {
      id: 6,
      name: "Malay Cuisine Corner",
      category: "Asian Food",
      location: "Campus Cafeteria Level 2",
      openingHours: "10:00 AM - 6:30 PM",
      priceRange: "$5 - $9",
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      description:
        "A campus stall serving rice dishes and local flavours with generous portions.",
      menu: [
        { item: "Nasi Lemak", price: "$5.80" },
        { item: "Beef Rendang Rice", price: "$8.50" },
        { item: "Curry Chicken Rice", price: "$6.80" },
      ],
      reviews: [
        {
          name: "Student",
          rating: 4,
          comment: "The portion is generous and the price is fair.",
        },
        {
          name: "Student",
          rating: 5,
          comment: "The rendang is very flavourful.",
        },
      ],
    },
  ];

  const [selectedStall, setSelectedStall] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Default");
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState("5");
  const [reviewComment, setReviewComment] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState(() => {
    const savedReviews = localStorage.getItem("campusBiteReviews");

    if (savedReviews) {
      return JSON.parse(savedReviews);
    }

    return {};
  });

  const categories = [
    "All",
    "Asian Food",
    "Chinese Food",
    "Western Food",
    "Healthy Food",
    "Drinks & Snacks",
  ];

  useEffect(() => {
    localStorage.setItem("campusBiteReviews", JSON.stringify(submittedReviews));
  }, [submittedReviews]);

  function handleExploreClick() {
    document.getElementById("stalls")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleViewDetails(stall) {
    setSelectedStall(stall);

    setTimeout(() => {
      document.getElementById("details")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function handleClearFilters() {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortOption("Default");
  }

  function handleSubmitReview(event) {
    event.preventDefault();

    if (!selectedStall || reviewComment.trim() === "") {
      alert("Please write a review before submitting.");
      return;
    }

    const newReview = {
      name: reviewName.trim() || "Anonymous",
      rating: Number(reviewRating),
      comment: reviewComment.trim(),
    };

    setSubmittedReviews((previousReviews) => {
      const stallReviews = previousReviews[selectedStall.id] || [];

      return {
        ...previousReviews,
        [selectedStall.id]: [...stallReviews, newReview],
      };
    });

    setReviewName("");
    setReviewRating("5");
    setReviewComment("");
  }

  const filteredStalls = stalls
    .filter((stall) => {
      const keyword = searchTerm.toLowerCase();

      const matchesSearch =
        stall.name.toLowerCase().includes(keyword) ||
        stall.category.toLowerCase().includes(keyword) ||
        stall.location.toLowerCase().includes(keyword) ||
        stall.priceRange.toLowerCase().includes(keyword);

      const matchesCategory =
        selectedCategory === "All" || stall.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === "Rating High to Low") {
        return b.rating - a.rating;
      }

      if (sortOption === "Price Low to High") {
        const priceA = Number(a.priceRange.match(/\d+/)[0]);
        const priceB = Number(b.priceRange.match(/\d+/)[0]);
        return priceA - priceB;
      }

      return 0;
    });

  const allReviews = selectedStall
    ? [
        ...selectedStall.reviews,
        ...(submittedReviews[selectedStall.id] || []),
      ]
    : [];

  const averageRating =
    allReviews.length > 0
      ? (
          allReviews.reduce((total, review) => total + review.rating, 0) /
          allReviews.length
        ).toFixed(1)
      : selectedStall?.rating;

  const totalReviews = stalls.reduce(
    (total, stall) =>
      total +
      stall.reviews.length +
      (submittedReviews[stall.id]?.length || 0),
    0
  );

  const totalCategories = categories.length - 1;

  const highestRatedStall = stalls.reduce((bestStall, currentStall) =>
    currentStall.rating > bestStall.rating ? currentStall : bestStall
  );

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">CampusBite</div>

        <div className="nav-links">
          <a href="#stalls">Food Stalls</a>
          <a href="#details">Details</a>
          <a href="#reviews">Reviews</a>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <span className="tagline">Campus Food Review Platform</span>

          <h1>Find the best food on campus</h1>

          <p>
            Browse campus food stalls, compare prices, check opening hours, and
            read student reviews before deciding what to eat.
          </p>

          <button className="hero-button" onClick={handleExploreClick}>
            Explore Food Stalls
          </button>
        </div>
      </header>

      <main className="container">
        <section className="section-heading" id="stalls">
          <h2>Popular Campus Food Stalls</h2>
          <p>
            Choose a stall to view its menu, location, ratings, opening hours,
            and student reviews.
          </p>
        </section>

        <section className="stats-section">
          <div className="stat-card">
            <strong>{stalls.length}</strong>
            <span>Food Stalls</span>
          </div>

          <div className="stat-card">
            <strong>{totalCategories}</strong>
            <span>Categories</span>
          </div>

          <div className="stat-card">
            <strong>{totalReviews}</strong>
            <span>Student Reviews</span>
          </div>

          <div className="stat-card">
            <strong>{highestRatedStall.name}</strong>
            <span>Highest Rated Stall</span>
          </div>
        </section>

        <section className="search-section">
          <input
            type="text"
            placeholder="Search by stall name, cuisine type, location, or price..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </section>

        <section className="filter-section">
          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </section>

        <section className="sort-section">
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
          >
            <option value="Default">Default Order</option>
            <option value="Rating High to Low">Rating: High to Low</option>
            <option value="Price Low to High">Price: Low to High</option>
          </select>

          <button onClick={handleClearFilters}>Clear Filters</button>
        </section>

        <section className="stall-list">
          {filteredStalls.map((stall) => (
            <div className="stall-card" key={stall.id}>
              <img src={stall.image} alt={stall.name} className="stall-image" />

              <div className="stall-content">
                <div className="card-top">
                  <span className="category-badge">{stall.category}</span>
                  <span className="rating-badge">★ {stall.rating}</span>
                </div>

                <h3>{stall.name}</h3>

                <p className="stall-info">📍 {stall.location}</p>
                <p className="stall-info">💰 {stall.priceRange}</p>
                <p className="stall-info">🕒 {stall.openingHours}</p>

                <button onClick={() => handleViewDetails(stall)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </section>

        {filteredStalls.length === 0 && (
          <p className="no-results">No food stalls found. Try another keyword.</p>
        )}

        {selectedStall && (
          <section className="details-section" id="details">
            <div className="details-header">
              <div>
                <span className="category-badge">{selectedStall.category}</span>
                <h2>{selectedStall.name}</h2>
                <p>{selectedStall.description}</p>
                <p>{selectedStall.location}</p>
              </div>

              <div className="details-rating">★ {averageRating}</div>
            </div>

            <div className="details-grid">
              <div className="details-box">
                <h3>Menu</h3>

                {selectedStall.menu.map((food, index) => (
                  <div className="menu-row" key={index}>
                    <span>{food.item}</span>
                    <strong>{food.price}</strong>
                  </div>
                ))}

                <h3>Stall Information</h3>

                <div className="menu-row">
                  <span>Opening Hours</span>
                  <strong>{selectedStall.openingHours}</strong>
                </div>

                <div className="menu-row">
                  <span>Price Range</span>
                  <strong>{selectedStall.priceRange}</strong>
                </div>
              </div>

              <div className="details-box" id="reviews">
                <h3>Recent Reviews</h3>

                {allReviews.map((review, index) => (
                  <div className="review-card" key={index}>
                    <div className="review-header">
                      <strong>{review.name}</strong>
                      <span>★ {review.rating}</span>
                    </div>
                    <p>“{review.comment}”</p>
                  </div>
                ))}

                <form className="review-form" onSubmit={handleSubmitReview}>
                  <h3>Add Your Review</h3>

                  <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={reviewName}
                    onChange={(event) => setReviewName(event.target.value)}
                  />

                  <select
                    value={reviewRating}
                    onChange={(event) => setReviewRating(event.target.value)}
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Poor</option>
                    <option value="1">1 - Very Poor</option>
                  </select>

                  <textarea
                    placeholder="Write your review..."
                    value={reviewComment}
                    onChange={(event) => setReviewComment(event.target.value)}
                  />

                  <button type="submit">Submit Review</button>
                </form>
              </div>
            </div>

            <button
              className="close-button"
              onClick={() => setSelectedStall(null)}
            >
              Close Details
            </button>
          </section>
        )}

                <section className="about-section">
          <div className="about-content">
            <span className="tagline dark">About CampusBite</span>

            <h2>Helping students choose food faster</h2>

            <p>
              CampusBite is a simple campus food review website designed for
              students who want to compare food stalls, prices, opening hours,
              and reviews before deciding what to eat.
            </p>

            <div className="about-grid">
              <div className="about-card">
                <h3>Search</h3>
                <p>Find stalls by name, cuisine type, location, or price range.</p>
              </div>

              <div className="about-card">
                <h3>Compare</h3>
                <p>Check ratings, menus, prices, and opening hours in one place.</p>
              </div>

              <div className="about-card">
                <h3>Review</h3>
                <p>Students can share their own food experience and rating.</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div>
            <strong>CampusBite</strong>
            <p>A campus food review website for students.</p>
          </div>

          <p>© 2026 CampusBite. Created for CP3407 project work.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;