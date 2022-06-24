import ImageCard from "./ImageCard";

function Mosaic(props) {
  const posts = props.posts;
  const cards = posts.map((post) => (
    <div className="imageCard">
      <ImageCard  post={post} onClick={() => props.onImageClick(post)} />
    </div>
  ));

  return (
    <div className="container__cards">
      <div >
        {cards}
      </div>
    </div>
  );
}

export default Mosaic;
