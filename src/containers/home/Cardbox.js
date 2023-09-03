import React from "react";
import Card from "react-bootstrap/Card";
import BoxLoader from "../../components/BoxLoader";
import { Link } from 'react-router-dom';

const Cardbox = (props) => {
  const { bg, key, text, style, className, cardName, data, isLoader, redirectTo } = props;
  return (
    <>
      <Card bg={bg} key={key} text={text} style={style} className={className}>
        <Link to={redirectTo}>
          <Card.Body>
            <Card.Title>{cardName}</Card.Title>
            <Card.Text>{data}</Card.Text>
          </Card.Body>
        </Link>
        {isLoader ? <BoxLoader /> : null}
      </Card>

    </>
  );
};

export default Cardbox;
