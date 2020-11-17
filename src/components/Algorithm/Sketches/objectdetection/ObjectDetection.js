import Sketch from 'react-p5';

//Variables
let capture;
let detector;
let detections = [];
let modelReady = false;

export default (props) => {

    const preload = (p5) => {
        //Load detector
        detector = window.ml5.objectDetector('cocossd', {}, modelLoaded);
    }

    const modelLoaded = () => {
        //TODO: Handle model loaded
        modelReady = true //Set model loaded to true
    }

    const onResults = (error, results) => {
        //If there is an error
        if (error) {
          //Error handling
          console.log(error);
        } else {
          //Set results
          detections = results;
        }
        
        //Call detector again
        detector.detect(capture, onResults);
    }

    const setup = (p5, canvasParentRef) => {
        //Create canvas
        p5.createCanvas(640, 480).parent(canvasParentRef);
  
        //Create capture
        capture = p5.createCapture(p5.VIDEO);
        capture.size(640, 480);
        capture.hide();
        
        //Start detection
        detector.detect(capture, onResults);
    }

    const draw = (p5) => {
        p5.background('#A8DADC');
  
        if (modelReady) {
            //Draw image on Canvas
            p5.image(capture, 0, 0);
            
            //Draw detections
            detections.forEach(detection => {
                //Get the coordinates
                const { x, y, width, height, label } = detection;
                
                //Display bounding boxes
                p5.strokeWeight(3);
                p5.noFill();
                p5.stroke('#A8DADC');
                p5.rect(x, y, width, height);
                
                //Display title
                p5.noStroke();
                p5.fill('#F4A261');
                p5.textSize(32);
                p5.text(label, x + 10, y + 24);
            });
        } else {
            //Model loading
            p5.textFont('Raleway');

            //Draw text
            p5.fill('#F4A261');
            p5.textSize(40);
            p5.text("Model is loading", p5.width / 2 - 150, p5.height / 2);
        }
    }
    
    return (
        <div>
            <Sketch setup={setup} draw={draw} preload={preload}/>
        </div>
    )
}