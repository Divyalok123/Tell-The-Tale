//the observer
//will the receive the incoming connection
//from the subscriber

const { isValidObjectId } = require('mongoose');


module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){
        console.log('new connection received with id: ', socket.id);
    
        //now whenever client disconnects
        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        //emit->sending an event
        //on->receiving an event 

        //receving the even emitted from chat_engine.js
        socket.on('join_room', function(data){
            console.log('joining req. received, data: ', data);

            /*
                If there exits a root with data.chatroom, it will enter that room
                else it will create that chatroom
            */

            socket.join(data.chatroom);

            /*
                Now the users in that room should receive a notification
                that I have joined the room
            */

            io.in(data.chatroom).emit('user_joined', data);
        });

        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });


    });
};