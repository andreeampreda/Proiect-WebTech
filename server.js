const express=require("express")
const app=express()
const bcrypt=require("bcrypt")
const cors = require("cors");

app.use(cors());  
app.use(express.json())
app.use(express.static('views'))

const users=[]

app.get('/users',(req,res)=>{
    res.json(users)
})

app.post('/users',async (req,res)=>{
    try{
        const salt=await bcrypt.genSalt()
        const hashedPswd=await bcrypt.hash(req.body.password,salt)
        const user={username:req.body.username,
                    password:hashedPswd}
        users.push(user)
        console.log(req.body)
        res.status(201).send()
    }catch{
        res.status(500).send()
    } 
})

app.post('/users/login',async (req,res)=>{
    const user=users.find(user => user.username==req.body.username)
    
    console.log("Received body:", req.body); // Debugging
    
    if(user==null){
        return res.status(400).send("CANNOT FIND USER")
    }

    try{
        if(await bcrypt.compare(req.body.password,user.password)){
            res.send("SUCCES")
        }else{
            res.send("INCORRECT PASSWORD")
        }
    }catch{
        res.status(500).send()
    }
})

app.listen(5500)