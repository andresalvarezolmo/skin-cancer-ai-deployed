const express = require('express')
const app = express()

const diagnoseRouter = require('./routes/diagnose');

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hey!')
})

app.use('/diagnose', diagnoseRouter);


app.listen(port, () => {
  console.log(`Backend running on port ${port}`)
})