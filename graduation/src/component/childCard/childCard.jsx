import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useChild } from "../../assets/useRef/ChildContext";
import NavbarM from "../navbarMom/NavbarM";
import "./ChildCard.css";
import ComparisonChild from "../ComparisonChild/ComparisonChild";
import Footer1 from "../Footer/Footer1";

function ChildCard() {
  const { childId } = useParams();
  const { setID } = useChild();
  const [measurements, setMeasurements] = useState({});

  useEffect(() => {
    setID(childId);
    fetch(
      `http://localhost:4007/api/mother/MotherChildCard/childCard/${childId}`
    )
      .then((response) => response.json())
      .then((data) => setMeasurements(data))
      .catch((error) => console.error("Error fetching measurements:", error));
  }, [childId, setID]);

  return (
    <div>
      <NavbarM />
      <div className="table-comp">
        <div>
          <Card
            style={{ width: "18rem", height: "auto" }}
            className="card-child"
          >
            <Card.Img
              className="card-img"
              variant="top"
              src="https://img.freepik.com/vetores-premium/desenho-de-rosto-de-menino-bonito_18591-41511.jpg?w=740"
            />
            <Card.Body>
              <Card.Title>اسم الطفل :</Card.Title>
              <Card.Text>رقم الهوية: {childId}</Card.Text>
              <Card.Text>العمر: {measurements.age} شهور</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <span className="label">الوزن:</span>{" "}
                <span className="value">{measurements.weight}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="label">الطول:</span>{" "}
                <span className="value">{measurements.height}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="label">محيط الراس:</span>{" "}
                <span className="value">{measurements.head_circumference}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="label">فيتامين A+D:</span>{" "}
                <span className="value">{measurements.vitamin_A_D}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="label">كبسولة فيتامين A:</span>{" "}
                <span className="value">{measurements.vitamin_capsule_A}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="label">الحديد:</span>{" "}
                <span className="value">{measurements.Iron}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
        <div className="comp">
          <ComparisonChild measurements={measurements} />
        </div>
      </div>
      <Footer1 />
    </div>
  );
}

export default ChildCard;
