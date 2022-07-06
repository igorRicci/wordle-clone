const PORT = 3000
const axios = require("axios")
const express = require("express")
require('dotenv').config()

const app = express()

app.get('/word', (req, res) => {

  const options = {
    method: 'GET',
    url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
    params: {count: '5', wordLength: '5'},
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
    }
  }

  axios.request(options).then(function (response) {
    console.log(response.data)
    res.json(response.data[0])
  }).catch((error) => {
    console.error(error)
  })
})

app.listen(PORT, () => console.log('Server running on port ' + PORT))
