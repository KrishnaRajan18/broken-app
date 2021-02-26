const express = require("express");
const axios = require("axios");
const ExpressError = require("./expressError");
const app = express();
app.use(express.json());

app.get('/hello',(req,res)=>{
  return res.send("hello everyone")
})
app.post('/', async function(req, res, next) {

  try{
    const devList= req.body.developers;
    userList=[];
    for (let dev of devList){
      if(!dev){
        throw new ExpressError("User not found",404);
      }
      let userInfo = await axios.get(`https://api.github.com/users/${dev}`)
      userList.push(userInfo);
     
    }
  let resp = (await Promise.all(userList)).map((dev)=>{
    return {
      name:dev.data.name,
      bio:dev.data.bio
    };
  })
  return res.json(resp);
    
  }catch(err){
    next(err);
  }
 
});


app.use(function(req,res,next){
  return new ExpressError("Not Found",404)
});


app.use((err,req,res,next)=>{
  res.status(err.status||500);
  return res.json({
    error:err.message,
    
  });
}
);

module.exports =app
