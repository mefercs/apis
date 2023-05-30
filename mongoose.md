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
const someFunc = done => { 
  if(error) done(err);  //on error
  else done(null, data); // on success
  }
```

## SCHEMAS

They translate JS objects to Mongo DB models
- Collections: A set of documents
- Schema: The structure of the document, it like the table definition in SQL.
- Documents: A record of data
- Fields: Properties or atributes
