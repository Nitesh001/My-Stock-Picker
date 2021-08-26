import React from "react";
import { Card } from "react-bootstrap";

const PickerCard:React.FC<{title: string, value: string}> = ({title, value}) => {
  return (
    <Card tabIndex={0}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {value}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PickerCard;