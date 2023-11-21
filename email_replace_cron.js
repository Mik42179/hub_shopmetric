var request = require('request');




//--------------------- Create Token promise--------------------------------------

const promise = new Promise(async(resolve, reject)=> {
    let token = '' 
        let options11 = {
            'method': 'POST',
            'url': 'https://live.cxg.com/oauth/connect/token',
            'headers': {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
              'client_id': 'CXG_hupsport_gw',
              'client_secret': '19584B5F-A4AD-47F7-8239-81692C7E7BE8',
              'grant_type': 'client_credentials'
            }
          };
          
         request(options11, async(error, response) =>{
            if (error) throw new Error(error);
              const result =  await JSON.parse(response.body);
               token = result.access_token;
              if (token != '') {
              await resolve(token);
              } else {
              await  reject("Error");
              }
            }); 
     
 });
 const checkToken = async() =>{
   try {
    const data = await promise;
    return data;
   } catch (error) {
    return error

   }
 }

const testToken = async()=>{
   const token = await checkToken();
   return token;
 }

 //----------------------------- Create daily data Promise -----------------------------------------    

const fetch_id_promise = new Promise(async(resolve, reject)=> {
  try {
    var token = await testToken();
    var idarr=[];
    var emailarr = [];
    var today =  new Date().toISOString().split('T')[0];
    
    var date = new Date();
    var yesterday = date - 1000 * 60 * 60 * 24 * 1;   
    var old_date = new Date(yesterday).toISOString().split('T')[0];

   //var today = '2023-11-05';
   //var old_date = '2023-11-04';
    
    var options2 = {
      'method': 'POST',
      'url': 'https://live.cxg.com/api/v2/execute',
      'headers': { 
        'Authorization': 'Bearer '+token
      },
      formData: {
        'post': '{\n  "action": "exec",\n "dataset" : {\n   "datasetname" : "/Apps/SM/APIv2/Query/Fieldworkers/FieldworkerProfile"\n  },\n  "parameters": [\n   {\n     "name": "QuerySpecification",\n     "value": "[Account Status][Login][Email][Country][First Name][Gender][Last Name][User Language Local][Date Of Birth][Date/Time Last Login UTC][Date/Time Registered UTC][Date/Time Last Modified UTC]"\n    },\n    {\n     "name": "SecurityObjectUserID",\n     "value": null\n   },\n    {\n     "name": "UserIDs",\n      "value": null\n   },\n    {\n     "name": "Login",\n      "value": null\n   },\n    {\n     "name": "Email",\n      "value": ""\n   },\n    {\n     "name": "FirstName",\n      "value": null\n   },\n    {\n     "name": "LastName",\n     "value": null\n   },\n    {\n     "name": "PhoneMobile",\n      "value": null\n   },\n    {\n     "name": "PhoneWork",\n      "value": null\n   },\n    {\n     "name": "PhoneHome",\n      "value": null\n   },\n    {\n     "name": "Gender",\n     "value": null\n   },\n    {\n     "name": "Address1",\n     "value": null\n   },\n    {\n     "name": "Address2",\n     "value": null\n   },\n    {\n     "name": "City",\n     "value": null\n   },\n    {\n     "name": "StateRegion",\n      "value": null\n   },\n    {\n     "name": "Country",\n      "value": null\n   },\n    {\n     "name": "PostalCode",\n     "value": null\n   },\n    {\n     "name": "UserType",\n     "value": null\n   },\n    {\n     "name": "AccountStatus",\n      "value": "Enabled"\n    },\n    {\n     "name": "DateTimeLastModifiedUTCFrom",\n      "value": "'+old_date+'"\n   },\n    {\n     "name": "DateTimeLastModifiedUTCTo",\n      "value": "'+today+'"\n   },\n    {\n     "name": "DateTimeRegisteredUTCFrom",\n      "value": null\n   },\n    {\n     "name": "DateTimeRegisteredUTCTo",\n      "value": null\n   },\n    {\n     "name": "DateTimeLastLoginUTCFrom",\n     "value": null\n   },\n    {\n     "name": "DateTimeLastLoginUTCFTo",\n      "value": null\n   },\n    {\n     "name": "BadgeIDs",\n     "value": null\n   },\n    {\n     "name": "MiscSettings",\n     "value": null\n   }\n ]\n}'
      }
    };
    
   

    request(options2, function (error, response2) {
      if (error) throw new Error(error);
      var result2 = JSON.parse(response2.body);
      result2.dataset.data[0].forEach(async ids => {
            var   Fieldworker_Login = ids['Login'];
            var   Fieldworker_email = ids['Email'];
            console.log("Fieldworker_Login => "+Fieldworker_Login);
            //console.log("Fieldworker_Email "+Fieldworker_email);
            idarr.push(Fieldworker_Login);
            emailarr.push(Fieldworker_email);
            
     });
     // var idarr = ["rsingh24"];
     // var emailarr = ["linuxtest123@gmail.com"];
     var len = idarr.length;
     console.log('\n\n=======================================: '+today+' :======================================================\n\n');
     console.log("TOTAL RECORD => "+len); 
     console.log('\n\n=============================================================================================\n\n');
     var div = parseInt(len/50);
     var mod = len%50;
     if(mod>0)
     {
       div = div+1;
     }
     var start =0;
     var end =50;
     var start_count = 0;
     var end_count = 50;
     for(let i=0;i<div;i++)
     {
        start = start_count;
        end = end_count;
        
        for(let j=start;j<end;j++)
          {
            
            if(idarr[j]!=undefined && idarr[j]!='' && emailarr[j]!=undefined && emailarr[j]!='')
            {
              test_exist_id(idarr[j],emailarr[j]);
                start_count++;
                end_count++;
            }
            
            
          }

     }
              

    });
     
    if (idarr != '' && emailarr !='') {
        await resolve(idarr,emailarr);
        } else {
        await  reject("Error");
        }
      } catch (error) {
        return error
        }   
  });
  
  const db_res = async() =>{
  try {
  const data = await fetch_id_promise;
  return data;
  } catch (error) {
  return error
  
  }
  }
  
  const test_db_res = async()=>{
  const res_data = await db_res();
  return res_data;
  
  }
  test_db_res();

  //--------------------- Create Token promise--------------------------------------

