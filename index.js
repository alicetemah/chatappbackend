 var express = require('express')

var bodyParser = require("body-parser")
const messages =[{
    name:"Alice",
    message:"Hi"
}, {name:"Bob",message:"Hello" }]

var app = express()
app.use(bodyParser)
app.use(express.static(__dirname))

app.get('/',(req,res)=>{

    res.send('My ChatApp')

})
app.get('/messages',(req,res)=>{
    res.send(messages)

})
app.post('/sendMessage',(req, res)=>{
    messages.push(req.body.message)
})

const port = 3000
app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
}) 
