const {log} = require('console');
const express = require('express')
const app = express()
const PORT = 3000;

app.set('title','Hello world')

app.get('/', ( req,res )=>{
  res.send( app.get('title') )
})

let x = null;
console.log(x)

app.listen(PORT, e => (!e)? console.log(`Server listening on port ${PORT}`):console.log(e))
