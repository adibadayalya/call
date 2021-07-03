require('dotenv').config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);



const PORT = process.env.PORT || 3001


app.use(express.static('public'))

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root:'./public'})
  })

const rooms = {};

const socketToRoom = {};

const userObjects = [];

io.on("connection", socket => {
    socket.on("join room", ([roomID, userObject]) => {
        if (rooms[roomID]) {
            rooms[roomID].push(socket.id);
            userObjects[roomID].push({"userID":socket.id,"userInfo": userObject})
        } else {
            rooms[roomID] = [socket.id];
            userObjects[roomID] = [{"userID":socket.id,"userInfo": userObject}] 
        }
        socketToRoom[socket.id] = roomID
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        if (otherUser) {
            var otherObject = userObjects[roomID].find(a => a.userID !== socket.id)
            //const [otherUse, otherUserObject] = otherObject;
            //console.log(otherObject)
            //console.log(userObjects[roomID])
            socket.emit("other user", ([otherUser, otherObject.userInfo]));
            socket.to(otherUser).emit("user joined", socket.id);
            //console.log(userObject.displayName)
        }
    });

    socket.on('sending a message',([messageRecieved, senderName, roomID]) => {
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        if(otherUser)
        socket.to(otherUser).emit('recieved a new message', ([messageRecieved, senderName]));
    });

    socket.on('other-user-video-off', (roomID) => {
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        if(otherUser)
        socket.to(otherUser).emit('video off by other user')
    });

    socket.on('other-user-video-on', (roomID) => {
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        if(otherUser)
        socket.to(otherUser).emit('video on by other user')
    });

    socket.on("offer", payload => {
        io.to(payload.target).emit("offer", payload);
    });

    socket.on("answer", payload => {
        io.to(payload.target).emit("answer", payload);
    });

    socket.on("ice-candidate", incoming => {
        io.to(incoming.target).emit("ice-candidate", incoming.candidate);
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = rooms[roomID];        
        if (room) {
            socket.broadcast.emit('user left', socket.id)
            room = room.filter(id => id !== socket.id);
            rooms[roomID] = room
            let temp =userObjects[roomID]
            temp = temp.filter(obj => obj.userID !== socket.id)
            userObjects[roomID] = temp
        }
    });
});


server.listen(PORT, () => console.log('server is running on port 3001'));


