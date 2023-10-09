import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../Utils/apiFunctions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Piechart from "./Piechart";
import Barchart from "./Barchart";
import Cardbox from "./Cardbox";

const Home = () => {
    const navigate = useNavigate();
    const [isLoader, setIsloader] = useState(false);
    const [isToster, setIsToster] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const [data, setData] = useState(0);
    useEffect(() => {
        getCardData();
    }, []);
    const getCardData = async () => {
        setIsloader(true);
        const getResponse = await get(`http://localhost:8081/cardCounts`);
        if (getResponse) {
          setIsloader(false);
        }
        if (getResponse.status === 200 && !getResponse.error) {
          setData(getResponse.data);
        } else {
          if (getResponse.status === 403) {
            navigate("/Unauthorized");
          } else {
            setErrorData(getResponse);
            setIsToster(true);
          }
        }
      };
  return (
    <Container className="pt-4">
      <Row>
        <Col xs={6} md={4}>
          <Cardbox 
            cardName="Total Transactions"
            bg="primary"
            key="Primary"
            text="light"
            style={{ width: "18rem" }}
            className="mb-2 w-100 d-flex position-relative reportLink"
            data={data?.total || 0}
            isLoader={isLoader}
            redirectTo="Report"
          />
        </Col>
        <Col xs={6} md={4}>
        <Cardbox 
             cardName="Completed Transactions"
             bg="success"
             key="Success"
             text="light"
             style={{ width: "18rem" }}
             className="mb-2 w-100 d-flex position-relative reportLink"
             data={data?.completed || 0}
             isLoader={isLoader}
             redirectTo="CompletedTransactions"
          />
        </Col>
        <Col xs={6} md={4}>
        <Cardbox 
             cardName="Pending Transactions"
             bg="danger"
             key="Danger"
             text="light"
             style={{ width: "18rem" }}
             className="mb-2 w-100 d-flex position-relative reportLink"
             data={data?.pending || 0}
             isLoader={isLoader}
             redirectTo="PendingTransactions"
          />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs={6} md={6} className="position-relative">
          <Barchart />
        </Col>
        <Col xs={6} md={6} className="position-relative piechart">
          <div className="piechart-wrp"><Piechart /></div>
          
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
