const express = require('express')
const path = require('path')
const chalk = require('chalk')
const compression = require('compression')

console.log(chalk.blue('Testing release build'))

const app = express()

app.use(compression())
app.use(express.static(path.resolve(__dirname, './dist')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'))
})

const port = process.env.PORT || 8080

app.listen(port, err => {
  if (err) console.log(chalk.red(err))
  else
    console.log(
      chalk.green(
        `Production server is running on http://localhost${
          port !== 80 ? ':' + port : ''
        }`
      )
    )
})
