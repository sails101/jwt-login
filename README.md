# jwt-login

> a [training vessel](https://github.com/sails101) with [Sails](http://sailsjs.org)

This is an example of a simple device-agnostic backend that implements login, signup, and logout using [JSON Web Tokens](https://jwt.io/introduction/).  It is based on the [basic-login](https://github.com/sails101/basic-login) example, modified to use JWT instead of server-side sessions.

This is a simple Single-Page App (SPA) that loads a single view (view/main.ejs) to start, then loads content by making AJAX requests with jQuery and replacing the contents of the `#content` div.  This is not intended as a tutorial on building SPAs, which would normally use a framework like Angular or React.  Note also that the JWT is not saved in the front end, so that refreshing the page will log the user out.  See [this page](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage/) for a discussion on options for storing your web tokens to persist logins between page loads.
