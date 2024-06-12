import React, { useEffect, useState } from "react";
import Slider from "../../../component/slider/Slider";
import Footer1 from "../../../component/Footer/Footer1";
import NavbarM from "../../../component/navbarMom/NavbarM";
import CardArticle from "../../../component/ArticleD/CardArticle";
import "./Home.css";

const Home = () => {
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
    <div className="home">
      <div>
        <div className="navbar1">
          <NavbarM />
        </div>
        <div className="link-website">
          الموقع الرسمي لوزارة الصحة الفلسطينية
          <a href="https://site.moh.ps/">
            -> <span className="link-website-btn"> اضغط هنا</span>
          </a>
        </div>
        <div>
          <Slider />
        </div>
        {error ? (
          <div className="error-message">Error: {error}</div>
        ) : (
          <div className="articleCard">
            {articles.map((article) => (
              <CardArticle
                key={article.ID}
                title={article.Title}
                paragraph={article.text}
                image={article.image}
                Link={article.Link}
              />
            ))}
          </div>
        )}
        <div></div>
        {/* <Footer1 /> */}
      </div>
    </div>
  );
};

export default Home;
