

Here is the example of a handler
route function

```js
function(req,res){
  res.send(); 
  //this line ends the req-res cycle
}
```

here is the example with a 
middleware

```js
function(req,res,next){
  if(err) next(err);
  next(data);
}
```

