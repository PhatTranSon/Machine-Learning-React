import Model from './Model';
import Sketch from 'react-p5';
import ControlPanel from './ControlPanel';
import Point from '../common/point';

//Store state outside -> Need refractoring
//Initialize a model
let model = new Model();

//Current points
let points = [];

//Select the type of point you want to use
let currentType = 1;
const changeType = (type) => {
    currentType = type;
}

//Training state -> Check if training has begun
let isTraining = false;
let hasConverged = false;

//Save losses
let losses = [];

//Segments for illusrating the prediction boundary
const SEG_SIZE = 10;
let segments = [];

export default (props) => {
    //Handle user interactions
    const startTraining = () => {
        isTraining = true;
    }

    const stopTraining = () => {
        isTraining = false;
    }

    const reset = () => {
        //Create new model
        model = new Model();
        points = [];
        losses = [];
        isTraining = false;
        hasConverged = false;
    }

    //Initialize segments
    function createSegments(width, height, p5) {
        //Initialize segements
        segments = []; ///Reset
        for (let r = 0; r != Math.round(width / SEG_SIZE) + 1; r++) {
            for (let c = 0; c != Math.round(height / SEG_SIZE) + 1; ++c) {
                //Apppent to segments
                segments.push([c * SEG_SIZE, r * SEG_SIZE]);
            }
        }
    }

    //Helper function
    const trainModel = () => {
        //Make datapoints
        let data = [];
        let labels = [];
        
        points.forEach(p => {
            //Add data and label
            data.push([p.x, p.y]);
            labels.push(p.type);
        })
        
        //Train model
        return model.train(data, labels);
    }

    //Predict segments -> Illustrate
    const displaySegments = (p5) => {
        p5.noStroke();

        for (let i = 0; i != segments.length; ++i) {
            //Get the segment location -> Map back to canvas
            let x = p5.map(segments[i][0], 0, p5.width, 0, 1);
            let y = p5.map(segments[i][1], 0, p5.height, 1, 0);
            
            //Get prob
            let prob = model.predict([x, y]);
        
            //Draw 
            if (prob > 0.5) {
              p5.fill('rgba(69, 123, 157, ' + (prob/2).toString() + ')');
            } else {
              p5.fill('rgba(244, 162, 97, ' + ((1-prob)/2).toString() +')');
            }

            p5.rect(segments[i][0], segments[i][1], SEG_SIZE, SEG_SIZE);
        }
    }

    //Handle windows resize
    const windowResize = (p5) => {
        p5.resizeCanvas(p5.windowWidth / 4, p5.windowWidth / 4);
        createSegments(p5.windowWidth / 4, p5.windowWidth / 4, p5);
    }

    //Set up and draw for left canvas
    const leftSetup = (p5, canvasParentRef) => {
        //Set canvas size dynamically
        const width = p5.windowWidth / 4, height = p5.windowWidth / 4;
        p5.createCanvas(width, height).parent(canvasParentRef);

        //Create segments for illustrating
        createSegments(width, height, p5);
    }

    const leftDraw = (p5) => {
        p5.background(204);

        p5.noStroke();

        points.forEach(p => {
            //Map canvas coordinates to [0,1]
            let x = p5.map(p.x, 0, 1, 0, p5.width);
            let y = p5.map(p.y, 0, 1, p5.height, 0);

            if (p.type == 0) {
                p5.fill('#F4A261');
            } else {
                p5.fill('#457B9D');
            }

            p5.circle(x, y, 10);
        });

        //Train model if has started
        if (isTraining && !hasConverged) {
            //Append loss
            let loss = trainModel(p5);
            losses.push(loss);

            //Check if model has converged
            if (losses.length >= 2 && Math.abs(losses[losses.length - 1] - losses[losses.length - 2]) <= 0.0001) {
                hasConverged = true;
            }
        }

        //Render predictions
        if (losses.length > 0) {
            displaySegments(p5);
        }
    }

    const leftMouseClicked = (p5) => {
        //Check mouse position if inside canvas
        if (!isTraining && 
            losses.length === 0 &&
            p5.mouseX > 0 && p5.mouseX <= p5.width && p5.mouseY > 0 && p5.mouseY <= p5.height) {
            //Map canvas coordinates to [0,1]
            let x = p5.map(p5.mouseX, 0, p5.width, 0, 1);
            let y = p5.map(p5.mouseY, 0, p5.height, 1, 0);

            //Create a point based on mouse position and current type
            let point = new Point(x, y, currentType);

            //Append to list
            points.push(point);
        }
    }

    //Set up and draw for right canvas
    const rightSetup = (p5, canvasParentRef) => {
        const width = p5.windowWidth / 4, height = p5.windowWidth / 4;
        p5.createCanvas(width, height).parent(canvasParentRef);

        //Set font
        p5.textFont('Raleway');
    }

    const rightDraw = (p5) => {
        p5.background(255);

        if (losses.length > 0) {
            drawLosses(p5);
        }
    }

    const drawLosses = (p5) => {
        //Calculate the current x offset
        let offset = 40;
        let offSetChange = (p5.width - offset * 2) / (losses.length);

        //Get the latest loss -> Display
        p5.textSize(20);
        p5.fill('#ddbea9');
        p5.strokeWeight(1);
        p5.textFont('Raleway');
        p5.text('Loss: ' + losses[losses.length - 1].toFixed(4).toString(), 40, 20);

        //Check if converge
        if (hasConverged) {
            p5.fill('#2a9d8f');
            p5.noStroke();
            p5.textFont('Raleway');
            p5.text('Converged', 40, 40);
        }

        //Draw line chart showing plots
        p5.noFill();
        p5.stroke('#f9dcc4');
        p5.strokeWeight(3);
        p5.beginShape();

        losses.forEach((loss) => {
            //Map the loss
            let mappedLoss;
            mappedLoss = p5.map(loss, 0, losses[0], p5.height, p5.width / 2);

            //Draw vertex 
            p5.vertex(offset, mappedLoss);
            //Increase offset
            offset += offSetChange;
        })

        p5.endShape();
    }

    return <div>
        <div style={{float: "left"}}>
            <Sketch 
                setup={leftSetup}
                draw={leftDraw}
                mouseClicked={leftMouseClicked}
                windowResized={windowResize}
                > 
            </Sketch>
        </div>

        <div style={{float: "left"}}>
            <Sketch 
                setup={rightSetup}
                draw={rightDraw}
                windowResized={windowResize}> 
            </Sketch>
        </div>

        <div style={{clear: "both"}}></div>

        <ControlPanel
            onChangeType={changeType}
            onStart={startTraining}
            onStop={stopTraining}
            onReset={reset}>
        </ControlPanel>
    </div>
}