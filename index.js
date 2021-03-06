'use strict';

// Imports dependencies and set ip http server

const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json()); // creates http server

    //Sets server port and logs message on success
    app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

    //Creates the endpoint for webhook
    app.post('/webhook', (req, res) => {
        let body = req.body;

        //Checks if this is an event from a page subscription
        if(body.object === 'page') {

            //Iterates over each entry
            body.entry.forEach(function(entry) {
                
                //Gets the message. enttry.messaging is an array but will only ever contain one message, so we will get index 0
                let webhook_event = entry.messaging[0];
                console.log(webhook_event);
            });

            // Returns a '200 OK' response to all requests
            res.status(200).send('EVENT_RECEIVED');
        } else {
            // Returns a '404 Not Found' if event is not from the page subscription
            res.sendStatus(404);
        }
    });

    
    //Add support for GET requests to the webhook
    app.get("/", (req, res) => {
        res.send("Hi I am a chatbot!!");
      });
    