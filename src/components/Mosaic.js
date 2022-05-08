import { Col } from "react-bootstrap";
import  Image from "react-bootstrap/Image";

function Mosaic(props) {
    const urls = props.urls;
    const images = urls?.map((url) => <Image src={url} />);

    return (
        <Col className="mosaic justify-content-center">
            {images}
        </Col>
    );
};

export default Mosaic;