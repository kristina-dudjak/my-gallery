import Mosaic from "../components/Mosaic";
import Api from "../Api";
import "../App";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

function MyGallery() {
  const [images, setImages] = useState(null);

  useEffect(() => {
    Api.getImages().then((e) => setImages(e));
  }, []);

  return (
    <Container>
      <Row>
          <Mosaic urls={images} />
      </Row>
    </Container>
  );
}

export default MyGallery;
