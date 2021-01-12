video = "";
objects = [];
status = "";

//var slider = document.getElementById("speedSlider");

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}



function start() {
    object_Detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log('Model Loaded!!1');
    status = "true";
    video.loop();
    video.speed(1);
    video.volume(1);
}



function pause() {
    video.speed(0);
    video.volume(0);
}

function resume() {
    video.speed(1);
    video.volume(1);
}

function gotResult(error, results) {
    if(error){
        console.error(error);
    }
    console.log(results);
}

function draw() {
    image(video, 0, 0, 480, 380);
    
    if(status != "") 
    {
        object_Detector.detect(video,gotResult);
        console.log("yes");
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Detected Objects";
            document.getElementById("number_of_objects_detected").innerHTML = "Number of objects detected is = " + objects.length;     

            fill("FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}