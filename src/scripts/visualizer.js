window.onload = function () {
    function emitter(){
        var socket = io.connect('http://ec2-54-175-11-232.compute-1.amazonaws.com:3000');
        
        window.console.log("Executing!")
        socket.emit('chat', {
            message: Math.random().toString(36).substring(7),
            handle: "transcriber"
        })
    
        // message.value = "";
        setTimeout(emitter, 1000)
        
    }
    emitter()
};


