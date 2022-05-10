import axios from "axios";

class Api {

  static async getImages() {
    let images = [];
    await axios
      .get("http://localhost:3000/images")
      .then((res) => {
        images = res.data;
      });
    return images;
  }

  static async getImagesByQuery(query) {
    let images = [];
    await axios
      .get("http://localhost:3000/search?q=" + query
      )
      .then((res) => {
        images = res.data;
      });
      console.log(images);
    return images;
  }
}
export default Api;
