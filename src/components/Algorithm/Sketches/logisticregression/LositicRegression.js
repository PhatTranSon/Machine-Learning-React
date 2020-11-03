import Sketch from 'react-p5';
import Model from './Model';
import Point from '../common/point';
import ControlPanel from './ControlPanel';

//Save state outside components -> Need refractoring
//Create model
let model = new Model();

//Save losses
let losses = [];
let hasConverged = false;

//List of points
let points = [];

//List of segments for visualizing purpose
const SEG_SIZE = 10;
let segments = [];

export default (props) => {
    //Current type of point
    let currentType = 1;

    const changeType = (type) => {
        currentType = type;
    }

    const reset = () => {
        points = [];
        losses = [];
        hasConverged = false;
    }

    //Train model and render result
    const trainModel = () => {
        //Convert points to x and y
        let x = [];
        let y = [];

        points.forEach(p => {
            x.push([p.x, p.y]);
        });

        points.forEach(p => {
            y.push(p.type);
        });

        //Train model
        return model.train(x, y);
    }

    const renderPredictions = (p5) => {
        for (let i = 0; i != segments.length; ++i) {
            //Get the segment location -> Map back to canvas
            let x = p5.map(segments[i][0], 0, 1, 0, p5.width);
            let y = p5.map(segments[i][1], 0, 1, p5.height, 0);
            
            //Get prob
            let prob = model.predict([segments[i][0], segments[i][1]]);
        
            //Draw 
            if (prob > 0.5) {
              p5.fill('rgba(69, 123, 157, ' + (prob/2).toString() + ')');
            } else {
              p5.fill('rgba(244, 162, 97, ' + ((1-prob)/2).toString() +')');
            }
            p5.noStroke();
            p5.rect(x, y, SEG_SIZE, SEG_SIZE);
        }
    }

    //Handle windows resize
    const leftWindowResize = (p5) => {
        let width = p5.windowWidth / 4, height = p5.windowWidth / 4;
        p5.resizeCanvas(width, height);
        initializeSegments(width, height, p5);
    }

    const rightWindowResize = (p5) => {
        let width = p5.windowWidth / 4, height = p5.windowWidth / 4;
        p5.resizeCanvas(width, height);
    }

    const leftSetup = (p5, canvasParentRef) => {
        //Set canvas size
        let width = p5.windowWidth / 4, height = p5.windowWidth / 4;
        p5.createCanvas(width, height).parent(canvasParentRef);
        initializeSegments(width, height, p5);
    }

    const initializeSegments = (width, height, p5) => {
        segments = []; ///Reset
        for (let r = 0; r != Math.round(width / SEG_SIZE); r++) {
            for (let c = 0; c != Math.round(height / SEG_SIZE); ++c) {
                //Map to [0, 1] interval
                let x = p5.map(c * SEG_SIZE, 0, width, 0, 1);
                let y = p5.map(r * SEG_SIZE, height, 0, 0, 1);
                //Apppent to segments
                segments.push([x, y]);
            }
        }
    }

    const leftDraw = (p5) => {
        p5.background(204);

        //Draw the existing points
        p5.strokeWeight(1);
        points.forEach(p => {
            //Translate coordinates
            let x = p5.map(p.x, 0, 1, 0, p5.width);
            let y = p5.map(p.y, 0, 1, p5.height, 0);
            
            //Draw a circle
            p5.noStroke();
            if (p.type === 0) {
                p5.fill('#F4A261');
            } else if (p.type == 1) {
                p5.fill('#457B9D');
            }
            
            p5.circle(x, y, 10);
        });

        //Train model
        if (points.length > 0 && !hasConverged) {
            //Train model and get loss
            losses.push(trainModel());

            //Check if model has converged
            if (losses.length >= 2 && Math.abs(losses[losses.length - 1] - losses[losses.length - 2]) <= 0.01) {
                hasConverged = true;
            }
        }

        //Show
        if (losses.length > 0) {
            renderPredictions(p5);
        }
    }

    const leftMouseClicked = (p5) => {
        //Check if mouse is in bound
        if (p5.mouseX > 0 && p5.mouseX <= p5.width && p5.mouseY > 0 && p5.mouseY <= p5.height) {
            //Create a point
            let x = p5.map(p5.mouseX, 0, p5.width, 0, 1);
            let y = p5.map(p5.mouseY, 0, p5.height, 1, 0);

            //Append to list of points
            points.push(new Point(x, y, currentType));

            //Dismissed hasConverged and losses
            hasConverged = false;
            losses = [];
        }
    }

    //Draw loss
    const rightSetup = (p5, canvasParentRef) => {
        p5.createCanvas(p5.windowWidth / 4, p5.windowWidth / 4).parent(canvasParentRef);
    }

    const rightDraw = (p5) => {
        p5.background(255);

        if (losses.length > 0) {
            drawLosses(p5);
        }
    }

    const drawLosses = (p5) => {
        p5.stroke('#457B9D');

        //Calculate the current x offset
        let offset = 40;
        let offSetChange = (p5.width - offset * 2) / (losses.length);

        //Get the latest loss -> Display
        p5.textSize(20);
        p5.fill('#457B9D');
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
        p5.stroke('#457B9D');
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
                windowResized={leftWindowResize}>
            </Sketch>
        </div>

        <div style={{float: "left"}}>
            <Sketch 
                setup={rightSetup} 
                draw={rightDraw}
                windowResized={rightWindowResize}>
            </Sketch>
        </div>

        <div style={{clear: "both"}}></div>
        
        <ControlPanel
            onChangeType={(type) => changeType(type)}
            onReset={() => reset()}
        />
    </div>
}