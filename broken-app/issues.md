# Broken App Issues

- There was no express.json() to convert incoming request and responses, rather than usng json.strigify
- delaration of variables where let and var changed to const
- There was no route for next(err) to go to
- No 404 error handler
- No general error handler
- seperated app.listen port to another file server.js
- made the route function  itself as an asynchronous callback function
