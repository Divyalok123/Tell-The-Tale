//for communicating from the client side

class chattingEngine {
    constructor(chatboxid, usermail) {
        this.chatbox = $(`#${chatboxid}`);
        this.usermail = usermail;

        //as soon as the class is called 
        //we will send a connection request
        this.socket = io.connect('http://54.174.38.65:5000');
        
        if(this.usermail)
            this.connectionHandler();  //and then we check if the connection is done
    }

    connectionHandler() {
        let self = this;
        this.socket.on('connect', function(){
            console.log('socket connection established!');


            //asking for joining a room
            self.socket.emit('join_room', {
                user_email: self.usermail,
                chatroom: 'yourtale'
            });

            //now check if the user has joined
            self.socket.on('user_joined', function(data){
                console.log('A user has joined!', data);
            });
        });

        //sending a message on clicking the send-message button
        $('#send-message').click(function(){
            let input_msg = $('#chat-message-input').val();

            if(input_msg != '' && input_msg != ' ') {
                self.socket.emit('send_message', {
                    message: input_msg,
                    user_email: self.usermail,
                    chatroom: 'yourtale'
                });
            }
        });

        //detect the received message
        self.socket.on('receive_message', function(data){
            console.log('message receive: ', data);

            let newmessage = $('<li>');

            let whosemessage = 'other-message';

            if(data.user_email == self.usermail) {
                whosemessage = 'self-message';
            }

            newmessage.append($('<span>', {
                'html': data.message
            }));

            newmessage.append($('<sub>', {
                'html': data.user_email
            }));

            newmessage.addClass(whosemessage);

            $('#chat-messages-list').append(newmessage);
        });

    }    

}