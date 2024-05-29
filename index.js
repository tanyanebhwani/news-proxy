require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// Default route for root URL
app.get('/', (req, res) => {
  res.send('News Proxy Server is running');
});

app.get('/proxyNewsApi/country/:country/category/:category/page/:page/pageSize/:pageSize', (req, res) => {
  const { country , category , page , pageSize } = req.params;
  const apiKey = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
  axios.get(url)
    .then(response => res.json(response.data))
    .catch(error => res.status(500).send(error.message));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
