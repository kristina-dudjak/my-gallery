import Search from "../components/Search";
import "../App";
import Mosaic from "../components/Mosaic";
import Api from "../Api";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

function Home() {
  const [images, setImages] = useState(null);

  useEffect(() => {
    Api.getImages().then((e) => setImages(e));
  }, []);

  function onSearch(query) {
      if( query != null){
        Api.getImagesByQuery(query).then((e) => setImages(e));
      }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Search onSearch={onSearch} />
        </Col>
      </Row>

      <Row>
          <Mosaic urls={images } />
      </Row>
    </Container>
  );
}

export default Home;
