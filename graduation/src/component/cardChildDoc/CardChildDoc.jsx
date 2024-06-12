import React from "react";
import { useChild } from "../../assets/useRef/ChildContext"; // Ensure the path is correct
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./CardChildDoc.css";

function CardChildDoc({ first_name, last_name, BOD, ID }) {
  const { setID } = useChild(); // Using setID from the context

  const calculateAgeInMonths = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let months = (today.getFullYear() - birth.getFullYear()) * 12;
    months -= birth.getMonth();
    months += today.getMonth();
    return months < 0 ? 0 : months;
  };

  const ageInMonths = calculateAgeInMonths(BOD);

  const handleClick = () => {
    setID(ID);
  };

  return (
    <div className="CardChildDoc" onClick={handleClick}>
      <Card
        style={{ width: "18rem", height: "30rem", margin: "80px 25px 0px 0px" }}
        className="card-child"
      >
        <Card.Img
          variant="top"
          className="card-img"
          src="https://img.freepik.com/vetores-premium/desenho-de-rosto-de-menino-bonito_18591-41511.jpg?w=740"
        />
        <Card.Body>
          <Card.Title>
            {first_name} {last_name}
          </Card.Title>
          <Card.Text>{ID}</Card.Text>
          <Card.Text>العمر: {ageInMonths} شهر</Card.Text>
        </Card.Body>
        <Card.Body className="card-buttons buttons-card">
          <Button variant="success" className="btn-child-doc">
            <Link to={`/Doctor/child/Vac/${ID}`} className="link-style">
              التطعيمات
            </Link>
          </Button>
          <Button variant="success" className="btn-child-doc">
            <Link to="/doctor/measurement" className="link-style">
              القياسات
            </Link>
          </Button>
          <Button variant="success" className="btn-child-doc">
            <Link to="/doctor/child/ChildInfoPage" className="link-style">
              التفاصيل
            </Link>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardChildDoc;
