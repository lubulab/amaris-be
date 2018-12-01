const mongoose = require('mongoose');
//var herokuDB = 'mongodb://<admin>:<password>@<code>.mlab.com:<port>/be-restful-assessment';
//var localDB = 'mongodb://localhost/be-restful-assessment';

mongoose.Promise = global.Promise;

// Connect to Mongoose and set connection variable
//mongoose.connect('mongodb://localhost/be-restful-assessment', { useNewUrlParser: true });
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to mongo db "restful-assessment"');
});

exports.db = db;
exports.mongoose = mongoose;