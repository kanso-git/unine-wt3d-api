const mongoose = require('mongoose');


const LocalTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  refId: {
    type: Number,
    required: true
  }
});

const LocalType = mongoose.model('LocalType', LocalTypeSchema);

module.exports = {LocalType};
