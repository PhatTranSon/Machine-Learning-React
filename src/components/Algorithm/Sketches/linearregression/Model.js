const tf = require('@tensorflow/tfjs');

export default class LinearModel {
    constructor() {
        this.m = tf.variable(tf.scalar(Math.random()));
        this.b = tf.variable(tf.scalar(Math.random()));
        this.optimizer = tf.train.sgd(0.5);
    }

    reset() {
        tf.tidy(() => {
            this.m.assign(tf.scalar(0));
            this.b.assign(tf.scalar(0));
        });
    }

    _predict(x) {
        return x.mul(this.m).add(this.b);
    }

    _loss(x, y) {
        return this._predict(x).sub(y).square().mean();
    }

    train(input, output) {
        let loss;

        tf.tidy(() => {
            //Convert to tensor data
            input = tf.tensor1d(input);
            output = tf.tensor1d(output);

            //Run optimizer
            this.optimizer.minimize(() => this._loss(input, output));
            loss = this._loss(input, output).dataSync();
        });

        return loss;
    }

    predict(x) {
        let result;

        tf.tidy(() => {
            //Convert to tensor data
            x = tf.tensor1d(x);
            result = this._predict(x).dataSync();
        });

        return result;
    }
}