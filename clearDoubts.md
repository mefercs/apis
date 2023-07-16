### Route handler vs middleware

- A route haldler, handles an specific http request to a particular route, they are also known as route
  callbacks or route controllers.
- A middleware is a function executed in the middle of the request-response cycle.

### Difference between next and return next()

```js
next();
return next();
```

- With `return next()`, we are supposing that the current middleware has completed
  its task and wants to pass to the next middleware, and if there are no more
  middlewares in the chained, the control will be handed over to the actual route handler.
  The return statement ensures that the execution flow exits the current middleware
  and proceeds to the next one.
- When using just `next()` it invokes the next middleware funtion in the stack but continues executing
  the current middleware. It doesn't inmmediately exit the current middleware.
