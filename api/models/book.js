const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true,
        default: "Sabahattin Ali"
    },
    genre:{
        type:String,
        required:false,
        default: "Novel"
    },
    price:{
        type: Number,
        required: false,
        default: 1
    },
    date: {
        type: Date,
        default: new Date(),
        required: true
      }
}, {
  timestamps: true
});
module.exports = mongoose.model('Book', BookSchema);
