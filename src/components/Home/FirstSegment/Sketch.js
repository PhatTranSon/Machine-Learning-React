import Sketch from 'react-p5';

class Star {
    constructor(p5, speed) {
        //Save reference to p5
        this.p5 = p5;
        
        //Initialize random position
        this.x = this.p5.random(-this.p5.width, this.p5.width);
        this.y = this.p5.random(-this.p5.height, this.p5.height);
        
        //Save position in the z axis and previous z
        this.z = this.p5.random(this.p5.width);
        this.previous_z = this.z //This is the draw the stride
        
        //Velocity of moving star
        this.speed = speed;
    }
    
    //Method to display star
    display() {
        this.p5.fill(0);
        this.p5.noStroke();
        
        //Get relative position with the z axis
        let relativeX = this.p5.map(this.x / this.z, 0, 1, 0, this.p5.width);
        let relativeY = this.p5.map(this.y / this.z, 0, 1, 0, this.p5.height);
        
        //Get previous relative position with z axis
        let previousRelativeX = this.p5.map(this.x / this.previous_z, 0, 1, 0, this.p5.width);
        let previousRelativeY = this.p5.map(this.y / this.previous_z, 0, 1, 0, this.p5.height);
        
        //Draw the star
        let radius = this.p5.map(this.z, 0, this.p5.width, 20, 0);
        this.p5.circle(relativeX, relativeY, radius);
        
        //Update the position in the z axis so that
        //i t is closer to screen
        this.previous_z = this.z;
        
        //Draw the stroke
        this.p5.stroke(0);
        this.p5.strokeWeight(1);
        this.p5.line(previousRelativeX, previousRelativeY, relativeX, relativeY);
    }
    
    //Method to update star position in space
    update() {
        this.z -= this.speed;
        
        //Check if star has gone out of screen -> Reallocate
        if (this.z <= 0) {
            //Initialize random position
            this.x = this.p5.random(-this.p5.width, this.p5.width);
            this.y = this.p5.random(-this.p5.height, this.p5.height);
    
            //Save position in the z axis and previous z
            this.z = this.p5.width;
            this.previous_z = this.z //This is the draw the stride
        }
    }
  }

const BackgroundSketch = (props) => {
    const stars = [];

    const setup = (p5, p5CanvasParent) => {
        //Get windows size
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        //Create canvas
        p5.createCanvas(winWidth, winHeight).parent(p5CanvasParent);

        //Initialize stars
        //Append star
        for (let i = 0; i !== 300; ++i) {
            stars.push(new Star(p5, 30));
        }
    }

    const draw = (p5) => {
        p5.background(255);
        //Translate according to mouse position
        p5.translate(p5.mouseX, p5.mouseY);
        //Draw star
        stars.forEach(star => {
            star.update();
            star.display();
        });
    }

    return <Sketch setup={setup} draw={draw}/>
}

export default BackgroundSketch;