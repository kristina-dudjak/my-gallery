import { Button, Image } from "react-bootstrap";
import { Modal } from "react-bootstrap";

function ImageModal(props) {
  const post = props.post;

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
        <Button variant="primary">Save to gallery</Button>
        <Button variant="primary">Download</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageModal;
