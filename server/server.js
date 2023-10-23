const express = require('express')
const app = express()
const port = 8000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Duke Obi!')
})

let ITEMS=[
  {
  
    "id": 0,
    "user_id": "user1234",
    "keywords": [
      "hammer",
      "nails",
      "tools"
    ],
    "description": "A hammer and nails set",
    "image": "https://placekitten.com/200/300",
    "lat": 51.2798438,
    "lon": 1.0830275,
    "date_from": "2023-10-23T13:31:01.434Z",
    "date_to": "2023-10-23T13:31:01.434Z"
  }
]

app.get('/items', (req, res) => {
  res.json(ITEMS)
  res.status(200).json("Message:","Successful GET requests")
})

app.post('/item', (req, res)  => {
  if(Object.keys(req.body).toString() != "user_id,keywords,description,lat,lon")
  {
    return res.status(405).json({"message": "missing fields"})
  }
  else
  {
    const currentDate = new Date().toISOString();
    const identity =  Math.random();

    req.body.id= identity;
    req.body['date_from'] = currentDate;
    req.body['id'] = identity;
  
    ITEMS.push(req.body)
    res.status(201).json(req.body)
    console.log("Successful POST Request")
  }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
process.on('SIGINT', function() {process.exit()})