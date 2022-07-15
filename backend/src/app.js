const express = require('express')
const app = express()

const diagnoseRouter = require('./routes/diagnose');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hola chonky girl!')
})

app.use('/diagnose', diagnoseRouter);


app.listen(port, () => {
  console.log(`Backend running on port ${port}`)
})