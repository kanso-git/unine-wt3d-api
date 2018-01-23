const {LocalType} = require('../models/wt3d/localType');
const {Building} = require('../models/wt3d/building');
const {Location} = require('../models/wt3d/location');

const {ObjectID} = require('mongodb');
const _ = require('lodash');

// GET request for list of all wt3d.
exports.wt3d_list = async(req, res) => {
  try {
    const locations = await Location.find({});
    res.send({locations});
  } catch (e) {
    res.status(400).send(e);
  }
};

const localTypes = [{
  _id: new ObjectID(),
  name: 'Bibliothèques',
  refId: 5
},
{
  _id: new ObjectID(),
  name: 'Cafétérias',
  refId: 7
},
{
  _id: new ObjectID(),
  name: "Salles d'enseignement",
  refId: 11
},
{
  _id: new ObjectID(),
  name: 'Salles de réunion',
  refId: 10
},
{
  _id: new ObjectID(),
  name: 'Secrétariats',
  refId: -1
},
{
  _id: new ObjectID(),
  name: 'Services',
  refId: -1
}];

exports.populate_localType_data = async(req, res) => {
  try {
    await LocalType.remove({});
    await LocalType.insertMany(localTypes);
    const data = await LocalType.find({});
    res.send({data});
  } catch (e) {
    res.status(400).send(e);
  }

};
