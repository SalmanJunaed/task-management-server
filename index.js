const express =require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const jwt = require('jsonwebtoken');
// const { JsonWebTokenError } = require('jsonwebtoken');
require('dotenv').config();
const port = process.env.PORT || 5000;


//middlewares
app.use(cors())
app.use(express.json());

//DB_USER=task-manager
//DB_PASS=7education17
//${process.env.DB_USER}:${process.env.DB_PASS}



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rw04ymy.mongodb.net/?retryWrites=true&w=majority`;

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
        await client.connect();//

        //Database COllection
        const taskCollection = client.db('taskManagerDB').collection('taskList');



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });//
        console.log("Pinged your deployment. You successfully connected to MongoDB!");//
        } finally {
    // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res)=>{
    res.send('Task Management Server is Running...')
})

app.listen(port, () => {
    console.log(`Task Management running on port.. ${port}`);
})
