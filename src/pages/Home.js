import Search from "../components/Search";
import "../App";
import Mosaic from "../components/Mosaic";
import Api from "../Api";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ImageModal from "../components/ImageModal";

function Home() {
  const { query } = useParams();
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();
  const [modalPost, setModalPost] = useState(null);

  useEffect(() => {
    if (query) {
      Api.getImagesByQuery(query).then((e) => setPosts(e));
    } else {
      Api.getImages().then((e) => {
        setPosts(e);
      });
    }
  }, [query]);

  function showModal(post) {
    setModalPost(post);
  }

  function hideModal(post) {
    setModalPost(null);
  }

  function onSearch(query) {
    navigate(`/photos/${query}`);
  }

  return (
    <Container>
      {modalPost && <ImageModal post={modalPost} onClose={hideModal} />}
      <Row>
        <Col>
          <Search onSearch={onSearch} />
        </Col>
      </Row>

      {posts && (
        <Row>
          <Mosaic posts={posts} onImageClick={showModal} />
        </Row>
      )}
    </Container>
  );
}

export default Home;
