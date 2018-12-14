window.onload = function () {
  init();
}

var AudioVisualizer = /** @class */ (function () {
    function AudioVisualizer(audioContext, processFrame, processError) {
        this.audioContext = audioContext;
        this.processFrame = processFrame;
        this.connectStream = this.connectStream.bind(this);
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(this.connectStream)
            .catch(function (error) {
            if (processError) {
                processError(error);
            }
        });
    }
    AudioVisualizer.prototype.connectStream = function (stream) {
        this.analyser = this.audioContext.createAnalyser();
        var source = this.audioContext.createMediaStreamSource(stream);
        source.connect(this.analyser);
        this.analyser.smoothingTimeConstant = 0.5;
        this.analyser.fftSize = 32;
        this.initRenderLoop(this.analyser);
    };
    AudioVisualizer.prototype.initRenderLoop = function () {
        var _this = this;
        var frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
        var processFrame = this.processFrame || (function () { });
        var renderFrame = function () {
            _this.analyser.getByteFrequencyData(frequencyData);
            processFrame(frequencyData);
            requestAnimationFrame(renderFrame);
        };
        requestAnimationFrame(renderFrame);
    };
    return AudioVisualizer;
}());
var visualMainElement = document.querySelector('main');
var visualValueCount = 16;
var visualElements;
var createDOMElements = function () {
    var i;
    for (i = 0; i < visualValueCount; ++i) {
        var elm = document.createElement('div');
        visualMainElement.appendChild(elm);
    }
    visualElements = document.querySelectorAll('main div');
};
createDOMElements();
var init = function () {
    // Creating initial DOM elements
    var audioContext = new AudioContext();
    var initDOM = function () {
        visualMainElement.innerHTML = '';
        createDOMElements();
    };
    initDOM();
    // Swapping values around for a better visual effect
    var dataMap = { 0: 15, 1: 10, 2: 8, 3: 9, 4: 6, 5: 5, 6: 2, 7: 1, 8: 0, 9: 4, 10: 3, 11: 7, 12: 11, 13: 12, 14: 13, 15: 14 };
    var processFrame = function (data) {
        var values = Object.values(data);
        var i;
        for (i = 0; i < visualValueCount; ++i) {
            var value = values[dataMap[i]] / 255;
            var elmStyles = visualElements[i].style;
            elmStyles.transform = "scaleY( " + value + " )";
            elmStyles.opacity = Math.max(.25, value);
        }
    };
    var processError = function () {
        visualMainElement.classList.add('error');
        visualMainElement.innerText = 'Please allow access to your microphone in order to see this demo.\nNothing bad is going to happen... hopefully :P';
    };
    var a = new AudioVisualizer(audioContext, processFrame, processError);
};
