import Model from './Model';
import Sketch from 'react-p5';

//Store the data outside react component -> Not recommend
let inputs = [];
let outputs = [];

//Linear model
let model = new Model();

//Save model losses
let losses = [];
let hasConverged = false;

export default (props) => {
    //Method for reseting sketch
    const reset = () => {
        model = new Model();
        inputs = [];
        outputs = [];
        losses = [];
        hasConverged = false;
    }

    //Method to handle windows resize
    const windowResize = (p5) => {
        p5.resizeCanvas(p5.windowWidth / 4, p5.windowWidth / 4);
    }

    //Methods for left canvas
    const leftSetup = (p5, canvasParentRef) => {
        p5.createCanvas(p5.windowWidth / 4, p5.windowWidth / 4).parent(canvasParentRef);
    };

    const leftDraw = (p5) => {
        //Draw background
        p5.background('black');

        //Display appended points in arrays
        p5.fill('#ffd7b5');
        p5.stroke('white');
        p5.strokeWeight(2);
        for (let i = 0; i != inputs.length; ++i) {
            let px = p5.map(inputs[i], 0, 1, 0, p5.width);
            let py = p5.map(outputs[i], 0, 1, p5.height, 0);
            p5.circle(px, py, 20);
        }
        
        //Train network
        if (inputs.length > 0 && !hasConverged) {
            let loss = model.train(inputs, outputs);
            losses.push(loss[0]);
        }

        //Check if model has converged
        if (losses.length >= 2 && Math.abs(losses[losses.length - 1] - losses[losses.length - 2]) < 0.0000001) {
            hasConverged = true;
        }

        //Draw regression line
        drawRegressionLine(p5);
    };

    const drawRegressionLine = (p5) => {
        //Get points and predictions
        let points = [0, 1];
        let predictions = model.predict(points);

        //Map to canvas dimension
        points = points.map(val => p5.map(val, 0, 1, 0, p5.width));
        predictions = predictions.map(val => p5.map(val, 0, 1, p5.height, 0));

        //Draw line
        p5.strokeWeight(3);
        p5.stroke('#ff9248');
        p5.line(points[0], predictions[0], points[1], predictions[1])
    }

    const leftMouseClicked = (p5) => {
        if (p5.mouseX > 0 && p5.mouseX <= p5.width && p5.mouseY > 0 && p5.mouseY <= p5.height) {
            //Reset model
            //model.reset();
            hasConverged = false;

            //Add new points
            let x = p5.map(p5.mouseX, 0, p5.width, 0, 1);
            let y = p5.map(p5.mouseY, 0, p5.height, 1, 0);

            //Add to input
            inputs.push(x);
            outputs.push(y);

            //Reset loss
            losses = [];
        }
    }

    //Method for right canvas
    const rightSetup = (p5, canvasParentRef) => {
        p5.createCanvas(p5.windowWidth / 4, p5.windowWidth / 4).parent(canvasParentRef);
        p5.noStroke();
    }

    const rightDraw = (p5) => {
        p5.background('white');
        
        //Draw the line loss plot
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
        p5.stroke('#ddbea9');
        p5.strokeWeight(2);
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
                windowResized={windowResize}>
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
        <button 
            onClick={() => reset()} 
            className="button is-primary" 
            style={{width: "100%", background: "#F1FAEE", color: "black"}}>
            Reset
        </button>
    </div>
}