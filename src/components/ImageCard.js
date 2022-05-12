import { Card, Container } from "react-bootstrap";

function ImageCard(props) {
  const post = props.post;

  return (
    <Card className="image-card">
      <Card.Img variant="top" src={post.smallImage} />
      <Card.Body>
        <Card.Title>Photo by {post.name} on Unsplash</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default ImageCard;
