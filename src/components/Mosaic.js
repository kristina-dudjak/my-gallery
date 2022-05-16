import { Col, Row, Container } from "react-bootstrap";
import ImageCard from "./ImageCard";

function Mosaic(props) {
  const posts = props.posts;
  const cards = posts.map((post) => (
    <Col>
      <ImageCard post={post} onClick={() => props.onImageClick(post)} />
    </Col>
  ));

  return (
    <Container className="d-flow">
      <Row xs={12} md={3}>
        {cards}
      </Row>
    </Container>
  );
}

export default Mosaic;
