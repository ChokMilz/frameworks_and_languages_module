const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello Duke Obi!')
})

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
  });
let ITEMS= [
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
 
//let id = 1;

// app.get('item/:id', (req, res)=>{
//   const item = ITEMS.find(i =>i.id ===req.params.id);
//   if(item){
//     return res.status(200).json(item)
//   }else{
//     return res.status(404).json({message: 'Item not found'})
//   }

// });

 

app.post('/item', (req, res) => {
    const requiredFields = ['user_id', 'keywords', 'description', 'lat', 'lon'];
    // this are required field

    if (!requiredFields.every(field => req.body.hasOwnProperty(field))) 
    // if the required field are not there send 405
    {
      return res.status(405).json({"Message": "Missing fields...Please investigate"});
    }
  else
  {

        // set to int

    const identity = Math.floor(Math.random() * 100);
    const timestamp = new Date().toISOString();

    const newItem = {
      "id": identity,
      "user_id": req.body.user_id,
      "keywords": req.body.keywords,
      "description": req.body.description,
      "image": req.body.image,
      "lat": req.body.lat,
      "lon": req.body.lon,
      "date_from": timestamp,
      "date_to": timestamp,
    };

    //req.body['id'] = identity;

    ITEMS.push(newItem)
    //res.status(201).json(req.body)
    //console.log("Successful POST Request")

    return res.status(201).json(newItem)

    //console.log("Successful POST Request") Janidu assist
  }
})

// Endpoint to get all items

app.get('/items', (req, res) => {
    res.status(200).json(ITEMS);
  });
  // Endpoint to get a single item by ID

  app.get('/item/:id', (req, res) => {
    // Convert the id from string to number for comparison
    const requestedId = parseInt(req.params.id, 10);

    // Find the item with the matching ID

    const item = ITEMS.find(item => item.id === requestedId);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  });

  app.delete('/item/:id', (req, res) => {
    // Assuming IDs are integers, parse the ID from the request parameters
    const id = parseInt(req.params.id, 10);

    // Find the index of the item with the matching ID

    const itemIndex = ITEMS.findIndex(item => item.id === id);
    // Check if the item exists

    if (itemIndex === -1) {
      // If the item is not found, return a 404 status with an appropriate error message

      return res.status(404).json({ error: 'Item not found' });
    }
    // Remove the item from the array

    ITEMS.splice(itemIndex, 1);
    // Return a 204 status code indicating successful deletion without returning content

    return res.status(204).send();
  });

// app.delete('/item/:id', (req, res) => {
//   //Talked with Janidu
//   const id = parseFloat(req.params.id);
//   const item = ITEMS.findIndex(item => item.id === id)
//   if (item === -1)
//   {
//     return res.status(404).json({ error : 'NO ID' });
//   }
//   ITEMS.splice(item, 1)
//   return res.status(204).json()

  //const itemExists = ITEMS.some(item => item.id == ID);
  //if(!itemExists) {
  //  return res.status(404).json({ error : 'NO ID' });
  //}
  //ITEMS = ITEMS.filter((item) => item.id != ID);
  //console.log ("delete ITEMS")
  //console.log (ITEMS)
  //check items exist
  //if(ITEMS[ID]) {
    //console.log("delete in the future" + req.params.id)
    //ITEMS = ITEMS.filter((item) => item.id!=req.params.id)
    //return res.status(204).json()
// }
// else {
    //return res.status(404).json({message :"NO ID"});
  //}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
process.on('SIGINT', function() {process.exit()})