const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const restaurantRoutes = require('./routes/restaurent');
const userRoutes = require('./routes/user');
dotenv.config();

app = express();//Initialize express app
app.use(cors());// Allow cross-origin requests
app.use(bodyParser.json());//parse json requests bodies


mongoose.connect(process.env.MONGO_UTL || "mongodb://localhost:27017/db",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));


app.use('/restaurants', restaurantRoutes);
app.use('/users', userRoutes);



const PORT = process.env.PORT || 5200;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
