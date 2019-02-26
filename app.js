// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraView2 = document.querySelector("#camera--view2"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
        cameraView2.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}



// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);




//My axis orientation: invers image when y along is neg or when both x+y are positive
//I think it needs to be x/y NOT y/x
    function calcAngle(x, y) {
        if(x>0){    
        return (180 / Math.PI) * Math.atan(y / x+0.00000000000000001)+180;
        }else{
        return (180 / Math.PI) * Math.atan(y / x+0.00000000000000001);
            }
    }

    var grid = document.getElementById("grid");
    var grid2 = document.getElementById("grid2");
    var axis = document.getElementById("axis");
    var axis2 = document.getElementById("axis2");
    var ax = 0;
    var axOut = 0;

        /* Update input axis */

    var axisInput = document.getElementById("axisInput");
    axisInput.addEventListener("change", function(e) {
        ax = -axisInput.value
        console.log(ax);
        
/******** REMOVE FROM LIVE TESTING - IS ONLY FOR OFFLINE TESTS OF INPUT AXIS ADJUST 
        axis.style.transform = 
              "rotate(" + ( -ax ) + "deg) ";
********/
    }, false);

        //DeviceMOTION needed for gravity eval
        window.addEventListener("devicemotion", function(event) {
          // again, use vendor-prefixed transform property
          grid.style.transform = 
              "rotate(" + ( 90-calcAngle(event.accelerationIncludingGravity.x,event.accelerationIncludingGravity.y) ) + "deg) ";
          grid2.style.transform = 
              "rotate(" + ( 90-calcAngle(event.accelerationIncludingGravity.x,event.accelerationIncludingGravity.y) ) + "deg) ";
          axOut = 90+ax-calcAngle(event.accelerationIncludingGravity.x,event.accelerationIncludingGravity.y)
          axis.style.transform = 
              "rotate(" + ( axOut ) + "deg) ";
          axis2.style.transform = 
              "rotate(" + ( axOut ) + "deg) ";
        });

/***  toggle zoom ***/
function double() {
   var element = document.getElementById("camera--view");
   element.classList.toggle("double");
}

