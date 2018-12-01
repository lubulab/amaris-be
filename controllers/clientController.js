// clientController.js
const express = require('express');
const endPoints = express.Router();

// get client by id
endPoints.get('/client/:clientId', (req, res) => {
    if (req.params.clientId) {
      Client.find({ _id: req.params.clientId }).lean().exec((err, clients) => {
        if (err) {
          res.json({
            success: false,
            response: err,
          });
        }
        if (clients.length > 0) {
          res.status(200).json({
            success: true,
            response: clients[0],
          });
        } else {
          res.status(404).json({
            success: false,
            response: 'Client not found by id.',
          });
        }
      });
    } else {
      res.status(400).json({
        success: false,
        response: 'Missing client id argument.',
      });
    }
});

// get client by name
endPoints.get('/clients/:name', (req, res) => {
    if (req.params.name) {
      Client.find({ name: req.params.name }).lean().exec((err, clients) => {
        if (err) res.send(err);
        if (clients.length > 0) {
          res.status(200).json({
            success: true,
            response: clients[0],
          });
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

// get client by policy id (admin only)
endPoints.get('/client/policy/:policyId', (req, res) => {
    if (req.params.policyId) {
        Policy.find({ _id: req.params.policyId }).lean().exec((err, policy) => {
            if (err) {
              res.json({
                success: false,
                response: err,
              });
            }
            if (policy.length > 0) {
              // fetch Client role
              Client.find({ _id: policy[0].clientId }).lean().exec((err, client) => {
                if (err) res.send(err);
                if (client.length > 0) {
                  if (client[0].role === 'admin') {
                    res.status(200).json({
                        success: true,
                        response: client[0],
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
                    response: 'Client not found by name.',
                  });
                }
              });
            } else {
              res.status(404).json({
                success: false,
                response: 'Policy not found by id.',
              });
            }
        });
    } else {
      res.status(400).json({
        success: false,
        message: 'Missing policy id argument.',
      });
    }
});

module.exports = endPoints;