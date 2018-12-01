// policyController.js
const express = require('express');
const endPoints = express.Router();

// get policy by client name (admin only)
endPoints.get('/policies/:clientName', (req, res) => {
  if (req.params.clientName) {
    Client.find({ name: req.params.clientName }).lean().exec((err, client) => {
      if (err) res.send(err);
      if (client.length > 0) {
        if (client[0].role == 'admin') {
          // fetch policy
          Policy.find({ clientId: client[0]._id }).lean().exec((err, policy) => {
            if (err) {
              res.json({
                success: false,
                response: err,
              });
            }
            if (policy.length > 0) {
              res.status(200).json({
                success: true,
                response: policy[0],
              });
            } else {
              res.status(404).json({
                success: false,
                response: 'Policy not found by client name.',
              });
            }
          });
        } else {
          res.status(404).json({
            success: false,
            response: 'Client is not an admin.',
          });  
        }
      } else {
        res.status(404).json({
          success: false,
          response: 'Clients not found by name.',
        });
      }
    });    
  } else {
    res.status(400).json({
      success: false,
      response: 'Missing client name argument',
    });
  }
});

module.exports = endPoints;