const PORT = 3000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const BASE_URL = "https://api.unsplash.com/";
const key = process.env.REACT_APP_UNSPLASHED_API_KEY;

const app = express()


app.use(cors())

app.get('/images', (req, res) => {
    axios
      .get(BASE_URL + "photos?page=1&client_id=" + key)
      .then((response) => {
        res.json(response.data.map((e) => e.urls.small))
      });
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))