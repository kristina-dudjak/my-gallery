const PORT = 3000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const BASE_URL = "https://api.unsplash.com/";
const key = process.env.REACT_APP_UNSPLASHED_API_KEY;

const app = express();

app.use(cors());

app.get("/images", (req, res) => {
  axios
    .get(BASE_URL + "photos", { params: { page: 1, client_id: key } })
    .then((response) => {
      var data = [];
      response.data.forEach((e) => {
        var imagePost = {};
        imagePost.smallImage = e.urls.small;
        imagePost.fullImage = e.urls.full;
        imagePost.authorName = e.user.name;
        imagePost.authorProfileImage = e.user.profile_image.small;
        imagePost.authorLink = e.user.links.html;
        data.push(imagePost);
      });
      res.json(data);
    });
});

app.get("/search", (req, res) => {
  axios
    .get(BASE_URL + "search/photos", {
      params: { page: 1, query: req.query.q, client_id: key },
    })
    .then((response) => {
      var data = [];
      response.data.results.forEach((e) => {
        var imagePost = {};
        imagePost.smallImage = e.urls.small;
        imagePost.fullImage = e.urls.full;
        imagePost.authorName = e.user.name;
        imagePost.authorProfileImage = e.user.profile_image.small;
        imagePost.authorLink = e.user.links.html;
        data.push(imagePost);
      });
      res.json(data);
    });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
