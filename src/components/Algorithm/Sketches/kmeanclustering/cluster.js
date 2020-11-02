export default class ClusterCore {
    constructor(x, y, type) {
      this.x = y;
      this.y = y;
      this.type = type;
      this.children = [];
    }
    
    setPosition(x, y) {
      this.x = x;
      this.y = y;
    }
    
    setTarget(target_x, target_y) {
      this.target_x = target_x;
      this.target_y = target_y;
    }
    
    clearChildren() {
      this.children = [];
    }
    
    addChild(child) {
      this.children.push(child);
    }
  }