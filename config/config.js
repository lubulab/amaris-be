var env = process.env.NODE_ENV || 'DEV';
var herokuDB = 'mongodb://admin:gionniBravo9@ds123584.mlab.com:23584/be-restful-assessment';
//var localDB = 'mongodb://localhost/be-restful-assessment';

if (env === 'DEV') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = herokuDB;
} else if (env === 'TEST') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}

