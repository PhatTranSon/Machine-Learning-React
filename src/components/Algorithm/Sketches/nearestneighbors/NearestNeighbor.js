import { StaticPoint, DynamicPoint } from './point';
import Sketch from 'react-p5';
import ControlPanel from './ControlPanel';

//Save state outside components -> Need to rethink
let staticPoints = [];
let neighbors = 5;
let neighborCounts;

//Core points to cluster around
let corePoints = [];

//Create user-controlled point
let dynamicPoint = new DynamicPoint(-100, -100);

//Sizes
let width, height, display;

//Create holder for points
let POINT_RADIUS = 15;

//Hold ref to p5 for math functionality
let p5Ref;

export default (props) => {
    //Function to draw a point
    const drawPoint = (p5, p) => {
        p5.stroke('black');
        if (p.type === 0) {
            p5.fill('#e63946');
        } else if (p.type === 1) {
            p5.fill('#457b9d');
        } else if (p.type === 2) {
            p5.fill('#2a9d8f');
        } else {
            p5.fill('#8d99ae');
        }
        p5.circle(p.x, p.y, POINT_RADIUS);
    }

    //Function to draw display panel
    const translateClass = (name) => {
        if (name === 0) {
            return "Red";
        } else if (name === 1){
            return "Blue";
        } else if (name === 2) {
            return "Green";
        } else {
            return "Not found";
        }
    }

    const drawDisplayPanel = (p5) => {
        //Use white background color
        p5.fill(240);
        p5.noStroke();
        p5.rect(width, 0, display, height);

        //Write text
        p5.fill(0);
        p5.textSize(POINT_RADIUS);

        //Draw number of neighbors
        p5.text('K: ' + neighbors.toString(), width + 20, 32)

        //Draw chosen class
        p5.text('Class: ', width + 20, 64);
        if (dynamicPoint.type === 0) {
            p5.fill('#e63946');
        } else if (dynamicPoint.type === 1) {
            p5.fill('#457b9d');
        } else if (dynamicPoint.type === 2) {
            p5.fill('#2a9d8f');
        } else {
            p5.fill('#8d99ae');
        }
        p5.text(translateClass(dynamicPoint.type), width + 20 + POINT_RADIUS * 3, 64);

        //Draw neighbors count
        p5.fill(0);
        p5.text('Red neighbors: ', width + 20, 96);
        p5.text('Blue neighbors: ', width + 20, 128);
        p5.text('Green neighbors: ', width + 20, 160);

        p5.fill('#e63946');
        p5.text((neighborCounts ? neighborCounts[0].toString() : "0"), width + 20 + POINT_RADIUS * 8, 96);
        p5.fill('#457b9d');
        p5.text((neighborCounts ? neighborCounts[1].toString() : "0"), width + 20 + POINT_RADIUS * 8, 128);
        p5.fill('#2a9d8f');
        p5.text((neighborCounts ? neighborCounts[2].toString() : "0"), width + 20 + POINT_RADIUS * 8, 160);
    }

    //Function to generate static points around cores
    const generateStaticPoints = () => {
        //Clear existing
        staticPoints = [...corePoints];
        
        //Populate static points using random data
        corePoints.forEach(core => {
            //Create about 10 data points for each core points
            for (let i = 0; i != 30; ++i) {
                //Create points
                let x = core.x + p5Ref.randomGaussian(0, 50);
                let y = core.y + p5Ref.randomGaussian(0, 50);

                //Check in boud
                while (!(x >= POINT_RADIUS && x < width - POINT_RADIUS && y >= POINT_RADIUS && y < height - POINT_RADIUS)) {
                    x = core.x + p5Ref.randomGaussian(0, 50);
                    y = core.y + p5Ref.randomGaussian(0, 50);
                }

                //Add points
                staticPoints.push(new StaticPoint(x, y, core.type));
            }
        });
    }

    const scalePoints = (ratio) => {
        staticPoints.forEach(point => {
            point.x = point.x * ratio;
            point.y = point.y * ratio;
        });
    }

    //Function to find neighbors for the dynamic points
    const findNeighbors = (total) => {
        //map coordinates to [0, 1] interval
        let uX = dynamicPoint.x
        let uY = dynamicPoint.y
        
        staticPoints.forEach(sPoint => {
            //map coordinates to [0, 1] interval
            let sX = sPoint.x
            let sY = sPoint.y
            
            //Calculate the eucleadian distance and add to list
            sPoint.setDistance(Math.sqrt(Math.pow(uX - sX, 2) + Math.pow(uY - sY, 2)));
        });
        
        //Sort to ascending order
        let copiedPoints = staticPoints.slice();
        copiedPoints.sort((a, b) => a.distanceToUser - b.distanceToUser);
        
        //Get closest neighbors
        dynamicPoint.setNeighbors(copiedPoints.slice(0, total));
    }

    const findType = () => {
        //Count neighbor type
        let typeCounts = {
            0: 0,
            1: 0,
            2: 0
        }
        
        dynamicPoint.neighbors.forEach(p => {
            typeCounts[p.type] += 1;
        });

        //Save neighbor counts
        neighborCounts = typeCounts;
        
        //Get the type with highest count
        let maxType = 0;
        let maxCount = -1;
        for (let i = 0; i != 3; ++i) {
            if (typeCounts[i] > maxCount) {
                maxType = i;
                maxCount = typeCounts[i];
            }
        }
        
        dynamicPoint.setType(maxType);
    }

    //Handle user interaction
    const onRegenerate = () => {
        generateStaticPoints();
        //Remove neighbors
        dynamicPoint.neighbors = [];
        dynamicPoint.type = null;
    }

    const onSetNeighbors = (totalNeighbors) => {
        neighbors = parseInt(totalNeighbors);
    }

    //Handle resize
    const windowResized = (p5) => {
        //Get the new size
        let newWidth = p5.windowWidth / 3;
        let newHeight = p5.windowWidth / 3;
        let newDisplay = p5.windowWidth / 6;

        //Get the ratio
        let ratio = newWidth / width;
        POINT_RADIUS *= ratio;
        scalePoints(ratio);

        //Set new sizes
        width = newWidth;
        height = newHeight;
        display = newDisplay

        //Resize the canvas
        p5.resizeCanvas(width + display, height);
    }

    //Set up and draw function for left canvas
    const leftSetup = (p5, canvasParentRef) => {
        //Create windows
        width = p5.windowWidth / 3;
        height = p5.windowWidth / 3;
        display = p5.windowWidth / 6;
        p5.createCanvas(width + display, height).parent(canvasParentRef);

        //Set point radius
        POINT_RADIUS = width / 30;

        //Create cores
        corePoints = [
            new StaticPoint(width * 0.25, height * 0.3, 0),
            new StaticPoint(width * 0.75, height * 0.3, 1),
            new StaticPoint(width * 0.5, height * 0.75, 2)
        ];

        //Save reference to p5 library
        p5Ref = p5;
        p5.textFont('Raleway');

        generateStaticPoints();
    }

    const leftDraw = (p5) => {
        //Background
        p5.background(204);

        //Draw display panel
        drawDisplayPanel(p5);

        //Highlighting the user point's neighbors
        dynamicPoint.neighbors.forEach(neighbor => {
            //Draw line
            p5.stroke('black');
            p5.strokeWeight(2);
            p5.line(dynamicPoint.x, dynamicPoint.y, neighbor.x, neighbor.y);
            
            //Highlight neigbors
            p5.noFill();
            p5.stroke('yellow');
            p5.circle(neighbor.x, neighbor.y, POINT_RADIUS + 4);
        });

        //Draw points
        p5.strokeWeight(2);

        corePoints.forEach(p => {
            drawPoint(p5, p);
        });

        staticPoints.forEach(p => {
            drawPoint(p5, p);
        });
        
        drawPoint(p5, dynamicPoint, '#16b8f3');
    }

    const leftMouseMove = (p5) => {
        //Check if mouse is in bound
        if (p5.mouseX >= 0 && p5.mouseX <= p5.width - display && p5.mouseY >= 0 && p5.mouseY <= p5.height) {
            //Set new location for points
            dynamicPoint.setLocation(p5.mouseX, p5.mouseY);
            
            //Set new nearest neighbors for userpoint
            findNeighbors(neighbors);
            
            //Set new type for userpoints
            findType();
        }
    }

    return <div>
        <Sketch 
            setup={leftSetup}
            draw={leftDraw}
            mouseMoved={leftMouseMove}
            windowResized={windowResized}>
        </Sketch>

        <ControlPanel
            onRegenerate={onRegenerate}
            onSetNeighbors={onSetNeighbors}/>
    </div>
}