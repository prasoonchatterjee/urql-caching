# urql-caching

im trying to understand how to implement urql caching on the server side 

issues in this dummy nextjs app

1. caching data fetched in the server side so client doesnt re-request the queries
    * there are 2 routes"/ssg" and "/ssr" which are static and server rendered pages respectively making the same query to get a user from a mock api.
    
    * the homepage "/" has a navbar component that has links to traverse between these 2 above routes.
    
    * the ssrExchange is supposed to put the data inside the urql cache and use that in client.
  
    * on the homepage ie "/" route it prefetches the ssg.json as it should because there is a Link and when you naviagate to "/ssr" it also fetches the ssr.json to get the data 
    
    * on going directly to "/ssr" it makes the api call on the frontend which is a duplicate call that we are trying to avoid
    
    * now it could be that i made some error with implementing the exchanges or maybe with the schema or even setting up urql client im not sure 
    
    * urql docs link for reference
    
    * https://formidable.com/open-source/urql/docs/advanced/server-side-rendering/
    
    * https://formidable.com/open-source/urql/docs/graphcache/schema-awareness/
    
    
2. introspection queries
  
   * i have added a file called introspection.js to fetch the schema on the client to provide it to the exchange but im not sure how to integrate with 
    the app which i think is the major reason caching isnt working although i did pull out the schema manually from the mock api using the networks tab
     and have put it inside of manual.json inside the utils folder just to make it work but it didnt

3. app config

  `
  
    "@urql/devtools": "^2.0.3",
    "@urql/exchange-execute": "^2.0.0",
    "@urql/introspection": "^1.0.0",
    "next": "^10.0.8",
    "next-urql": "^3.0.0",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "urql": "^2.0.4"
  `
  
  4. feel free to create branches and pull requests if you have a fix and thanks in advance
    you can view the app easily in your browser using this link https://github1s.com/prasoonchatterjee/urql-caching
