import axios from "axios";
import { set, ref, get, remove } from "firebase/database";
import { db } from "./firebase.js";
import { useAuth } from "./contexts/AuthContext";
const PORT = "3001";

class Api {
  static async getImages(pageNumber) {
    let imagePosts = [];
    const currentUser = useAuth;
    const gallery = await this.readGallery();

    await axios
      .get("http://localhost:" + PORT + "/images?page=" + pageNumber)
      .then((res) => {
        imagePosts = res.data;
        imagePosts
          .forEach((post) => {
            if (
              currentUser.uid !== undefined &&
              gallery.find((galleryPost) => galleryPost.id === post.id)
            ) {
              post.inGallery = true;
            }
          })
          .catch((err) => {
            let message =
              typeof err.response !== "undefined"
                ? err.response.data.message
                : err.message;
            console.warn("error", message);
          });
      });
    return imagePosts;
  }

  static async getImagesByQuery(query, pageNumber) {
    let imagePosts = [];
    await axios
      .get(
        "http://localhost:" +
          PORT +
          "/search?q=" +
          query +
          "&page=" +
          pageNumber
      )
      .then((res) => {
        imagePosts = res.data;
      })
      .catch((err) => {
        let message =
          typeof err.response !== "undefined"
            ? err.response.data.message
            : err.message;
        console.warn("error", message);
      });
    return imagePosts;
  }

  static async saveImagePost(user, imagePost) {
    if (user !== null) {
      set(ref(db, `users/${user.uid}/gallery/${imagePost.id}/`), {
        smallImage: imagePost.smallImage,
        fullImage: imagePost.fullImage,
        authorName: imagePost.authorName,
        authorProfileImage: imagePost.authorProfileImage,
        authorLink: imagePost.authorLink,
        inGallery: true,
      });
    } else {
      console.warn("error", "Saving image post failed.");
    }
  }

  static async readGallery(uid) {
    const userRef = ref(db, `users/${uid}/gallery/`);
    let rawData;
    var data = [];
    await get(userRef).then((snapshot) => {
      rawData = snapshot.val();
      if (rawData) {
        Object.keys(rawData).forEach(function (key) {
          rawData[key].id = key;
          data.push(rawData[key]);
        });
      } else {
        console.warn("error", "Reading gallery failed.");
      }
    });
    return data;
  }

  static async removeFromGallery(uid, imagePost) {
    if (imagePost) {
      remove(ref(db, `users/${uid}/gallery/${imagePost.id}`));
    } else {
      console.warn("error", "Removing image post failed.");
    }
  }

  static async downloadImage(imagePost) {
    const image = await fetch(imagePost.fullImage);

    const nameSplit = imagePost.fullImage.split("/");
    const imageName = nameSplit.pop();

    const imageBlob = await image.blob();
    const imageURL = URL.createObjectURL(imageBlob);
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = imagePost.authorName + "/" + imageName + ".jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
export default Api;
