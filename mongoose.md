- [My project](https://replit.com/@mefercs/boilerplate-mongomongoose-1#myApp.js)
- [Creating models](https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/)
- [Tutorial link](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/)
- URI: Uniform Resource Identifier
- URL: Uniform Resource Locator

We import the mongoose package in the package.json

```json
"dependencies": {
    "mongoose": "^5.11.15"
  }
```

We shuold obtain first our MONGO_URI variable from MONGO ATLAS, and finally, this
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

### Handler

We use a done argument, which is a callback function, that tell us we can proceed after
an asynchronous operation. And by node convention should be called with the next forms:

```js
const someFunc = (done) => {
  if (error) done(err); //on error
  else done(null, data); // on success
};
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
- Documents: A record of data in the **Mongo DB**
  - Fields: Properties or atributes.

### CREATING AN SCHEMA

```js
let mongoose = require("mongoose");
const puppySchema = new mongoose.Schema({ //Schema is with cappital initial letter
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

## (Create | CRUD) a record to the DB

```js
let EmailModel = require("./email");

let msg = new EmailModel({
  email: "ADA.LOVELACE@GMAIL.COM", //this will be parsed lowercase because our schema definition
});

msg
  .save()
  .then((doc) => {
    console.log(doc); //returned document upon a successful save
  })
  .catch((err) => {
    console.error(err);
  });
```

## (Read | CRUD) Fetch with the model

```js
EmailModel.find({
  name: "something@gmail.com", //This means searching for a model within the EmailModel collection
})
  .then((doc) => console.log(doc))
  .catch((err) => console.log(err));
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
