const express = require("express")
const fs = require("fs")
const app = express()
const port = 3000

//for parse json bodies sent by client
app.use(express.json())

const usersRouter = require("./routes/users")
app.use("/users", usersRouter) //set usersRouter rout localhost:3000/users

//visit localhost:3000
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {console.log("Server Start")})