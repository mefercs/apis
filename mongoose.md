- [My project](https://replit.com/@mefercs/boilerplate-mongomongoose-1#myApp.js)
- [Creating models](https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/)
- [Tutorial link](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/)
- URI: Uniform Resource Identifier
- URL: Uniform Resource Locator
- remember to use a done() function in a app.METHOD to treat with asynchronous operations
  - the done() function is still a middleware.
- To search for a document withing a model, we must use the model to call the actions (save, findOne,...)

We import the mongoose package in the package.json

```json
"dependencies": {
    "mongoose": "^5.11.15"
  }
```

We should obtain first our MONGO_URI variable from MONGO ATLAS, and finally, this
is log in in the [Tutorial link](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/)
and then we need to create a .env variable to store our MONGO_URI. Remember that you obtained
your password in the mongo atlas, so then you can add it to the MONGO_URI, with the steps
specified in the link tutorial.

```js
mongoose.connect(<Your URI(process.env.MONGO_URI)>, { useNewUrlParser: true, useUnifiedTopology: true });
// Where in .env we have saved MONGO_URI='uri'
```

## CREATE A MODEL

- Schema: building blocks for models in the database, and they can be nested to create
  more complex models.

And a model allow us to create instances of our objects called documents.

- In real servers the interaction with the database happens through handler functions.

### Handler DONE

We use a done argument, which is a callback function, that tell us we can proceed after
an asynchronous operation. And by node convention should be called with the next forms:


```js
const someFunc = (done) => {
  if (error) done(err); //on error
  else done(null, data); // on success
};

// here is an example of a done definition
// The createPeople is a function that requires first data and then the done function
createPeople(req.body, function (err, data) { // the second argument is the done function
      clearTimeout(t);
      if (err) {
        return next(err);
      }
      if (!data) {
        console.log("Missing `done()` argument");
        return next({ message: "Missing callback argument" });
      }
      Person.find({}, function (err, pers) {
        if (err) {
          return next(err);
        }
        res.json(pers);
        Person.remove().exec();
      });
// here is another one in action
app.get('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) { // the second argument is the "done()" function
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});
```

## SCHEMAS

They translate JS objects to Mongo DB models

- Collections: A set of documents
- Schema: The structure of the document, it like the table definition in SQL.
  - SchemaTypes: They define the type of the fields of the structure of a document(Schema),
    they are the homologous of a document field.
    - type: String // this is when using and object schemaType
    - type: Number
    - type: Array
    - type: Boolean
    - type: Buffer
    - type: Date
    - type: Mixed
    - type: ObjectId
    - required: true/false //this is a validator
  - Models: Take a schema and create an instance of a document with **mongoose**,
    is like creating an instance of a class where the class is the schema and
    the model is the instance of that object/class. They allow us to CRUD with the database.
    So a model is a SCHEMA WRAPPER. The model is the mean between the schema and the DB.
- Documents: A record of data in the **Mongo DB**, they are created from Model instances.
  - Fields: Properties or atributes.

### CREATING AN SCHEMA

```js
let mongoose = require("mongoose");
const puppySchema = new mongoose.Schema({
  //Schema is with cappital initial letter
  name: {
    //object schema type
    type: String,
    required: true,
  },
  age: Number, //Simple schema type
});

const Puppy = mongoose.model("Puppy", puppySchema); // Creating a model
// The models are what we export => mongoose.model('ModelName', schemaName)
// Then we can create an instance of that model in the following form
let puppy1 = new Puppy({
  name: "Ferxo",
  age: 13,
});
// When working with emails we should use the next form
let mongoose = require("mongoose");
let validator = require("validator"); //validators

let emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value);
    },
  },
});
module.exports = mongoose.model("Email", emailSchema);
```

## Chain multiple query helpers to narrow the search results

```js
Person.find({ age: 55 })
  .sort({ name: -1 })
  .limit(5)
  .select({ favoriteFoods: 0 })
  .exec(function(error, people) {
    //do something here
  });
// Or we can either
Person.find({ age: 55 })
  .sort({ name: -1 })
  .limit(5)
  .select({ favoriteFoods: 0 })
  .exec.then(<>)


const queryChain = done => {
	const foodToSearch = 'burrito'
	Person.find({ favoriteFoods: foodToSearch })
		.sort({ name: 1 })
		.limit(2)
		.select({ age: 0 })
		.exec((err, data) => {
			if (err) return done(err)
			done(null, data)
		})
}
// The same function with 2 different way to use the final exec()
const queryChain = (done) => {
    const foodToSearch = "burrito";
    Person.find({favoriteFoods: foodToSearch}).sort({name:1}).limit(2).select({age:0}).exec().then(data=>done(null,data)).catch(err=>done(err));
};
```

## (Create | CRUD) a record to the DB

```js
let EmailModel = require("./email");

let msg = new EmailModel({
  email: "ADA.LOVELACE@GMAIL.COM", //this will be parsed lowercase because our schema definition
});

app.use( <route> , function( done ) { // We can separate this function, the handler for next calls
  msg
    .save()
    .then((doc) => {
      console.log(doc); //returned document upon a successful save
      done(null, doc);
      // we should wrape this function, to be able to catch it in a function that dictates
      // that it will be an asynchronous call, so we can use the done() function callback
      // and then finish this with that info
    })
    .catch((err) => {
      console.error(err);
      done(err); // we use done because we call an asynchronous operation with the app.METHOD
    });
});

```

Here is another example

```js
/** 1) Install & Set up mongoose */

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

/** 2) Create a 'Person' Model */
var personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
});

/** 3) Create and Save a Person */
var Person = mongoose.model("Person", personSchema);

var createAndSavePerson = function (done) {
  //btw this is the function structure to perform the route handler of a method, which is wrapping the mongoose action
  var janeFonda = new Person({
    name: "Jane Fonda",
    age: 84,
    favoriteFoods: ["eggs", "fish", "fresh fruit"],
  });

  janeFonda.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};
```

- Both cases are OK

### Create multiple documents

For example when we want to poblate our database with initial data.

```js
ModelName.create([<array of documents>]).then(<code>).catch(<codeOnErr>);
//Example
Person.create(); //... and the try and catch of the second callback function argument
```

## (Read | CRUD) Fetch with the model

```js
// The general form is <ModelName>.find( <JSON> ).then.catch

EmailModel.find({
  //It acceps a JSON object, and the second argument a callback
  name: "something@gmail.com", //This means searching for a document within the EmailModel collection
})
  .then((doc) => console.log(doc))
  .catch((err) => console.log(err));
```

Or we can use the approach of double argument, when the second arguments is a function callback of the next
form

```js
function(err,doc){
  //<code>
  }
```

### Find one for a single matching

```js
ModelName.findOne( <JSON> );  // and then the then and catch
```

### Find by id

```js
Model.findById( <id code> ).then().catch();
Model.findById( <id code> )
```

### Find and edit then save

```js
const findEditThenSave = (personId, done) => {
    Person.findById(personId).then(data => {
        data["favoriteFoods"].push("hamburger");
        console.log(data)
        data.save().then( data => done(null, data)).catch( err => done(err));   
    }).catch(err => {
        console.log(err);
        done(err);
    })
};
```

### Find and update

```js
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};
```


## (Update | CRUD)

```js
EmailModel.findOneAndUpdate(
  { name:'something@gmail.com' },  //old value
  { name:"another@gmail.com"}, //new value
  {
    new: true,
    runValidators: true
  }
).then(<>).catch(<>)
```

## (Delete | CRUD) Remove

```js
EmailModel.findOneAndRemove(
    {
      name:"something@gmail.com"
    }
    ).then(<>).catch(<>)
```

### Find by id and remove

```js
const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId).then(data => done(null,data)).catch(err=>done(err))
};
```

### Delete many documents using a criteria

We use the Model.remove()


