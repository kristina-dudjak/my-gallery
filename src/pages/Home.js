import Search from "../components/Search";
import "../App";
import Mosaic from "../components/Mosaic";
import Api from "../Api";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function Home() {
  const { query } = useParams();
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      Api.getImagesByQuery(query).then((e) => setPosts(e));
    } else {
      Api.getImages().then((e) => {
        setPosts(e);
      });
    }
  }, [query]);

  function onSearch(query) {
    navigate(`/photos/${query}`);
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
