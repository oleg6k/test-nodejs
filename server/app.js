const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const config = require('./config/serverConfig')

const app = express()
const port = config.api.port || 8000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(require('./routes'))
app.use(cors())

app.get('*', (req, res) => res.status(404).send({
  message: 'Опять мимо :('
}))

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`)
})