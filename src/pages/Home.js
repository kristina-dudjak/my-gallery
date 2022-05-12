import Search from "../components/Search";
import "../App";
import Mosaic from "../components/Mosaic";
import Api from "../Api";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

function Home() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    Api.getImages().then((e) => {
      setPosts(e);
    });
  }, []);

  function onSearch(query) {
    if (query !== "") {
      Api.getImagesByQuery(query).then((e) => setPosts(e));
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Search onSearch={onSearch} />
        </Col>
      </Row>

      {posts != null && (
        <Row>
          <Mosaic posts={posts} />
        </Row>
      )}
    </Container>
  );
}

export default Home;
