const express = require('express');
const server = express();
server.all('/', (req, res)=>{
    res.send('hi')
})
function keepAlive(){
    server.listen(3000, ()=>{console.log("Website and on forever!")});
}
module.exports = keepAlive;
