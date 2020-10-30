# ellevation-server-node

This a Node.js server using the Node modules Express.js, express-session, body-parser & mongoose.  
MongoDB is used as the database and is interacted with using the mongoose module.  
Express-session establishes a session with the client so that data can be stored between HTTP requests on the server.  


All 4 permission requirements work.  
Manager and Admin APIs do not have authorization on database functions and simply have been provided to allow easier testing.  
They both do have login and logout abilities though in order to test authorization of employee functions.
