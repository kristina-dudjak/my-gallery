import Search from "../components/Search";
import "../App";
import Mosaic from "../components/Mosaic";
import Api from "../Api";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ImageModal from "../components/ImageModal";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const { query } = useParams();
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();
  const [modalPost, setModalPost] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (query) {
      Api.getImagesByQuery(query).then((e) => setPosts(e));
    } else {
      Api.getImages(currentUser.uid).then((e) => {
        setPosts(e);
      });
    }
  }, [query, modalPost]);

  function showModal(post) {
    setModalPost(post);
  }

  function hideModal() {
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
