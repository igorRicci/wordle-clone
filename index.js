const PORT = 8000
const axios = require("axios")
const express = require("express")

const app = express()

app.get('/word', (req, res) => {

  const options = {
    method: 'GET',
    url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
    params: {count: '5', wordLength: '5'},
    headers: {
      'X-RapidAPI-Key': 'eae2bac4f8msh4aa5d6ab73ea64ep1d11c9jsn02f95144693c',
      'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
    }
  }

  axios.request(options).then(function (response) {
    console.log(response.data)
  }).catch((error) => {
    console.error(error)
  })
})

app.listen(PORT, () => console.log('Server running on port ' + PORT))
