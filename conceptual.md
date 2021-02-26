### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  
	There are three ways of managing asynchronous calls in JS:

      - Callbacks

        The first way to manage asynchronous code is to run nested callbacks inside a function. This guarantees that a callback will be ran if and only if the parent function is finished running. However, you must run all functions from the beginning even if you wanted to run a function a few nested levels down.


      - Promises .then() .catch()

        Another way to take synchronicity out of JavaScript is to use then() and catch() (from axios or jQuery) on HTTP methods. This receives a value from a resolved promise and a new promise is returned to the next 
        then() in the chain (as opposed to nested statements of then). If the promise is not resolved, the catch() method is used as a way to handle errors.


      - Async and await using promises

        The last technique is to use async/await. Here a function is prefixed with the keyword "async" and an "await" is used to pause until a promise is received before continuing the async function.

- What is a Promise?

  * A promise is a one time guarantee of future value that is received when making HTTP requests. It has three states: pending, resolved, or rejected. While pending, a promise holds some wrapped object. If resolved, a promise unwraps into some value. When rejected, an error is handled.


- What are the differences between an async function and a regular function?

   
   * A regular function that uses a get request from an API will take some time to get a response. While waiting, code will continue running. If the code includes use of the response from  get request, it may or may not have received it. You can guarantee that a response is received using an async function. JavaScript runs a get request and receives a pending promise as a response. Following code then waits for that pending promise to be resolved or rejected before continuing on.

- What is the difference between Node.js and Express.js?

  * Node.js is a run-time environment for building server-side event-driven i/o application using javascript.

  *  Express.js is a framework based on node.js for building web-application using principles and approaches of node.js
  

- What is the error-first callback pattern?

  * Error first callback pattern is when a function passes in an error as its first argument (such as in fs.readFile) in Express. It then allows errors to be handled. The value of error is null if none were raised.

- What is middleware?

  * Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

    Middleware functions can perform the following tasks:

  - Execute any code.
  - Make changes to the request and the response objects.
  - End the request-response cycle.
  - Call the next middleware function in the stack.

- What does the `next` function do?

  * The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware. 

- What does `RETURNING` do in SQL? When would you use it?

  * The RETURNING clause allows you to retrieve values of columns (and expressions based on columns) that were modified by an insert, delete or update. Without RETURNING , you would have to run a SELECT statement after the DML statement is completed, in order to obtain the values of the changed columns.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

  * Each call requests a promise from github and expects it to be resolved (in sequence) with a value before moving on to the next call. While this works, it's inefficient because each call doesn't depend on one another (ie the value of joel doesn't care what the value of elie is) so there's no reason to wait for the previous to resolve itself. One way to speed this up is to use Promise.all() to talk to github once in parallel of each other and resolve all promises (regardless of order). Lastly, the results aren't just names of the users but info about each profile. To clarify this, a better variable for each name would be nameResults or nameRes.