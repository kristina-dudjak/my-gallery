import axios from "axios";

class Api {
  static async getImages() {
    let imagePosts = [];
    await axios.get("http://localhost:3000/images").then((res) => {
      imagePosts = res.data;
    });
    return imagePosts;
  }

  static async getImagesByQuery(query) {
    let imagePosts = [];
    await axios.get("http://localhost:3000/search?q=" + query).then((res) => {
      imagePosts = res.data;
    });
    return imagePosts;
  }
}
export default Api;
