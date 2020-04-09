'use strict';

exports.handler = async (event) => {
    const https = require('https');
    const sessionAttributes = event.sessionAttributes;
    const slots = event.currentIntent.slots;
    const fever = slots.fever;
    const status = slots.status;
    const cough = slots.cough;
    let dataString = '';
    
    const response = await new Promise((resolve, reject) => {
        const req = https.get("https://covidapi.info/api/v1/country/IND/latest", function(res) {
          res.on('data', chunk => {
            dataString += chunk;
          });
          res.on('end', () => {
            resolve({
               
                body: JSON.parse(dataString)
            });
          });
        });
        
        req.on('error', (e) => {
          reject({
              statusCode: 500,
              body: 'Something went wrong!'
          });
        });  
    });
    
   let sol = response.body.result;
    //return sol;
  
  let respo = { sessionAttributes: event.sessionAttributes,
    "dialogAction": {
        "type": "ConfirmIntent",
        "fulfillmentState": "Fulfilled",
        "message": {
            "contentType": "application/json",
            "content": sol
        }
    }
};
        return respo.dialogAction.message.content;
  
};


//https://api.covid19api.com/live/country/south-africa/status/confirmed
//https://covidapi.info/api/v1/country/IND/latest
//body: JSON.stringify(JSON.parse(dataString), null, 4)
