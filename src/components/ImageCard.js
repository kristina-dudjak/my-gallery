import { Card } from "react-bootstrap";

function ImageCard(props) {
  const post = props.post;

  return (
    <Card className="image-card">
      <Card.Img onClick={props.onClick} src={post.smallImage} />
      <Card.Body>
        <Card.Title>
          Photo by
          <a href={post.authorLink}> {post.authorName} </a>
          on Unsplash
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default ImageCard;
