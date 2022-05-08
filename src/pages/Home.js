import Search from "../components/Search";
import "../components/App.css";
import Mosaic from "../components/Mosaic";
import Api from "../Api";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

function Home() {
  const [images, setImages] = useState(null);

  useEffect(() => {
    Api.getImages().then((e) => setImages(e));
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Search />
        </Col>
      </Row>

      <Row>
          <Mosaic urls={images } />
      </Row>
    </Container>
  );
}

export default Home;