const exist_id_promise = (id,new_email) => new Promise(async(resolve, reject)=> {
    try{
        
        var objarr = [];
        var options = {
         'method': 'POST',
         'url': 'https://api.hubapi.com/crm/v3/objects/contacts/search',
         'headers': {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer pat-eu1-f1e6f3dc-269d-485e-9adc-1215b1ed2d3a'
         },
         body: JSON.stringify({
          "filterGroups": [
         {"filters": [{
          "propertyName": "fieldworker_login",
          "operator": "EQ",
         "value": id}]}]})
        }
          
         request(options, async  function (error, response) {
        
          if (error) throw new Error(error);
          var result = JSON.parse(response.body);
           
           if(result != '' && result != undefined && result != null)
            {
           if(result.results != '' && result.results != undefined && result.results != null)
             {
           if(result.results.length != 0 && result.results.length !== undefined && result.results.length != null)
             {
                 var email = result.results[0].properties['email'];
                 var objectid = result.results[0].properties['hs_object_id'];
                 //console.log("user email "+email);
                 //console.log("user objectid "+objectid);
             }else{
                  
                 console.log("No objectid found for "+objectid);
             }

             }else{
                  
                 console.log("No objectid found for "+objectid);
             }
             
             }else{
                 
                 console.log("No objectid found for "+objectid);
             }
          
             objarr.push(objectid,new_email);
             test_insert_res(objarr); 
          

             if (objarr != '') {
                await resolve(objarr);
                } else {
                await  reject("Error");
                }
        });
         } catch (error) {
              return error

             }
           
    
 });
 const check_exist_id = async(id,new_email) =>{
   try {
    const data = await exist_id_promise(id,new_email);
    return data;
   } catch (error) {
    return error

   }
 }
 const test_exist_id = async(id,new_email)=>{
   const exist_id = await check_exist_id(id,new_email);
   return exist_id;

 }
  
 

  // --------------------------------------------- Hubspot API Promise ----------------------------------------------------

  
const insert_promise = (objarr)=> new Promise(async(resolve, reject)=> {
try{
 
 
        
        var object_id = objarr[0];
        var email = objarr[1];
        
        if(object_id !='' && object_id !=undefined)
        {
        var options = {
        'method': 'POST',
        'url': 'https://api.hubapi.com/contacts/v1/contact/vid/'+object_id+'/profile',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer pat-eu1-f1e6f3dc-269d-485e-9adc-1215b1ed2d3a '
        },
        body: JSON.stringify({
          "properties": [{ property: 'email', value: email }]
        })

      }
      request(options,async function (error, response, body) {
             if (error) throw new Error(error);
             console.log(email+" has been updated");
            if (body != '') {
              await resolve(body);
              } else {
              await  reject("Error");
              }
            
            });
    }else{
      console.log("Object Id dose not exist");
    }
  } catch (error) {
      return error
  }
});

const insert_res = async(objarr) =>{
try {
const data = await insert_promise(objarr);
return data; 
} catch (error) {

return error

}
}

const test_insert_res = async(objarr)=>{
const res_data = await insert_res(objarr);
return res_data;
}


