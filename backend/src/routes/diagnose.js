const router = require('express').Router();
const tf = require('@tensorflow/tfjs');
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');

// const example1 = require("/Users/andres/Documents/code/skin-cancer-ai-deployed/backend/src/ml/examples/example1.jpg")




router.get('/', async (req, res) => {
    console.log("Cargando modelo...");
    const model = await tf.loadGraphModel("file://C:/Users/andres/Documents/code/skin-cancer-ai-deployed/backend/src/ml/model.json");
    console.log("Modelo cargado...");
    res.send('Diagnose section!')


    fs.readFile('src/ml/examples/example1.jpg', (err, buffer) => {
        if (err) {
          console.error(err);
          return;
        }
        // console.log(data);s
        const image = Buffer.from(buffer, 'base64')
        // get the tensor
        const tensor = tfnode.node.decodeImage(image)
        reshapedTensor = tensor.reshape([1, 1024, 1024, 3]);
        console.log(reshapedTensor)
        let prediction = model.predict(reshapedTensor).dataSync();
        // console.log(prediction)
    });

})

module.exports = router;
