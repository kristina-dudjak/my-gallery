const PORT = 3001;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const BASE_URL = "https://api.unsplash.com/";
const key = process.env.REACT_APP_UNSPLASHED_API_KEY;
const app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/images", (req, res) => {
  axios
    .get(BASE_URL + "photos", {
      params: { page: req.query.page, client_id: key, per_page: 18 },
    })
    .then((response) => {
      var data = [];
      response.data.forEach((e) => {
        var imagePost = {};
        imagePost.id = e.id;
        imagePost.smallImage = e.urls.small;
        imagePost.fullImage = e.urls.full;
        imagePost.authorName = e.user.name;
        imagePost.authorProfileImage = e.user.profile_image.small;
        imagePost.authorLink = e.user.links.html;
        data.push(imagePost);
      });
      res.json(data);
    })
    .catch((err) => {
      let message =
        typeof err.response !== "undefined"
          ? err.response.data.message
          : err.message;
      console.warn("error", message);
    });
});

app.get("/search", (req, res) => {
  axios
    .get(BASE_URL + "search/photos", {
      params: {
        page: req.query.page,
        query: req.query.q,
        client_id: key,
        per_page: 18,
      },
    })
    .then((response) => {
      var data = [];
      response.data.results.forEach((e) => {
        var imagePost = {};
        imagePost.id = e.id;
        imagePost.smallImage = e.urls.small;
        imagePost.fullImage = e.urls.full;
        imagePost.authorName = e.user.name;
        imagePost.authorProfileImage = e.user.profile_image.small;
        imagePost.authorLink = e.user.links.html;
        data.push(imagePost);
      });
      res.json(data);
    })
    .catch((err) => {
      let message =
        typeof err.response !== "undefined"
          ? err.response.data.message
          : err.message;
      console.warn("error", message);
    });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
