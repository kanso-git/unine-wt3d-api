const axios = require('axios');

// GET request for list of all todos.
exports.bdl_buildingList_get = async(req, res) => {
  try {
    const headers = {};
    headers[process.env.BDL_SECURITY_HEADER] = req.headers[process.env.BDL_SECURITY_HEADER];
    const batiments = await axios.get(`${process.env.BDL_API}/batiments`, {
      headers,
    });
    res.status(200).send(batiments.data);
  } catch (e) {
    res.status(400).send(e);
  }
};
