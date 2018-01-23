const mongoose = require('mongoose');


const LocationSchema = new mongoose.Schema({
  _building: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  code: {
    type: String,
    require: true,
    unique: true
  },
  displayName: {
    type: String,
    require: false,
    minlength: 6
  },
  zoomScale: {
    type: Number,
    require: true,
    default: 20
  },
  floorId: {
    type: Number,
    require: true
  },
  xCoordinate: {
    type: Number,
    require: true
  },
  yCoordinate: {
    type: Number,
    require: true
  },
  zCoordinate: {
    type: Number,
    require: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = {Location};
