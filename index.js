const express = require('express')

const blog = require('./routes/blog')

// ...


const app = express()
const port = 3000


app.use(express.static('public'))
app.use('/blog' , blog)


app.get('/', (req, res) => {
  console.log('hello')
  res.send('Hello World!')
})


app.post('/', (req, res) => {
  console.log('hello world')
  res.send('Data received!')

})

app.get('/you',(req, res) => {
  console.log('hello world index')
  res.sendFile("template/index.html" , {root:__dirname})

})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



