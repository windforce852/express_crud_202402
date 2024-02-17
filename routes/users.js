const express = require("express")
const fs = require("fs")
const router = express.Router()
// const usersJson = require("../data/users.json")

//show whole json when /users
router.get("/", (req, res) => {
    const usersJson = getUsersJson();

    if (!req.query.name){
        console.log("GET: return all")
        return res.json(usersJson)
    }
    const user = usersJson.filter(
        user => user.name.toLowerCase() === req.query.name.toLowerCase()
    )
    if(!user) {
        console.log("GET: name not matched")
        return res.status(404).send("Can not find any results")
    }
    console.log("GET: name matched")
    res.json(user)
})

router.post("/", (req, res) => {
    if(req.headers['content-type'] !== 'application/json') {
        return res.status(400).send("Error: only JSON request are allowed")
    }
    const {name, age, gender} = req.body
    const newUser = {
        "name" : name,
        "gender" : gender,
        "age" : age
    }
    const usersJson = getUsersJson();
    usersJson.push(newUser)
    console.log(JSON.stringify(newUser))

    try{
        fs.writeFileSync("data/users.json", JSON.stringify(usersJson, null, 2))
        res.json(newUser)
    } catch (error) {
        console.log('Error writing users.json:', error)
        return [];
    }
    
    
})


function getUsersJson() {
    try{
        return JSON.parse(fs.readFileSync('data/users.json'));
    } catch (error) {
        console.log('Error reading users.json:', error)
        return [];
    }
    
}

module.exports = router