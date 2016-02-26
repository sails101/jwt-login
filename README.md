# jwt-login

> a [training vessel](https://github.com/sails101) with [Sails](http://sailsjs.org)

This is an example of a simple device-agnostic backend that implements login, signup, and logout using [JSON Web Tokens](https://jwt.io/introduction/).  It is based on the [basic-login](https://github.com/sails101/basic-login) example, modified to use JWT instead of server-side sessions.

This is a simple Single-Page App (SPA) that loads a single view (view/main.ejs) to start, then loads content by making AJAX requests with jQuery (using an `Authorization` header with the JWT token if it has one) and replacing the contents of the `#content` div.  This is not intended as a tutorial on building SPAs, which would normally use a framework like Angular or React.  Note also that the JWT is not persisted in the front end (it's just saved in memory), so that refreshing the page will log the user out.  See [this page](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage/) for a discussion on options for storing your web tokens to persist logins between page loads.

### Relevant bits

* `views/main.ejs` contains the main HTML wrapper and all of the front-end Javascript.
* `api/controllers/UserController.js` contains the back-end code for signing up and logging in users, including creating new JWTs.
* `api/policies/isAuthenticated.js` contains the code for authenticating a user via JWT, and redirecting unauthorized users to the login page
* `api/policies/checkForUser.js` is similar to `isAuthenticated.js`, but allows logged-out users to continue.  This is useful for things like the home page, which can display a customized welcome message to logged-in users but should be available to everyone.
