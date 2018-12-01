// fetch data
const http = require('http');
require('./client.js');
require('./policy.js');

const mockyHost = 'www.mocky.io';
const clientEndpoint = `/v2/5808862710000087232b75ac`;
const policyEndpoint = `/v2/580891a4100000e8242b75c5`;

// Load clients data
exports.loadClients = () => {
  return new Promise((resolve, reject) => {
    Client.find((err, clients) => {
      if (err) console.error(err);
      if (clients.length === 0) {
        console.log('Loading clients to database');
        const options = {
          host: mockyHost,
          path: clientEndpoint,
        };
        // Get clients data from mocky
        http.get(options, (res) => {
          let clientsData = '';
          res.on('data', (d) => {
            clientsData += d;
          });
          res.on('end', () => {
            clientsData = JSON.parse(clientsData).clients;
            // save clients
            clientsData.forEach((client) => {
              new Client({
                _id: client.id,
                name: client.name,
                email: client.email,
                role: client.role,
              }).save((err) => {
                if (err) console.error(err);
              });
            });
            resolve('Clients loaded successfully!');
          });
        }).on('error', (err) => {
          reject(`Error: ${err.message}`);
        });
      } else {
        resolve('Clients were already loaded to DB.');
      }
    });
  });
};

// Load policies data
exports.loadPolicies = () => {
  return new Promise((resolve, reject) => {
    Policy.find((err, policies) => {
      if (err) console.error(err);
      if (policies.length === 0) {
        console.log('Loading policies to database');
        const options = {
          host: mockyHost,
          path: policyEndpoint,
        };
        // Get policies data from mocky
        http.get(options, (res) => {
          let policiesData = '';
          res.on('data', (d) => {
            policiesData += d;
          });
          res.on('end', () => {
            policiesData = JSON.parse(policiesData).policies;
            // save policies
            policiesData.forEach((policy) => {
              new Policy({
                _id: policy.id,
                amountInsured: policy.amountInsured,
                email: policy.email,
                inceptionDate: policy.inceptionDate,
                installmentPayment: policy.installmentPayment,
                clientId: policy.clientId,
              }).save((err) => {
                if (err) console.error(err);
              });
            });
            resolve('Policies loaded successfully!');
          });
        }).on('error', (err) => {
          reject.reason(`Error: ${err.message}`);
        });
      } else {
        resolve('Policies already loaded.');
      }
    });
  });
};