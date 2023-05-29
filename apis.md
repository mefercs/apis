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

## Middleware

They are functions of the next form:

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

  //mounting multiple mware functions at the same mount path for all kind of request
  app.use('/user/:id', (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next()
  }, (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
  })
  
  //mounting multiple mware functions at the same mount path but just for get requests
  app.get('/user/:id', (req, res, next) => {
    console.log('ID:', req.params.id)
    next()
  }, (req, res, next) => {
    res.send('User Info')
  })
  
  // handler for the /user/:id path, which prints the user ID
  app.get('/user/:id', (req, res, next) => {
    res.send(req.params.id) // this ends the req-res cycle as well as next()
  })

  ```

When we are done, we should call the next() function, or our cycle will
stuck forever.

## Middleware & route handler

There is no big difference between, the Middleware prepares the incoming
request and prepares it for further processing by other handlers.
Whereas a route handler is code that is looking for a
request to a specific incoming URL.

## Route parameters from the client

They are named segments of the url separated with (/) slashes.
```
route_path: '/user/:userId/book/:bookId'
actual_request_URL: '/user/546/book/6754'
req.params: {userId: '546', bookId: '6754'}
```
req.params is the object that capture these values.

## Query parameters from the client

The query string is another way to get input from the client, and is
delimited by the (?) question mark sign, and includes field=value couples, where
each couple is separated by (&) ampersands.

```
app.route("path").get(<handler>).post(<handler>)
//chain multiple methods at the same path for a cleaner code
```

## Post

It is used to send data through html forms

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
TODO: LAST TOPIC:  Body parser to parse a POST requests
