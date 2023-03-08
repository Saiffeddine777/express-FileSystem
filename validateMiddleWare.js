const validate = (req,res,next)=>{
     if (req.body.name &&req.body.description && req.body.title && req.body.author){
        console.log(req.body.name &&req.body.description && req.body.title && req.body.author)
        next()
     }
     else{
        res.status(403).send("verify your object")
     }
} 

module.exports = validate