const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
// const fileUpload = require('express-fileupload')

const app = express()

app.use(express.json({extended: true, limit: '5mb'}))
// app.use(fileUpload({}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/product', require('./routes/product.routes'))
app.use('/api/img', require('./routes/img.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App is started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error ', e.message)
    process.exit(1)
  }
}

start()
