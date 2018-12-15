var socket;
console.log("Declaring global socket config")
function handshake() {
        window.console.log("Handshaking ....");
        socket = io.connect('http://ec2-13-232-119-51.ap-south-1.compute.amazonaws.com:3000');
};


function call(val){
    window.console.log("Calling backend with :::::" + val)  
    
    socket.emit('chat', {
        message: val,
        handle: "transcriber"
    })
    message.value = "";

}
