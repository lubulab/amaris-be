const express = require('express');
const endPoints = express.Router();

endPoints.use(require('./clientController.js'));
endPoints.use(require('./policyController.js'));

module.exports = endPoints;