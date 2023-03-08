const express = require ("express")
const validate = require ("./validateMiddleWare.js")
const fs = require("fs")
const path = require("path")
const { json } = require("express")
const port = 4000
const app = express()
app.use(express.json())

app.get("/books",(req,res)=>{
    let storagePath = path.join(__dirname, "storage")
    var  results =[] // arrray of buffers
    var books =fs.readdirSync(storagePath)
    // console.log(storagePath)
    for (var i = 0 ; i<books.length ; i++){
        var content = fs.readFileSync(path.join(storagePath,books[i]))
        results.push(JSON.parse(content))
    }
    // console.log(results)
    res.status(200).json(results)
})

app.post("/postABook",validate,(req,res)=>{
    let storagePath = path.join(__dirname, "storage")
    if (!fs.existsSync(storagePath)){
        fs.mkdirSync(storagePath)
    }
    let uniqueId = Date.now().toString()
    let fileContent =  req.body
    fileContent.id = uniqueId
     stringifiedContent= JSON.stringify(fileContent)
    fs.writeFileSync(path.join(storagePath, uniqueId +'.txt'),stringifiedContent)
    res.status(200).send("bookAdded") 
})

app.delete("/delete/:id",(req,res)=>{
    let storagePath = path.join(__dirname, "storage")
    var  deletedFile = req.params.id +".txt"
    var books = fs.readdirSync(storagePath) 
    console.log(books)
    for (var j = 0 ; j<books.length ; j++){
        if (deletedFile===books[j]){
          fs.unlinkSync(path.join(storagePath,books[j]))
          res.status(200).send("book deleted")
        }
    }
    res.status(403).send("Not Found") 
})



app.put('/update/:id',validate,(req,res)=>{
     var idToUpdate = req.params.id
     var content = req.body
     content.id = idToUpdate
     fs.writeFileSync(path.join(__dirname,"storage", idToUpdate+".txt"),JSON.stringify(content))
     res.status(200).send("book updated")
})



app.listen(port,()=>{
    console.log("listening on the localhost"+ port)
})