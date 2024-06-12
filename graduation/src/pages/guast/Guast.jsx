import React, { useEffect, useState } from "react";
import CardArticle from "../../component/ArticleD/CardArticle";
import "./Guast.css";

const Guest = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4804/api/Mother/home")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched articles:", data); // Debugging line
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          console.error("Fetched data is not an array:", data);
          setError(data.error || "Unknown error occurred");
        }
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setError("Failed to fetch articles");
      });
  }, []);


  return (
    <div>
      <nav className="navbar">
        <button className="nav-button">
          <a href="/login">تسجيل الدخول</a>
        </button>
      </nav>
      <div className="articleCard">
        {" "}
        {articles.map((article) => (
          <CardArticle
            key={article.ID}
            title={article.Title}
            paragraph={article.text}
            image={article.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Guest;
