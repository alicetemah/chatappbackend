const express = require('express')
const cors = require('cors')
const {Server} = require('socket.io')
const {createServer} = require('node:http')

const messages =[{
    name:"Alice",
    message:"Hi"
}, {name:"Bob",message:"Hello" }]

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(__dirname))
const server = createServer(app)
const io = new Server(server,{
    cors: {
      origin:"*"
    }
  });

app.get('/',(req,res)=>{

    res.send('My Chat App API')

})
app.get('/text',(req,res)=>{

    res.json({success:true, messages:'hola'})

})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('getMessage',()=>{       
        io.emit('message',{
            messages: messages
        })
    })
    socket.on('sendMessage',(data)=>{
        messages.push(data)
        io.emit('message',{
            messages: messages
        })        
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});


const port = 3000
server.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
}) 
