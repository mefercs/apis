Last minute: 43:48

- SDK : Software Developer Kit
  The important things:
- Authentication: Validates the URL to recive the data.
- Rate limits: How many requests we can handle.
  Request methods:
- GET: Retrieve
- POST: Submit
- PATCH: Modify
- DELETE: Remove
- PUT: Replace

Because an html server serves html, an API serves data.

- REST: REpresentational State Transfer,

This is the basic express operation

```js
const handler1 = (req,res) => res.send("Something");
const handler2 = (req,res) => res.sendFile(absolutePath);
const handler3 = (req,res) => res.json(<object>);
app.METHOD( "/route", <handler>)

// Where the object is a JS object

```

### Middleware

They are functions that of the next form:

```js
function(req,res,next){
  console.log("I'm a Middleware")
  next(); // next function in the application's request-response cycle when a condition is not met
}
```

They send the cycle by sending a response when some condition is met, otherwise
they start the **next()** function in the stack.

- We mount a Middleware with the app.METHOD("/route", , <mware-function>)
  If we don't specify the route, the app.use assumes it functions for the root
  app, that means "/", and when we use app.use() it assumes it functions for
  all the requests.
  ```js
  //We bind a Middleware with app.use() || app.METHOD()
  // The second argument is called the mounth path 
  app.use("/user/:id", <mware-handler>);
  ```

When we are done, we should call the next() function, or our cycle will
stuck forever.

## Middleware & route handler

There is no big difference between, the Middleware prepares the incoming
request and prepares it for further processing by other handlers.
