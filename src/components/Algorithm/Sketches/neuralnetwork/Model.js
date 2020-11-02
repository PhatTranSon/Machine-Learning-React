import convnetjs from 'convnetjs';

export default class Model {
    constructor() {
        this.createModel();
    }

    createModel() {
        //Create layer def
        let layer_definitions = [];

        //Add layer
        layer_definitions.push({
            type: 'input',
            out_sx: 1,
            out_sy: 1,
            out_depth: 2
        });

        layer_definitions.push({
            type: 'fc',
            num_neurons: 6,
            activation: 'tanh'
        });

        layer_definitions.push({
            type: 'fc',
            num_neurons: 2,
            activation: 'tanh'
        });

        layer_definitions.push({
            type: 'softmax',
            num_classes: 2
        });

        //Create network
        this.model = new convnetjs.Net();
        this.model.makeLayers(layer_definitions);

        //Create trainner
        this.trainer = new convnetjs.SGDTrainer(
            this.model, {
                learning_rate: 0.001,
                mometum: 0.9,
                batch_size: 10,
                l2_decay: 0.001
            }
        );

        //Create input
        this.input = new convnetjs.Vol(1, 1, 2);
    }

    train(inputs, labels) {
        let loss = 0;

        for (let j = 0; j != 20; ++j) {
            for (let i = 0; i != inputs.length; ++i) {
                //Set data
                this.input.w = inputs[i];

                //Train
                let result = this.trainer.train(this.input, labels[i]);

                //Add loss
                loss += result.loss;
            }
        }

        //Average loss
        return loss / inputs.length;
    }

    predict(input) {
        //Set input
        this.input.w = input;

        //Get output
        let result = this.model.forward(this.input, false);

        //Softmax layer result
        return result.w[1];
    }
}