import Mosaic from "../components/Mosaic";
import Api from "../Api";
import "../App";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import ImageModal from "../components/ImageModal";
import { useAuth } from "../contexts/AuthContext";

function MyGallery() {
  const [posts, setPosts] = useState(null);
  const [modalPost, setModalPost] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      Api.readGallery(currentUser.uid).then((e) => {
        setPosts(e);
      });
    }
  }, [currentUser, modalPost]);

  function showModal(post) {
    setModalPost(post);
  }

  function hideModal() {
    setModalPost(null);
  }

  return (
    <Container>
      {modalPost && <ImageModal post={modalPost} onClose={hideModal} />}
      {posts && (
        <Row>
          <Mosaic posts={posts} onImageClick={showModal} />
        </Row>
      )}
    </Container>
  );
}

export default MyGallery;
