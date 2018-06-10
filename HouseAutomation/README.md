## Problem Statement

A JavaScript application simulating house automation: Pressing a button on a control panel would visually turn on a light, change the temperature or close the curtains. Some constraints:

1. The application must use jQuery
2. The components must have HTTP based "server" interaction (use a static file for simplicity, data persistence is not required). For example, the heating component retrieves the current temperature from the server and also sends the desired one back to the server.


## Development model

A simple AngularJS application has been developed based on the requirements. jQuery has been utilized to listen to various events. The API request's response has been mocked and included in temp.json file. There are no server side code involved.

## Technology requirements

You should install Node for npm, Grunt globally before proceeding, it'll make the process much easier. 
(You'll only need these prequisites if you're planning on doing development)

1. [npm] (https://nodejs.org/en/)
2. [Grunt] (http://gruntjs.com/getting-started)
3. [Bower] (http://bower.io/)

Once these 3 are installed simply do 

```javascript

This command will fetch all the dependencies from package.json 
npm install
```

```javascript
This command will serve the application using node.js running on 3000 port
grunt serve
```

```javascript
This command will create a home.war file inside /dist folder 
grunt
```

## Attachments

1. If you want to run the application on a web-server, simply deploy the "home.war" file on a web-server (e.g: tomcat)

## References

https://github.com/svenka22/home-automation

