import { Card, ListGroup }from "react-bootstrap";

interface CardFieldProps {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}


export default function CardField({ Title, Year, imdbID, Type, Poster }: CardFieldProps) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={Poster} />
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>IMDB Id: {imdbID}</ListGroup.Item>
        <ListGroup.Item>Year: {Year}</ListGroup.Item>
        <ListGroup.Item>Type: {Type}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
