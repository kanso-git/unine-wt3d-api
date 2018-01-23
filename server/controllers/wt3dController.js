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
const buildings = [
  {
    name: 'Bellevaux51',
    buildingIds: [2],
    buildingRouteUrl: '/uninecampusbel51/NAServer/Route/solve',
    serviceOffices: [{code: 'GA22', value: "Centrale d'achats produits chimiques"},
      {code: 'GA30', value: 'Neuchâtel platform of analytical chemestry'},
      {code: 'GA4-GA8-GA10', value: 'Atelier de construction mécanique'}],
    secretarias: [{code: 'GE16', value: 'Institut de chimie'}, {code: 'GD16', value: 'Institut de physique'}],
    elevators: ['(GA57)', '(GB62)', '(GC57)', '(GD53)', '(GE53)'],
    stairs: ['(GA56)', '(GB54)', '(GA55)', '(GB52)', '(GC55)', '(GD50)', '(GE54)', '(GB53)'],
    wcs: ['(GA52)', '(GA52a)', '(GA52b)', '(GA53a)', '(Ga57)',
      '(GB55)', '(GB56)', '(GB57)', '(GB63)', '(GC53)', '(GC56)',
      '(GC58)', '(GD51)', '(GD52)', '(GD57)', '(GE50)', '(GE51)', '(GE52)'],
    otherTabs: [],
    buildingRouteExceptions: [],
    buildingRouteExclud: []
  }

];
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
