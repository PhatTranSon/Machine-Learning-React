export class StaticPoint {
    constructor(x, y, type) {
      this.x = x;
      this.y = y;
      this.type = type;
      this.distanceToUser = 0;
    }
    
    setDistance(distance) {
      this.distanceToUser = distance;
    }
  }
  
export class DynamicPoint {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.type = null;
      this.neighbors = [];
    }
  
    setNeighbors(neighbors) {
      this.neighbors = neighbors;
    }
    
    setType(type) {
      this.type = type;
    }
    
    setLocation(x, y) {
      this.x = x;
      this.y = y;
    }
}