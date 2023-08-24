- [Mount a path for express](https://stackoverflow.com/questions/11509660/making-a-specific-directory-browsable-in-express-js)
- [Template engines in Express](https://expressjs.com/en/guide/using-template-engines.html)
  - [Pug engine](https://pugjs.org/api/getting-started.html)
    - [Simple use](https://www.freecodecamp.org/learn/quality-assurance/advanced-node-and-express/use-a-template-engines-powers)
- [Express-session](https://www.npmjs.com/package/express-session)
- [Passport-local](https://www.passportjs.org/packages/passport-local/)
- [Github OAuth App](https://www.freecodecamp.org/news/how-to-set-up-a-github-oauth-application/)

# Template engine

At runtime a template engine allow to change variables in the template file, by actual
values supplied by the server, then it transforms the template into an static HTML file
that is send to the client. As this occurs in the server and not the client, this avoids
a double API call.

We need to indicate express which template engine we are using with 
```js
//In express these are defined variables
app.set('view engine', 'pug') //Is used to assign a name to a value app.set(name, value)
app.set('views', './views/pug') // Tells express to render all views relative to that directory 

// If we want to get the value we use app.get("view") =='./views/pug'

app.get('/', (res,req) => { res.render(index,{title:"Hello",message: "World"}) }) // Using the template engine with variables
```

In a Pug file we can reference a varible with `#{variable_name}`

## Express-session and passport.js

It saves the session id as a cookie in the client, a session cookies is destroyed when the current browser window is closed. With 
passport we get the session id. 

```js 
app.use(session({ //session is from express-session
    secret: process.env.SESSION_SECRET, // we should create that environment variable and give it a random value, that value is used to create the serialization
    resave: true, 
    saveUninitialized:true,
    cookie: {secure:false}
}))
app.use(passport.initialize())
app.use(passport.session())
```

## Serialization and deserialization

We need to create this functions given by passport in
our app application.

Serialization and deserialization are important concepts in regards to authentication. To serialize an object means to convert its contents into a small key that can then be deserialized into the original object. This is what allows us to know who has communicated with the server without having to send the authentication data, like the username and password, at each request for a new page.
```js
passport.serializeUser(callback); //Callback means that we define the callbacks
passprot.deserializeUser(callback);
```

The callback function is called with 2 arguments like this : `callback(user, errorHalingfunction)`
the error handling function a function that accepts 2 arguments, an error and unique key to
identify the user or the object,
the next code should be placed out of a http request or
something, because it defines the functions for passport.

```js
passport.serializeUser((user, done) => { //main callback function, and done is the second callback function from passport that handles errors
  done(null, user._id);
});

passport.deserializeUser((id, done) => { //the same
  myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
    done(null, null); //The done function is specific to the program
  });
});
```

## Authentication strategies

- They are used to authenticate locally
We can use a strategy to authenticate based on locally saved information (if you have them registered first),
here we are using `passport-local`, and then the next code:

```js
//This is within the database connection as well
passport.use(new LocalStrategy((username, password, done) => {
  myDataBase.findOne({ username: username }, (err, user) => {
    console.log(`User ${username} attempted to log in.`);
    if (err) return done(err);
    if (!user) return done(null, false);
    if (password !== user.password) return done(null, false);
    return done(null, user);
  });
}));
```
So this is the process to authenticate someone locally.

- To authenticate we need to use a middleware, and `passport.authenticate('local', {failureRedirect:'/'})`
  it accepts another argument to specify some options. `passport.authenticate()` is
  a middleware by itself, so it calls next for his own.
  - If the authentication was succesful, the user object will be saved in `req.user`
- To check if a user is already authenticated we use the middleware `ensureAuthenticated(req,res,next){}`
  , within we use `req.isAuthenticated()` which is a passport method on the request which checks if req.user is defined
```js
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); //we return next if so
  }
  res.redirect('/'); //othewise we redirect to login
};
```
## Log out a user

We use the passport method on `request` called `req.logout()`

## Missing pages 404

We use the next middleware, and should be place after all the other routes
```js
app.use( (req,res,next)=>{ 
  res.status(404).type('text').send('Not Found')
  } )
```

## Registration logic

1. Register the new user
2. Authenticate the new user
3. Redirect to profile

## Hasing passwords

using plain text in our applications is never good,
that is why we are using `bcrypt.js`

## Modules

A file has the `module` object, in which is 
stored in the property `exports`, this object is
used to expose parts of our application

## Authentication paths

1. User clicks a button or link sending them to your route to authenticate using a specific strategy (e.g. GitHub).
2. Your route calls passport.authenticate('github') which redirects them to GitHub.
3. The page the user lands on, on GitHub, allows them to login if they aren't already. It then asks them to approve access to their profile from your app.
4. The user is then returned to your app at a specific callback url with their profile if they are approved.
5. They are now authenticated, and your app should check if it is a returning profile, or save it in your database if it is not.

With these `OAuth` authentication we used
at least to use `ClientID`'s and a 
`Client Secret`, they MUSTN'T BE SHARED, 
they tend to be stored in the `.env`
as `process.env.GITHUB_CLIENT_ID`, we need 
the callback url as `url/auth/github/callback`
just as a convention.

## HTTP mounted on the express app

Express uses http module from nodejs under the hood as a abstraction form 
to easy the web development process, we use the next code to listen for a 
connection in the server:

```
const http = require('http').createServer(app)
const io = require('socket.io')(http)

//This is a connection listener
io.on('connection', socket => {  // we are listen on connection and
// the second argument is a function with which the data is passed through
// The connection listener uses 'socket' to define the data in the 
//second argument
//This function is triggered when a connection is stablish
// this means, when someone gets the client.js which is stored in the /chat 
//route, and the socket variable is defined in the client-side
  console.log('A user has connected')
  }
)
```

Now for the client to connect:
```
/*client.js*/
let socket = io();
//To connecto an external url we use io.connect('URL')
// this is loaded by the client-side, because is received in the html 
// file, so, the first part is within the server, and this is executed 
// in the client browser(client-side)
```

As a general idea from gpt we have the next socket demonstration:
Socket.IO is a JavaScript library that enables real-time, bidirectional communication between web clients (usually browsers) and a server. It's often used in conjunction with Express, which is a popular web application framework for Node.js. Socket.IO builds on top of the WebSocket protocol but provides additional features such as fallback mechanisms for older browsers and the ability to use other transport methods when WebSockets are not available.

Here's how Socket.IO works with Express:

Installation:
Start by installing both Express and Socket.IO using npm (Node Package Manager):

```bash
npm install express socket.io
```

Setting Up Express Server with Socket.IO:
You need to create an Express server and integrate Socket.IO with it. Here's a basic example:

javascript

```js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// ... Configure your Express routes and middleware here ...

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle events from the client
  socket.on('chat message', (message) => {
    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

```

Client-Side:
On the client side (usually in an HTML file loaded by the browser), you'll include the Socket.IO client library:

```hmtl
html

<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io(); // Connect to the server
  // ... Your client-side Socket.IO logic ...
  
//Client-Server Communication:
//Once the connection is established, you can emit and listen for events between the client and the server. In the example above, the server listens for 'chat message' events and broadcasts them to all connected clients. On the client side, you'd emit the event when a user sends a message

  // Client-side sending a message
  socket.emit('chat message', 'Hello, world!');
  
  // Client-side listening for messages
  socket.on('chat message', (message) => {
    console.log(`Received message: ${message}`);
  });
</script>
```



This setup allows real-time communication between the server and clients, making it suitable for applications like chat applications, collaborative tools, online gaming, and more.
