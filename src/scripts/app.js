
function call(val){
    window.console.log("Calling backend with :::::" + val)
    // Make connection
    var socket = io.connect('http://ec2-54-175-11-232.compute-1.amazonaws.com:3000');

    // Query DOM
    // var message = document.getElementById('message'),
    //     handle = document.getElementById('handle'),
    //     btn = document.getElementById('send'),
    //     output = document.getElementById('output'),
    //     feedback = document.getElementById('feedback');

    // // Emit events
    // btn.addEventListener('click', function(){
    //     socket.emit('chat', {
    //         message: message.value,
    //         handle: handle.value
    //     });
    //     message.value = "";
    // });

    // message.addEventListener('keypress', function(){
    //     socket.emit('typing', handle.value);
    // })

    // // Listen for events
    // socket.on('chat', function(data){
    //     feedback.innerHTML = '';
    //     output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    // });

    // socket.on('typing', function(data){
    //     feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    // });

    function emitter(){
        socket.emit('chat', {
            message: Math.random().toString(36).substring(7),
            handle: "transcriber"
        })
        message.value = "";
        setTimeout(emitter,1000);
    }
    emitter();

    
    // socket.emit('chat', {
    //     message: val,
    //     handle: "transcriber"
    // })
    // message.value = "";

}
