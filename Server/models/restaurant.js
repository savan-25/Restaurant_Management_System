const mongoose = require('mongoose');

const restaurentSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    address: String,
    services: String
});

module.exports = mongoose.model('Restaurent',restaurentSchema);