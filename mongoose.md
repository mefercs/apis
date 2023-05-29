- URI: Uniform Resource Identifier
- URL: Uniform Resource Locator

We import the mongoose package

```json
"dependencies": {
    "mongoose": "^5.11.15"
  }
```

We shuold obtain first our MONGO_URI variable from MONGO ATLAS, and finally:

```js
mongoose.connect(<Your URI>, { useNewUrlParser: true, useUnifiedTopology: true });
// Where in .env we have saved MONGO_URI='uri'
```

Tutorial
[Turial link](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/)

