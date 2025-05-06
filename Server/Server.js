//Required libraries
/** express-web framework to handle routes API
 * mongoose - An ORM to work with mongodb easily
 * body parser-parsing incoming json requests
 * cors:Enables cross origin requests(from Angular)
 * dotenv : Loads environment Variable from .env file */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const url = "mongodb://localhost:27017";

// Load env variables
dotenv.config();

app = express();//Initialize express app
app.use(cors());// Allow cross-origin requests
app.use(bodyParser.json());//parse json requests bodies

const port = 5200;

// MongoDB Connection

mongoose.connect(process.env.MONGO_UTL || "mongodb://localhost:27017/db",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

//Defines the structure of restaurant documents (name, email, etc.).

//Creates a model Restaurent tied to the Restaurents collection in MongoDB
const restaurentSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    address: String,
    services: String
});



/**✅ Restaurent
This is your Mongoose model that represents the MongoDB collection 
(like a class for handling Restaurents) */
const Restaurent = mongoose.model('Restaurents', restaurentSchema);

// POST - Add restaurant
app.post('/posts',AddResto);

//use of async and await
async function AddResto(req, res){
  try {
    const newEntry = new Restaurent(req.body);//new model
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET - Get all restaurants
app.get('/posts', GetResto);

async function GetResto (req, res) {
  try {
    const data = await Restaurent.find();//fetches all document from the Restaurent collection
    res.json(data);// Send to client
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT - Update restaurant by ID

app.put('/posts/:id', UpdateResto);
//Finds a restaurant by MongoDB ObjectID (:id).
//Updates its fields with the request body
// {new : true} ensures the reponse contains the updated documet
async function UpdateResto (req, res) {
  try {
    //finds a document by its id   // updates it using given data //Returns the updated document (if { new: true } is set).
    const updated = await Restaurent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE - Delete restaurant by ID
app.delete('/posts/:id', DeleteResto);

async function DeleteResto(req, res) {
  const { id } = req.params;
  
  console.log("ID received:", id); // Log incoming ID

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ObjectId format" });
  }

  try {
    const deleted = await Restaurent.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.json({ message: "Restaurant deleted successfully", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Start server
const PORT = process.env.PORT || 5200;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



/****** Documentaion
 * app.post('/posts',AddResto);

//use of async and await
async function AddResto(req, res){
  try {
    const newEntry = new Restaurent(req.body);
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

app-instance of express
.post - defines an HTTP post route .this is used when you want to create new data on server
'/posts' – The URL path that this route will listen to. When a client sends a POST request to /posts, this route is triggered.
AddResto  = this name of function that will handle the request
async - Declares the function as asynchronous ,which allow you to use await inside function to handle asynchronous function
(req,res)These are the request and response objects provided by Express:
req (request) – contains data sent by the client, such as the body (in this case, req.body).

res (response) – used to send data back to the client.



*** const newEntry = new Restaurent(req.body)
const : declare a constant variable
new : Create a new instance of mongoose model
Restaurent : This is the Mongoose model representing the MongoDB collection 
(usually defined like: mongoose.model("Restaurents", schema)).
req.body - contains the json data sent by client in post

**** const savesEntry = await newEntry.save()
const savedEntry - Stores the result after saving docment to Mongodb
await - waits for the save() opration to complete before moving on
newEntry.save() : this saves the new document into mongodb collection

🔷 res.status(201).json(savedEntry);
res – The response object.

.status(201) – Sends HTTP status code 201, which means Created (used when something new is successfully added).

.json(savedEntry) – Sends the saved document back to the client in JSON format.

🔷 catch (err) { ... }
catch – Catches any error thrown inside the try block.

err – The error object containing error message/details.

🔷 res.status(500).json({ error: err.message });
status(500) – Sends HTTP status 500, which means Internal Server Error.

.json({ error: err.message }) – Sends a JSON response with the error message.


 */

/**✅ req.params.id
Extracts the id from the URL path, like /posts/:id.

 */