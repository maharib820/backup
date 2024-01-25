const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 9999;

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://demo:demo@cluster0.8ydx2m5.mongodb.net/?retryWrites=true&w=majority";

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
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection

        // main code start
        const servicesCollection = client.db('ecobin').collection('servicesCollection');

        app.post("/addservice", async (req, res) => {
            const data = req.body;
            console.log(data);
            const result = await servicesCollection.insertOne(data);
            res.send(result);
        })

        app.get("/allservices", async (req, res) => {
            const result = await servicesCollection.find().toArray();
            res.send(result)
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('EcoBin server is currently running')
})

app.listen(port, () => {
    console.log(`EcoBin server is currently running on port ${port}`)
})