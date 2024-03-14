const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5050;


//middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mujahid.frqpuda.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const ProductCollection = client.db("BazarBD").collection("Product-Collection");

    app.get('/addProduct', async (req, res) =>{
        const result = await ProductCollection.find().toArray();
        res.send(result)
    })

    
    await client.connect();
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  
  } 
}
run().catch(console.dir);


app.get('/', (req,res) =>{
    res.send('Bazar running server')
})

app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
})