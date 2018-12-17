var socket;
console.log("Declaring global socket config")
function handshake() {
        window.console.log("Handshaking ....");
        socket = io.connect('http://ec2-13-232-119-51.ap-south-1.compute.amazonaws.com:3000');
};


function call(val){
    window.console.log("Calling backend with :::::" + val)  
    console.log('check 1', socket.connected);
        socket.on('connect', function() {
        console.log('check 2', socket.connected);
        });
    socket.emit('chat', {
        message: val,
        handle: "transcriber"
    })
    message.value = "";

}
