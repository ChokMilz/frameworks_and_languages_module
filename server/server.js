const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello Duke Obi!')
})

let ITEMS=[
  {
    "id": 0,
    "user_id": "user1234",
    "keywords": ["hammer", "nails","tools"],
    "description": "A hammer and nails set",
    "lat": 51.2798438,
    "lon": 1.0830275,
    "date_from": "2023-10-23T13:31:01.434Z",
    "date_to": "2023-10-23T13:31:01.434Z"
  }
]

let id = 1;

app.post('/item', (req, res)  => {
  if(Object.keys(req.body).toString() != "user_id,keywords,description,lat,lon")
  {
    res.status(405).json({ error: "message: missing fields"});
  }
  else
  {
    const currentDate = new Date().toISOString();
    const identity = id++;
    //const identity = Math.floor(Math.random() * 1000);

    req.body.id= identity;
    req.body['date_from'] = currentDate;
    req.body['date_to'] = currentDate;

    //req.body['id'] = identity;
  
    ITEMS.push(req.body)
    return res.status(201).json(req.body)
    //console.log("Successful POST Request")
  }
})

app.get('/items', (req, res) => {
  res.status(200).json(ITEMS)
})

app.get('/item/:id', (req, res) => {
  for(let j of ITEMS)
  {
    if (j.id==req.params.id)
    {
      return res.status(200).json(j)
    }
  }
  return res.status(404).json({message:"not found"})
})


app.delete('/item/:id', (req, res) => {
  let ID = req.params.id
  //console.log ("delete ITEMS")
  //console.log (ITEMS)
  if(ITEMS[ID]) {
    //console.log("delete in the future" + req.params.id)
    ITEMS = ITEMS.filter((item) => item.id!=req.params.id)
    return res.status(204).json()
  }
  else {
    return res.status(404).json({message :"NO ID"});
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
process.on('SIGINT', function() {process.exit()})