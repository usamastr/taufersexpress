import { MongoClient } from 'mongodb';

export default async (req, res) => {
    switch (req.method) {
        // case "GET":
        //     await getallProducts(req, res)
        //     break
        case "POST":
            await saveProduct(req, res)
            break
    }
}


// const getallProducts = async (req, res) => {
//     try {
//         const products = await Product.find()
//         res.status(200).json(products)
//     } catch (err) {
//         console.log(err)
//     }

// }


const saveProduct = async (req, res) => {

    const { pName, category, price, details, mediaUrl } = req.body;

    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db(process.env.MONGODB_DB);

    try {
        if (!pName || !category || !price || !details || !mediaUrl) {
            return res.status(422).json({ error: "Please add all the fields" })
        }

        // Insert the form data into the collection
        const product = await db.collection('FoodItem').insertOne({
            name: pName,
            category: category,
            price: price,
            details: details,
            imageUrl: mediaUrl,
        });

        res.status(201).json(product)
    } catch (err) {
        res.status(500).json({ error: "internal server error" })
        console.log(err)
    }


}

// import { MongoClient } from 'mongodb';

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         const { pName, category, price, details, image } = req.body;

//         // Connect to MongoDB
//         const client = await MongoClient.connect(process.env.MONGODB_URI);
//         const db = client.db(process.env.MONGODB_DB);

//         // Insert the form data into the collection
//         await db.collection('FoodItem').insertOne({
//             pName,
//             category,
//             price,
//             details,
//             image
//         });

//         // Close the MongoDB connection
//         client.close();

//         res.status(200).json({ message: 'Form submitted successfully!' });
//     } else {
//         res.status(405).json({ message: 'Method Not Allowed' });
//     }
// }