- [Mount a path for express](https://stackoverflow.com/questions/11509660/making-a-specific-directory-browsable-in-express-js)
- [Template engines in Express](https://expressjs.com/en/guide/using-template-engines.html)
  - [Pug engine](https://pugjs.org/api/getting-started.html)
    - [Simple use](https://www.freecodecamp.org/learn/quality-assurance/advanced-node-and-express/use-a-template-engines-powers)
- [Express-session](https://www.npmjs.com/package/express-session)

# Template engine

At runtime a template engine allow to change variables in the template file, by actual
values supplied by the server, then it transforms the template into an static HTML file
that is send to the client. As this occurs in the server and not the client, this avoids
a double API call.

We need to indicate express which template engine we are using with 
```js
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
app.use(session({
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
passport.serializeUser(callback);
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
