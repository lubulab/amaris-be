// policy.js
const ds = require('./dataSource.js');

// Schema
const policySchema = ds.mongoose.Schema({
  _id: String,
  amountInsured: Number,
  email: String,
  inceptionDate: Date,
  installmentPayment: Boolean,
  clientId: String,
});

// Define and export model
global.Policy = ds.mongoose.model('Policy', policySchema);