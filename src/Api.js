import axios from "axios";

const BASE_URL = "https://api.unsplash.com/";

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
    console.log(query);
    await axios
      .get(
        BASE_URL +
          "search/photos?page=1&query=" +
          query +
          "&client_id=" 
          //+ CLIENT_ID
      )
      .then((res) => {
        images = res.results.map((e) => e.urls.small);
      });
      console.log(images);
    return images;
  }
}
export default Api;
