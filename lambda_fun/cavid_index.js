'use strict';
exports.handler = (event, context, callback) => {
    const sessionAttributes = event.sessionAttributes;
    const slots = event.currentIntent.slots;
    const contact = slots.contact;
    const abroad = slots.abroad;
    const fever = slots.fever;
    const cough = slots.cough;
    const runnynose = slots.runnynose;
    const sorethroat = slots.sorethroat;
    const nausea = slots.nausea;
    const headache = slots.headache;
    const jointpain = slots.jointpain;
    const breath = slots.breath;
    //const finBuy  = slots.FinBuy;
  
    // predefined list of available books
    /*const validPolicy = ['1', '2', '3'];
    const validTypes = ['1','2','3'];
    const validCost = ['500','1000','1500','2000','2500','3000','3500','4000','4500','5000','5500','6000','6500','7000','7500'
    ,'8000','8500','9000','9500','10000'];*/
    // negative check: if valid slot value is not obtained, inform lex that user is expected 
    // respond with a slot value 
    
    if((fever==="Yes" || cough==="Yes" || runnynose==="Yes" || sorethroat==="Yes" || nausea==="Yes" || headache==="Yes" || jointpain==="Yes" || breath==="Yes") && (contact==="No" && abroad==="No")) 
     {
        let response = { sessionAttributes: event.sessionAttributes,
          dialogAction: {
            type: "ElicitSlot",
             message: {
               contentType: "PlainText",
               content: `The given information has been analysed. Your described symptom complex can most likely be classified as common cold. However, if the symptoms continue for long or worsens, consult a doctor. We thank you for using our app and wish you all the best. Type "status" to know more.`
            },
             intentName: event.currentIntent.name,
             slots: slots,
             slotToElicit : "commonslot",
             
          }
        };
        callback(null, response);
        
    
    }
    
    
    if((fever==="Yes" || cough==="Yes" || runnynose==="Yes" || sorethroat==="Yes" || nausea==="Yes" || headache==="Yes" || jointpain==="Yes" || breath==="Yes") ||  (contact==="Yes" || abroad==="Yes" ))
    {
        let response = { sessionAttributes: event.sessionAttributes,
          dialogAction: {
            type: "ElicitSlot",
             message: {
               contentType: "PlainText",
               content: `The given information has been analysed. Your described symptom complex can most likely be classified as COVID-19 infection. You are recommended to consult a doctor as soon as possible. try to avoid any physical contact and maintain social diatancing. We thank you for using our app and wish you all the best. Type "status" to know more.`
            },
             intentName: event.currentIntent.name,
             slots: slots,
            slotToElicit : "commonslot",
            
          }
        };
        callback(null, response);
    
    }
    
    
        if(fever==="No" && cough==="No" && runnynose==="No" && sorethroat==="No" && nausea==="No" && headache==="No" && jointpain==="No" && breath==="No" && contact==="No" && abroad==="No" )
    {
        let response = { sessionAttributes: event.sessionAttributes,
          dialogAction: {
            type: "ElicitSlot",
             message: {
               contentType: "PlainText",
               content: `The given information has been analysed. Your described symptom complex determines that you do not have any repiratory disorder. We thank you for using our app and wish you all the best. Type "status" to know more.`
            },
             intentName: event.currentIntent.name,
             slots: slots,
            slotToElicit : "commonslot",
            
          }
        };
        callback(null, response);
    
    }
    

    
     if((fever==="No" && cough==="No" && runnynose==="No" && sorethroat==="No" && nausea==="No" && headache==="No" && jointpain==="No" && breath==="No") && (contact==="Yes" || abroad==="Yes") )
    {
        let response = { sessionAttributes: event.sessionAttributes,
          dialogAction: {
            type: "ElicitSlot",
             message: {
               contentType: "PlainText",
               content: `The given information has been analysed. Your described symptom complex determines that you do not have any repiratory disorder. However, you are advised to self quarantine yourself for atleast 14 days. If any symptoms occur during the quarantine period, consult a doctor. We thank you for using our app and wish you all the best. Type "status" to know more.`
            },
             intentName: event.currentIntent.name,
             slots: slots,
            slotToElicit : "commonslot",
            
          }
        };
        callback(null, response);
    
    }
    
    /* if(finBuy && !(finBuy === "") && validCost.indexOf(finBuy.toLowerCase()) === -1)
    {
        let response = { sessionAttributes: event.sessionAttributes,
          dialogAction: {
            type: "ElicitSlot",
             message: {
               contentType: "PlainText",
               content: `Please enter valid amount is multiple of 500. (Min 500 & Max 10000)`
            },
             intentName: event.currentIntent.name,
             slots: slots,
             slotToElicit : "FinBuy",
            
          }
        }
        callback(null, response);
    
    }
  
    // if valid book name is obtained, send command to choose next course of action
     let response = {sessionAttributes: sessionAttributes,
      dialogAction: {
        type: "Delegate",
        slots: event.currentIntent.slots,
 
        
        
      }
    }
    
    callback(null, response);*/
};
