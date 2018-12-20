var socket;
console.log("Loading Scripts...");

function handshake() {
    console.log("Handshaking...");
    socket = io.connect('http://ec2-13-232-119-51.ap-south-1.compute.amazonaws.com:3000');

    // Handling Errors, Connection Failures, etc.
    var msg = document.getElementById("status-msg");
    socket.on('error', function () {
        console.log("Sorry, there seems to be an issue with the connection!");
        msg.innerHTML = "<strong>DISCONNECTED</strong><div id=\"status-msg-dot\" class=\"status-dot\" align=\"right\"></div>";
        var msg_dot = document.getElementById("status-msg-dot");
        msg_dot.style.backgroundColor = "rgb(217,83,79)";
        msg_dot.style.boxShadow = "0 0 10px rgba(249, 0, 0, 0.8)";
    });
    socket.on('connect_error', function (err) {
        console.log("Connection Failed" + err);
        msg.innerHTML = "<strong>DISCONNECTED</strong><div id=\"status-msg-dot\" class=\"status-dot\" align=\"right\"></div>";
        var msg_dot = document.getElementById("status-msg-dot");
        msg_dot.style.backgroundColor = "rgb(217,83,79)";
        msg_dot.style.boxShadow = "0 0 10px rgba(249, 0, 0, 0.8)";
    });
    socket.on('connect', function () {
        console.log("Connected");
        msg.innerHTML = "<strong>CONNECTED</strong><div id=\"status-msg-dot\" class=\"status-dot\" align=\"right\"></div>";
        var msg_dot = document.getElementById("status-msg-dot");
        msg_dot.style.backgroundColor = "rgb(107,214,225)";
        msg_dot.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.8)";
    });
};

function call(val) {
    console.log("Calling backend with :::::" + val)
    socket.emit('chat', {
        message: val,
        handle: "transcriber"
    })
    message.value = "";
}

function getConfig() {
    console.log('Getting Configs')
    // Keys, SocketURLs
    $.ajax({
        type: "GET",
        url: "https://api.chucknorris.io/jokes/random",
        async: false,

        success: function (response) {
            console.log(response);
        }
    })
}

function mailSender(emailId, titleText, transcript) {
    console.log("Email: " + emailId + "\nTitle: " + titleText + "\nTranscript: " + transcript);
}
