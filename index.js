const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tcjah.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        await client.connect();
        const inventoriesCollections = client.db('Features').collection('products');
        const featuresProductsCollections = client.db('Features').collection('products');

        // inventories api
        app.get('/inventories', async (req, res) => {
            const query = {};
            const cursor = inventoriesCollections.find(query);
            const inventories = await cursor.limit(6).toArray();
            res.send(inventories);
        })
        app.get('/inventoriesCount', async (req, res) => {
            const count = await inventoriesCollections.estimatedDocumentCount();
            res.send({ count });
        })

        // features Products api 
        app.get('/products', async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const query = {};
            const cursor = featuresProductsCollections.find(query);
            let products;
            if (page || size) {
                products = await cursor.skip(page * size).limit(size).toArray();
            }
            else {
                products = await cursor.toArray();
            }
            res.send(products);
        })
        // features Products Count api 
        app.get('/productsCount', async (req, res) => {
            const count = await featuresProductsCollections.estimatedDocumentCount();
            res.send({ count })
        })


    }
    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('StorageDevicesServer')
})

app.listen(port, () => {
    console.log('storage-devices-server runing on ', port)
})