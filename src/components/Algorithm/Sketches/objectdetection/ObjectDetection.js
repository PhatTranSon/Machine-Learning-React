import Sketch from 'react-p5';
import React from 'react';

class ODSketch extends React.Component {
    constructor(props) {
        super(props);

        //Variables
        this.capture = null;
        this.detector = null;
        this.detections = [];
        this.modelReady = false;
        this.stop = false;

        //Bind
        this.onResults = this.onResults.bind(this);
        this.modelLoader = this.modelLoader.bind(this);

        //Set
        this.state = {
            running: true
        }
    }

    componentWillUnmount() {
        this.stop = true;
        this.detector = null;
    }

    preload(p5) {
        this.detector = window.ml5.objectDetector('cocossd', {}, this.modelLoader);
    }

    modelLoader() {
        //TODO: Handle model loaded
        this.modelReady = true //Set model loaded to true
        //console.log('loaded');
    }

    onResults(error, results) {
        //If there is an error
        if (error) {
          //Error handling
          console.log(error);
        } else {
          //Set results
          this.detections = results;
        }
        
        //Call this.detector again
        if (!this.stop) {
            this.detector.detect(this.capture, this.onResults);
        } else {
            this.capture.remove();
        }
    }

    setup(p5, canvasParentRef) {
        //Create canvas
        p5.createCanvas(640, 480).parent(canvasParentRef);
  
        //Create this.capture
        this.capture = p5.createCapture(p5.VIDEO);
        this.capture.size(640, 480);
        this.capture.hide();
        
        //Start detection
        this.detector.detect(this.capture, this.onResults);
    }

    draw(p5) {
        p5.background('#A8DADC');
  
        if (this.modelReady) {
            //Draw image on Canvas
            p5.image(this.capture, 0, 0);
            
            //Draw this.detections
            this.detections.forEach(detection => {
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
    
    render() {
        const { running } = this.state;
        return (
            <div>
                {
                    running ? <Sketch setup={this.setup.bind(this)} draw={this.draw.bind(this)} preload={this.preload.bind(this)}/> :
                    null
                }
            </div>
        )
    }
}

export default ODSketch;