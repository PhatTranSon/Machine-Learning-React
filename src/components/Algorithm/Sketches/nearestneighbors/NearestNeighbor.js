import { StaticPoint, DynamicPoint } from './point';
import Sketch from 'react-p5';
import ControlPanel from './ControlPanel';

//Save state outside components -> Need to rethink
let staticPoints = [];
let neighbors = 5;
let neighborCounts;

export default (props) => {
    //Set canvas width and height
    const width = 400, height = 400, display = 240;

    //Hold ref to p5 for math functionality
    let p5Ref;

    //Create holder for points
    const POINT_RADIUS = 15;

    //Core points to cluster around
    const corePoints = [
        new StaticPoint(100, 75, 0),
        new StaticPoint(300, 75, 1),
        new StaticPoint(200, 300, 2)
    ];

    //Create user-controlled point
    let dynamicPoint = new DynamicPoint(-100, -100);

    //Function to draw a point
    const drawPoint = (p5, p, color='black') => {
        p5.stroke(color);
        if (p.type === 0) {
            p5.fill('red');
        } else if (p.type === 1) {
            p5.fill('blue');
        } else if (p.type === 2) {
            p5.fill('green');
        } else {
            p5.fill('gray');
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
            return "None";
        }
    }

    const drawDisplayPanel = (p5) => {
        //Use white background color
        p5.fill(240);
        p5.noStroke();
        p5.rect(width, 0, display, height);

        //Write text
        p5.fill(0);
        p5.textSize(20);

        //Draw number of neighbors
        p5.text('K: ' + neighbors.toString(), width + 20, 32)

        //Draw chosen class
        p5.text('Class: ', width + 20, 64);
        if (dynamicPoint.type === 0) {
            p5.fill('red');
        } else if (dynamicPoint.type === 1) {
            p5.fill('blue');
        } else if (dynamicPoint.type === 2) {
            p5.fill('green');
        } else {
            p5.fill('gray');
        }
        p5.text(translateClass(dynamicPoint.type), width + 90, 64);

        //Draw neighbors count
        p5.fill(0);
        p5.text('Red neighbors: ', width + 20, 96);
        p5.text('Blue neighbors: ', width + 20, 128);
        p5.text('Green neighbors: ', width + 20, 160);

        p5.fill('red');
        p5.text((neighborCounts ? neighborCounts[0].toString() : "0"), width + 200, 96);
        p5.fill('blue');
        p5.text((neighborCounts ? neighborCounts[1].toString() : "0"), width + 200, 128);
        p5.fill('green');
        p5.text((neighborCounts ? neighborCounts[2].toString() : "0"), width + 200, 160);
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
                let x = core.x + p5Ref.randomGaussian(0, 30);
                let y = core.y + p5Ref.randomGaussian(0, 30);

                //Add points
                staticPoints.push(new StaticPoint(x, y, core.type));
            }
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

    //Set up and draw function for left canvas
    const leftSetup = (p5, canvasParentRef) => {
        p5.createCanvas(width + display, height).parent(canvasParentRef);

        //Save reference to p5 library
        p5Ref = p5;

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
            mouseMoved={leftMouseMove}>
        </Sketch>

        <ControlPanel
            onRegenerate={onRegenerate}
            onSetNeighbors={onSetNeighbors}/>
    </div>
}