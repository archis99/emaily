
if(process.env.NODE_ENV == 'production') {
    //We are in production - Return prod set of keys
    module.exports = require('./prod');
}
else {
    //We are in dev - Return dev set of keys
    module.exports = require('./dev');
}