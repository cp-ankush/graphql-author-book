App to maintain list of books and authors.

Create list of books associated with author.

Steps to start the app.
1. git clone https://github.com/cp-ankush/graphql-author-book.git
2. cd server
3. npm install
4. node app.js
5. cd ..
6. cd client
7. npm install
8. npm start

That's it.

Server is configured to handle both rest and graphql resquests.

From client side we can fetch the same data using either graphql or rest endpoint.
By just configuring, REST_APIS variable in client/src/consts.js file. 
