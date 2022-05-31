import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Api from "../Api";
import { useAuth } from "../contexts/AuthContext";

function ImageModal(props) {
  const post = props.post;

  const { currentUser } = useAuth();

  const [inGallery, setInGallery] = useState(post.inGallery);

  function addToGallery() {
    Api.saveImagePost(currentUser.uid, post);
    post.inGallery = true;
    setInGallery(post.inGallery);
  }

  function removeFromGallery() {
    post.inGallery = false;
    setInGallery(post.inGallery);
    Api.removeFromGallery(currentUser.uid, post);
  }

  return (
    <Modal
      show={true}
      onHide={props.onClose}
      centered
      dialogClassName="dialog-image"
    >
      <Modal.Header closeButton>
        <Modal.Title>{post.authorName}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{<Image src={post.fullImage} />}</Modal.Body>

      <Modal.Footer>
        {post.inGallery ? (
          <Button variant="primary" onClick={removeFromGallery}>
            Remove from gallery
          </Button>
        ) : (
          <Button variant="primary" onClick={addToGallery}>
            Save to gallery
          </Button>
        )}
        <Button variant="primary">Download</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageModal;
