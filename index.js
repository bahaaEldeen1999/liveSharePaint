const express = require('express');
const app = express();
const server = app.listen(3000);
var io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', function (socket) {
  console.log(socket.id);
  socket.on('mouse',(data)=>{
    //console.log(data)
    socket.broadcast.emit('mouse', data);
})
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/public/index.html');
})

