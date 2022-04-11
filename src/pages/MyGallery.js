import Mosaic from '../components/Mosaic';
import "../components/App.css";

function MyGallery() {
    let urls = ["https://picsum.photos/400?random=1",
  "https://picsum.photos/400?random=2",
  "https://picsum.photos/400?random=3",
  "https://picsum.photos/400?random=4",
  "https://picsum.photos/400?random=5",
  "https://picsum.photos/400?random=6"]
  return (
    <div>
      <Mosaic urls={urls}/>
    </div>
  );
}

export default MyGallery;