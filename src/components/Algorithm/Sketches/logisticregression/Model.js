import convnetjs from 'convnetjs';

export default class Model {
    constructor() {
      this.createModel();
    }
    
    createModel() {
      //Create layer definition
      let layer_defs = [
        {
          type: 'input',
          out_sx: 1,
          out_sy: 1,
          out_depth: 2
        },
        {
          type: 'softmax',
          num_classes: 2
        }
      ];
      
      //Create model
      this.model = new convnetjs.Net();
      this.model.makeLayers(layer_defs);
      
      //Create input placeholder
      this.input = new convnetjs.Vol(1, 1, 2);
      
      //Create trainer
      this.trainer = new convnetjs.Trainer(
        this.model,
        {
          method: 'sgd', 
          learning_rate: 0.01, 
          l2_decay: 0.001, 
          momentum: 0.9, 
          batch_size: 10
        }
      );
    }
    
    train(inputs, labels) {
      //Save the loss
      let loss = 0;
      
      //Train for 20 iterations
      for(let i = 0; i != 20; ++i) {
        for (let j = 0; j != inputs.length; ++j) {
          //Set input
          this.input.w[0] = inputs[j][0];
          this.input.w[1] = inputs[j][1];
          
          //Train -> Get loss
          let result = this.trainer.train(this.input, labels[j]);
          
          //Add 
          loss += result.loss;
        }
      }
      
      //Get average loss
      return loss / inputs.length;
    }
    
    predict(x) {
      //Set data
      this.input.w[0] = x[0];
      this.input.w[1] = x[1];
      
      //Run through model
      let result = this.model.forward(this.input, false);
      
      //Convert to number
      return result.w[1];
    }
  }