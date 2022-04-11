import  Image from "react-bootstrap/Image";

const Mosaic = (props) => {
    let images = [];
    for (let i = 0; i < props.urls.length; i++) {
        const url = props.urls[i];
        images[i] = <Image className="image" src={url} />
    }
    return (
        images
    );
};

export default Mosaic;