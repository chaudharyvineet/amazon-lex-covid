'use strict';
//exports.handler = async (event) => {


 function close(sessionAttributes, fulfillmentState, message) {
        return {
            'sessionAttributes' : sessionAttributes,
            'dialogAction': {
                'type': 'Close',
                'fulfillmentState' : fulfillmentState ,
                'message': message,
            },
        };
    }

async function dispatch (intentRequest, callback) {
    const https = require('https');
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    var data = slots.data;
 
    
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
    
  let sol = JSON.stringify(response.body.result);
 
//   return sol;
//   let respo = { sessionAttributes: event.sessionAttributes,
//     "dialogAction": {
//         "type": "ConfirmIntent",
//         "fulfillmentState": "Fulfilled",
//         "message": {
//             "contentType": "SSML",
//             "content": sol
//         }
//     }
// };
//         return respo.dialogAction.message.content;
  
//};



    // const rense = {
    //     statusCode: 200,
    //     body: JSON.stringify('Hello from Lambda!'),
    // };
    // return response;
    
    callback(close(sessionAttributes, 'Fulfilled',
        {'contentType': 'PlainText', 'content': 'Here is the current data about COVID-19 cases in India ' + sol + ' This app does not say about your symptoms with any surety. We help you understand the scenario. To be sure, please consult a doctor. Thank you. STAY SAFE, STAY HOME.'}));
};

  exports.handler = (event, context, callback) => {
        try {
            dispatch(event,
                (response) => {
                    callback(null, response);
                });
        } catch (err) {
            callback(err);
        }
    };




 


//https://api.covid19api.com/live/country/south-africa/status/confirmed
//https://covidapi.info/api/v1/country/IND/latest
//body: JSON.stringify(JSON.parse(dataString), null, 4)
