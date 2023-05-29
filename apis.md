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

## Middleware & route hKndler

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

It is used to send data through html forms, and in the REST convention the POST method
is used to create new items into the database. The data is hidden within the request body
and it is part of the http request, also called PAYLOAD (the request body).

- The body is encoded as a query string (URL encoded body): We use the **body-parser** package
  to decode the data.

  ```
  POST /path/subpath HTTP/1.0
  From: john@example.com
  User-Agent: someBrowser/1.0
  Content-Type: application/x-www-form-urlencoded
  Content-Length: 20

  name=John+Doe&age=25 //query string encoded
  ```

  Another way to encode data is using multipar/form-data to upload binary files.

- We use a middleware to handle all the URL encoded data, with the next code:

```js
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false })); //extended is a configuration that tells the body parser which parsin needs to be used
// when false it uses the classic querystring library
// when true is use the qr library
// In both cases we don't return a JavaScript object, so we can't use hasOwnProperty and toString
```

The difference with the req., so the main request body is stored in
req.body, so in total we have the next objects story our data:

1. req.params
2. req.query
3. req.body

```html
<form action="/name" method="post">
  <label>First Name :</label>
  <input type="text" name="first" value="John" /><br />
  <label>Last Name :</label>
  <input type="text" name="last" value="Doe" /><br /><br />
  <input type="submit" value="Submit" />
</form>
```

And in the js

```js
app.route("/name").post((req, res) => {
  const { first, last } = req.body;
  res.json({ name: `${first} ${last}` });
});
```

## Final convention

- POST(PUT): create a new resource using the information sent with the request.
- GET: Read an existing resource without modifying it
- PUT(PATCH or sometimes POST): Update a resource using the data sent.
- DELETE: Delete a resource

Payload: Data within the request body.
