import Sketch from 'react-p5';
import Point from '../common/point';
import ClusterCore from './cluster';
import ControlPanel from './ControlPanel';

//Save state outside components -> Need rethink
//Create cores
let ORIGINS = [
    [100, 150],
    [500, 150],
    [300, 500]
];
let points = [];
let cores;

//Save reference to p5 for math utils
let p5Ref;

//Hold points and cores
let POINT_RADIUS = 15;

//Sizes
let width, height, display;

export default (props) => {
    //Function to create cores and cluster
    const generateCluster = () => {
        //Clear previous point
        points = [];
        
        //Create points around the core
        ORIGINS.forEach(core => {
            //Create 30 points around each core
            for (let i = 0; i != 30; ++i) {
                let x = -1;
                let y = -1;

                while(!(x >= POINT_RADIUS && x <= width - POINT_RADIUS && y >= POINT_RADIUS && y <= height - POINT_RADIUS)) {
                    x = core[0] + p5Ref.randomGaussian(0, POINT_RADIUS * 2);
                    y = core[1] + p5Ref.randomGaussian(0, POINT_RADIUS * 2);
                }

                points.push(new Point(x, y, null));
            }
        });
    }

    const generateCores = () => {
        //Clear previous cores
        cores = [];
        
        //Create 3 cores
        for (let i = 0; i != 3; ++i) {
            //Random core initialization
            let x = p5Ref.random(10, width - 10);
            let y = p5Ref.random(10, height - 10);
            
            cores.push(new ClusterCore(x, y, i));
        }
    }

    const distance = (point, core) => {
        return p5Ref.sqrt(p5Ref.sq(point.x - core.x) + p5Ref.sq(point.y - core.y));
    }

    const update = () => {
        //Clear children first
        cores.forEach(core => {
            core.clearChildren();
        });
  
        points.forEach(p => {
            //For each points -> calculate the distance to three cores
            let minDistance = Infinity;
            let minType = null;
    
            cores.forEach(core => {
                //Get the distance
                let dist = distance(p, core);
                //Update the potential type
                if (dist < minDistance) {
                    minDistance = dist;
                    minType = core.type;
                }
            });

            
            //Set the potential type to p
            p.type = minType;
                
            //Add to minType child
            cores[minType].addChild(p);
        });
        
        //Calculate the target position for each core
        cores.forEach(core => {
            //Calculate the average of children coordinates
            let sumX = 0;
            let sumY = 0;
            
            core.children.forEach(p => {
                sumX += p.x;
                sumY += p.y;
            });
            
            //Target position is the average
            if (core.children.length != 0) {
                let targetX = (sumX + 0.0) / core.children.length;
                let targetY = (sumY + 0.0) / core.children.length;
                
                //Set position
                core.setTarget(targetX, targetY);
            }
        });
    }

    //Handle user interactions
    const onGenerateClusters = () => {
        generateCluster();
    }

    const onGenerateCores = () => {
        generateCores();
    }

    const scalePoints = (ratio) => {
        points.forEach(point => {
            point.x = point.x * ratio;
            point.y = point.y * ratio;
        });
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

    //Set up and draw function
    const setup = (p5, canvasParentRef) => {
        //Create windows
        width = p5.windowWidth / 3;
        height = p5.windowWidth / 3;
        display = p5.windowWidth / 6;

        p5.createCanvas(width + display, height).parent(canvasParentRef);

        //Save reference to use math functionality only
        p5Ref = p5;

        //Set font size
        p5.textFont('Raleway');

        //Set the origin points
        ORIGINS = [
            [width * 0.25, width * 0.25],
            [width * 0.75, width * 0.25],
            [width * 0.5, width * 0.75]
        ];

        //Generate cores
        /*
        generateCluster();
        */
        generateCores();
    }

    const draw = (p5) => {
        p5.background(204);

        //Move the cores into position
        cores.forEach(core => {
            if (core.target_x != null) {
                core.setPosition(p5.lerp(core.x, core.target_x, 0.01), p5.lerp(core.y, core.target_y, 0.01));
            }
        })

        //Visualize the points
        p5.stroke('black');
        points.forEach(p => {
            p5.strokeWeight(2);
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
        });

        //Visualize the cores
        cores.forEach(core => {
            if (core.type === 0) {
                p5.fill('#e63946');
            } else if (core.type === 1) {
                p5.fill('#457b9d');
            } else if (core.type === 2) {
                p5.fill('#2a9d8f');
            } else {
                p5.fill('#8d99ae');
            }
            
            p5.stroke('black');
            p5.strokeWeight(5);
            p5.circle(core.x, core.y, POINT_RADIUS * 1.5);
        });

        //Call update according to frame count
        if (p5.frameCount % 15 === 0) {
            update();
        }
        
        //Draw panel
        drawDisplayPanel(p5);
    }

    const drawDisplayPanel = (p5) => {
        //Draw rectangle
        p5.noStroke();
        p5.fill(240);
        p5.rect(width, 0, display, height);

        //Display text
        p5.fill(0);
        p5.textSize(POINT_RADIUS);

        //Display labels
        p5.fill('#e63946')
        p5.text('Red centroid', width + 20, 32);

        p5.fill('#457b9d');
        p5.text('Blue centriod', width + 20, 32 + POINT_RADIUS * 5);

        p5.fill('#2a9d8f');
        p5.text('Green centroid', width + 20, 32 + POINT_RADIUS * 10);

        //Display position
        p5.fill('black');
        
        //Red centroid
        p5.text('x: ' + cores[0].x.toFixed(2).toString(), width + 40, 32 + POINT_RADIUS * 2);
        p5.text('y: ' + cores[0].y.toFixed(2).toString(), width + 40, 32 + POINT_RADIUS * 3);

        //Blue centroid
        p5.text('x: ' + cores[1].x.toFixed(2).toString(), width + 40, 32 + POINT_RADIUS * 7);
        p5.text('y: ' + cores[1].y.toFixed(2).toString(), width + 40, 32 + POINT_RADIUS * 8);

        //Green centriod
        p5.text('x: ' + cores[2].x.toFixed(2).toString(), width + 40, 32 + POINT_RADIUS * 12);
        p5.text('y: ' + cores[2].y.toFixed(2).toString(), width + 40, 32 + POINT_RADIUS * 13);
    }

    return <div>
        <Sketch
            setup={setup}
            draw={draw}
            windowResized={windowResized}/>

        <ControlPanel
            onGenerateClusters={onGenerateClusters}
            onGenerateCores={onGenerateCores}/>
    </div>
}