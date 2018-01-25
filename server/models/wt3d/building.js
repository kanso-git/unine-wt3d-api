const mongoose = require('mongoose');


const BuildingSchema = new mongoose.Schema({
  description: {
    type: String,
    require: false,
    minlength: 6
  },
  buildingIds: {
    type: Array,
    require: true
  },
  buildingRouteUrl: {
    type: String,
    require: true
  },
  serviceOffices: [{
    code: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }],
  secretarias: [{
    code: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }],
  elevators: {
    type: Array,
    require: true
  },
  stairs: {
    type: Array,
    require: true
  },
  wcs: {
    type: Array,
    require: true
  },
  otherTabs: [{
    _localType: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    sortOrder: {
      type: Number,
      required: true
    }
  }],
  buildingRouteExceptions: [{
    localCode: {
      type: String,
      required: true
    },
    floorId: {
      type: Number,
      required: true
    }
  }],
  buildingRouteExclud: [{
    localCode: {
      type: String,
      required: true
    },
    msg: {
      type: String,
      required: true
    }
  }],
  updateDate: {
    type: Number,
    default: null
  },
  _editor: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  }, creationDate: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  }
});

const Building = mongoose.model('Building', BuildingSchema);

module.exports = {Building};
