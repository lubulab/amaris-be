// client.js
const ds = require('./dataSource.js');

// Schema
const clientSchema = ds.mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  role: String,
});

// Define and export model
global.Client = ds.mongoose.model('Client', clientSchema);