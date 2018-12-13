window.onload = function () {
  init();
};

var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var AudioVisualizer = function () {
  function AudioVisualizer(audioContext, processFrame, processError) {_classCallCheck(this, AudioVisualizer);
    this.audioContext = audioContext;
    this.processFrame = processFrame;
    this.connectStream = this.connectStream.bind(this);
    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).
    then(this.connectStream).
    catch(function (error) {
      if (processError) {
        processError(error);
      }
    });
  }_createClass(AudioVisualizer, [{ key: 'connectStream', value: function connectStream(

    stream) {
      this.analyser = this.audioContext.createAnalyser();
      var source = this.audioContext.createMediaStreamSource(stream);
      source.connect(this.analyser);
      this.analyser.smoothingTimeConstant = 0.5;
      this.analyser.fftSize = 32;

      this.initRenderLoop(this.analyser);
    } }, { key: 'initRenderLoop', value: function initRenderLoop()

    {var _this = this;
      var frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
      var processFrame = this.processFrame || function () {};

      var renderFrame = function renderFrame() {
        _this.analyser.getByteFrequencyData(frequencyData);
        processFrame(frequencyData);

        requestAnimationFrame(renderFrame);
      };
      requestAnimationFrame(renderFrame);
    } }]);return AudioVisualizer;}();


var visualMainElement = document.querySelector('main');
var visualValueCount = 16;
var visualElements = void 0;
var createDOMElements = function createDOMElements() {
  var i = void 0;
  for (i = 0; i < visualValueCount; ++i) {
    var elm = document.createElement('div');
    visualMainElement.appendChild(elm);
  }

  visualElements = document.querySelectorAll('main div');
};
createDOMElements();

var init = function init() {
  // Creating initial DOM elements
  var audioContext = new AudioContext();
  var initDOM = function initDOM() {
    visualMainElement.innerHTML = '';
    createDOMElements();
  };
  initDOM();

  // Swapping values around for a better visual effect
  var dataMap = { 0: 15, 1: 10, 2: 8, 3: 9, 4: 6, 5: 5, 6: 2, 7: 1, 8: 0, 9: 4, 10: 3, 11: 7, 12: 11, 13: 12, 14: 13, 15: 14 };
  var processFrame = function processFrame(data) {
    var values = Object.values(data);
    var i = void 0;
    for (i = 0; i < visualValueCount; ++i) {
      var value = values[dataMap[i]] / 255;
      var elmStyles = visualElements[i].style;
      elmStyles.transform = 'scaleY( ' + value + ' )';
      elmStyles.opacity = Math.max(.25, value);
    }
  };

  var processError = function processError() {
    visualMainElement.classList.add('error');
    visualMainElement.innerText = 'Please allow access to your microphone in order to see this demo.\nNothing bad is going to happen... hopefully :P';
  };

  var a = new AudioVisualizer(audioContext, processFrame, processError);
};
