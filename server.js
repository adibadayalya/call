/**
 * Server side code to establish a connection between two users
 * Messages and certain events that occure which are to be notified to other user 
 * go through the server
 */

require('dotenv').config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const PORT = process.env.PORT || 3001

app.use(express.static('public'))

/**
 * Redirecting all requests to the index.html file
 * for proper loading of the routes through the 
 * react router 
 */

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root:'./public'})
  })

const rooms = {};

const socketToRoom = {};

const userObjects = [];

//On connection
io.on("connection", socket => {
    //on user joining the room
    socket.on("join room", ([roomID, userObject]) => {
        if (rooms[roomID]) {
            //addin user to a certain rooms
            rooms[roomID].push(socket.id);
            userObjects[roomID].push({"userID":socket.id,"userInfo": userObject})
        } else {
            //creating the new room
            rooms[roomID] = [socket.id];
            userObjects[roomID] = [{"userID":socket.id,"userInfo": userObject}] 
        }
        //assigning the room to user
        socketToRoom[socket.id] = roomID
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        if (otherUser) {
            //If ouser already exists in a room alert sent to that user that a new user joined 
            var otherObject = userObjects[roomID].find(a => a.userID !== socket.id)
            socket.emit("other user", ([otherUser, otherObject.userInfo]));
            socket.to(otherUser).emit("user joined", socket.id);
        }
    });

    //In call chat message 
    socket.on('sending a message',([messageRecieved, senderName, roomID]) => {
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        //alerting the other user that a new message is recieved 
        if(otherUser)
        socket.to(otherUser).emit('recieved a new message', ([messageRecieved, senderName]));
    });


    //Alerting the user that the partner video is turned off 
    socket.on('other-user-video-off', (roomID) => {
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        if(otherUser)
        socket.to(otherUser).emit('video off by other user')
    });

    //alerting the user that the partner video is toggled on
    socket.on('other-user-video-on', (roomID) => {
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        if(otherUser)
        socket.to(otherUser).emit('video on by other user')
    });

    //offer from the user on joining the room to exchang ethe data
    socket.on("offer", payload => {
        io.to(payload.target).emit("offer", payload);
    });

    //sending a response to the user on receiving the offer
    socket.on("answer", payload => {
        io.to(payload.target).emit("answer", payload);
    });

    //ICE servers
    socket.on("ice-candidate", incoming => {
        io.to(incoming.target).emit("ice-candidate", incoming.candidate);
    });

    //On a user leaving/disconnecting from the room
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


server.listen(PORT, () => console.log(`server is running on port ${PORT}`));