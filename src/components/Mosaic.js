import { Col, Row, Card, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import ImageCard from "./ImageCard";

function Mosaic(props) {
  const posts = props.posts;
  const cards = posts.map((post) => (
    <Col xs={12} md={4}>
      <ImageCard post={post} />
    </Col>
  ));

  return (
    <Container className="d-flow">
      <Row>{cards}</Row>
    </Container>
  );
}

export default Mosaic;
