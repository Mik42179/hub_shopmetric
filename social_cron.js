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
  var token = await testToken();
  var idarr=[];
  var arrays = [], size = 100;
  var today =  new Date().toISOString().split('T')[0];
  
  var date = new Date();
  var yesterday = date - 1000 * 60 * 60 * 24 * 1;   
  var old_date = new Date(yesterday).toISOString().split('T')[0];
  
  
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
          console.log(Fieldworker_Login);
          idarr.push(Fieldworker_Login);
          
   });
    //idarr = ["selalaou"];
     var len = idarr.length;
     console.log('\n\n=======================================: '+today+' :======================================================\n\n');
     console.log("TOTAL RECORD => "+len); 
     console.log('\n\n=============================================================================================\n\n');
     
   var div = parseInt(len/100);
   var mod = len%100;
   if(mod>0)
   {
     div = div+1;
   }
   //console.log("div "+div);
   var start =0;
   var end =100;
   var start_count = 0;
   var end_count = 100;
   for(let i=0;i<div;i++)
   {
      start = start_count;
      end = end_count;
      
      for(let j=start;j<end;j++)
        {
          // console.log("forloop_id "+idarr[j]);
          if(idarr[j]!=undefined && idarr[j]!='')
          {
              socialdetails(idarr[j]);
              start_count++;
              end_count++;
          }
        }
   }
 
  });
     
  if (idarr != '') {
      await resolve(idarr);
      } else {
      await  reject("Error");
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



  
 //----------------------------Create Social Promise--------------------------------------


 const social_promise = (id) => new Promise(async(resolve, reject)=> {
    var token = await testToken();
    var social_arr = [];
    
    var instagram='', facebook='',linkedin='',line='',kakaotalk='',tiktok='',qq='',wechat='',weibo='',redbook='',telegram='',viber='',other='';
    
    var options77 = {
            'method': 'POST',
            'url': 'https://live.cxg.com/api/v2/execute',
            'headers': {
              'Authorization': 'Bearer '+token
            },
            formData: {
              'post': '{"action":"exec","dataset":{"rowSetLimit":1000,"datasetname":"/Apps/SM/Analysis/AnalysisCustomRollups","datafieldproperties":{"parameters":["name","returnvalue"],"columns":["name"]},"dataformat":"simple"},"parameters":[{"name":"QuerySpecification","value":"[CustomSqlHandle.Col001][CustomSqlHandle.Col002][CustomSqlHandle.Col003][CustomSqlHandle.Col004][CustomSqlHandle.Col005][CustomSqlHandle.Col006][CustomSqlHandle.Col007][CustomSqlHandle.Col008][CustomSqlHandle.Col009][CustomSqlHandle.Col010][CustomSqlHandle.Col011][CustomSqlHandle.Col012][CustomSqlHandle.Col013][Email][Fieldworker Login]"},{"name":"SecurityObjectUserID","value":"422323"},{"name":"ProtoSurveysAndClientIDsList","value":"25981"},{"name":"dtStart","value":null},{"name":"dtEnd","value":null},{"name":"CampaignFilter","value":""},{"name":"LocationStoreIDList","value":""},{"name":"LocationNameList","value":""},{"name":"LocationStateList","value":""},{"name":"LocationCityList","value":""},{"name":"LocationPropertyList","value":""},{"name":"ShopperLoginOrEmail","value":"'+id+'"},{"name":"ShopperLastName","value":""},{"name":"ShopperFirstName","value":""},{"name":"ClientLocationPropertiesOrder","value":null},{"name":"ProtoQuestionIDsFilterList","value":""},{"name":"SurveyInstancesFilter","value":null},{"name":"MiscSettings","value":"SPECIFICATIONFORCUSTOMSQLHANDLE[S_25981_Q_387818_CMT,S_25981_Q_387817_CMT,S_25981_Q_387819_CMT,S_25981_Q_387820_CMT,S_25981_Q_387821_CMT,S_25981_Q_387822_CMT,S_25981_Q_387823_CMT,S_25981_Q_389001_CMT,S_25981_Q_389002_CMT,S_25981_Q_389003_CMT,S_25981_Q_389004_CMT,S_25981_Q_389005_CMT,S_25981_Q_387816_AOP_9,S_25981_Q_387816_AOP_8,S_25981_Q_387816_AOP_7,S_25981_Q_387816_AOP_6,S_25981_Q_387816_AOP_5,S_25981_Q_387816_AOP_4,S_25981_Q_387816_AOP_3,S_25981_Q_387816_AOP_2,S_25981_Q_387816_AOP_12,S_25981_Q_387816_AOP_11,S_25981_Q_387816_AOP_10,S_25981_Q_387816_AOP_1][IgnoreNOCOUNToption][IsAnalysisCustomRollupsClientAccessInterface:1]"},{"name":"JoinGroupGUID","value":null},{"name":"RowCount","value":null}]}'
            }
          };
          request(options77, async function (error, response) {
            if (error) throw new Error(error);
            var social_result = await JSON.parse(response.body); 
           
            if(social_result !=undefined && social_result !='' && social_result !=null)
            {
            if(social_result.dataset !=undefined && social_result.dataset !='' && social_result.dataset !=null)
            {
            if(social_result.dataset.data !=undefined && social_result.dataset.data !='' && social_result.dataset.data !=null)
            {
            if( social_result.dataset.data[0].length !=undefined && social_result.dataset.data[0].length !='' && social_result.dataset.data[0].length !=null)
                {
                 if( social_result.dataset.data[0][0]['Col001'] !='' && social_result.dataset.data[0][0]['Col001'] != undefined) 
                 {
                  instagram = social_result.dataset.data[0][0]['Col001'];
                 }else{
                  instagram = '';
                 }
                 if( social_result.dataset.data[0][0]['Col002'] !='' && social_result.dataset.data[0][0]['Col002'] != undefined) 
                 {
                  facebook = social_result.dataset.data[0][0]['Col002'];
                 }else{
                  facebook = '';
                 }
                 if( social_result.dataset.data[0][0]['Col003'] !='' && social_result.dataset.data[0][0]['Col003'] != undefined) 
                 {
                  linkedin = social_result.dataset.data[0][0]['Col003'];
                 }else{
                  linkedin = '';
                 }
                 if( social_result.dataset.data[0][0]['Col004'] !='' && social_result.dataset.data[0][0]['Col004'] != undefined) 
                 {
                  tiktok = social_result.dataset.data[0][0]['Col004'];
                 }else{
                  tiktok = '';
                 }
                 if( social_result.dataset.data[0][0]['Col005'] !='' && social_result.dataset.data[0][0]['Col005'] != undefined) 
                 {
                  qq = social_result.dataset.data[0][0]['Col005'];
                 }else{
                  qq = '';
                 }
                 if( social_result.dataset.data[0][0]['Col006'] !='' && social_result.dataset.data[0][0]['Col006'] != undefined) 
                 {
                  wechat = social_result.dataset.data[0][0]['Col006'];
                 }else{
                  wechat = '';
                 }
                 if( social_result.dataset.data[0][0]['Col007'] !='' && social_result.dataset.data[0][0]['Col007'] != undefined) 
                 {
                  weibo = social_result.dataset.data[0][0]['Col007'];
                 }else{
                  weibo = '';
                 }
                 if( social_result.dataset.data[0][0]['Col008'] !='' && social_result.dataset.data[0][0]['Col008'] != undefined) 
                 {
                  kakaotalk = social_result.dataset.data[0][0]['Col008'];
                 }else{
                  kakaotalk = '';
                 }
                 if( social_result.dataset.data[0][0]['Col009'] !='' && social_result.dataset.data[0][0]['Col009'] != undefined) 
                 {
                  line = social_result.dataset.data[0][0]['Col009'];
                 }else{
                  line = '';
                 }
                 if( social_result.dataset.data[0][0]['Col010'] !='' && social_result.dataset.data[0][0]['Col010'] != undefined) 
                 {
                  redbook = social_result.dataset.data[0][0]['Col010'];
                 }else{
                  redbook = '';
                 }
                 if( social_result.dataset.data[0][0]['Col011'] !='' && social_result.dataset.data[0][0]['Col011'] != undefined) 
                 {
                  telegram = social_result.dataset.data[0][0]['Col011'];
                 }else{
                  telegram = '';
                 }
                 if( social_result.dataset.data[0][0]['Col012'] !='' && social_result.dataset.data[0][0]['Col012'] != undefined) 
                 {
                  viber = social_result.dataset.data[0][0]['Col012'];
                 }else{
                  viber = '';
                 }
                 if( social_result.dataset.data[0][0]['Col013'] !='' && social_result.dataset.data[0][0]['Col013'] != undefined) 
                 {
                  other = social_result.dataset.data[0][0]['Col013'];
                 }else{
                  other = '';
                 }
                 
                  social_arr.push(instagram,facebook,linkedin,tiktok,qq,wechat,weibo,kakaotalk,line,redbook,telegram,viber,other);
                  test_details_res(id,social_arr);

                 }else{
                        instagram = '';
                        facebook = '';
                        linkedin = '';
                        tiktok = '';
                        qq = '';
                        wechat = '';
                        weibo = '';
                        kakaotalk = '';
                        line = '';
                        redbook = '';
                        telegram = '';
                        viber = '';
                        other = '';
                        social_arr.push(instagram,facebook,linkedin,tiktok,qq,wechat,weibo,kakaotalk,line,redbook,telegram,viber,other);
                        test_details_res(id,social_arr);
                 }
                 }else{
                        instagram = '';
                        facebook = '';
                        linkedin = '';
                        tiktok = '';
                        qq = '';
                        wechat = '';
                        weibo = '';
                        kakaotalk = '';
                        line = '';
                        redbook = '';
                        telegram = '';
                        viber = '';
                        other = '';
                        social_arr.push(instagram,facebook,linkedin,tiktok,qq,wechat,weibo,kakaotalk,line,redbook,telegram,viber,other);
                        test_details_res(id,social_arr);
                 }
                 }else{
                        instagram = '';
                        facebook = '';
                        linkedin = '';
                        tiktok = '';
                        qq = '';
                        wechat = '';
                        weibo = '';
                        kakaotalk = '';
                        line = '';
                        redbook = '';
                        telegram = '';
                        viber = '';
                        other = '';
                        social_arr.push(instagram,facebook,linkedin,tiktok,qq,wechat,weibo,kakaotalk,line,redbook,telegram,viber,other);
                        test_details_res(id,social_arr);
                 }
                 }else{
                        instagram = '';
                        facebook = '';
                        linkedin = '';
                        tiktok = '';
                        qq = '';
                        wechat = '';
                        weibo = '';
                        kakaotalk = '';
                        line = '';
                        redbook = '';
                        telegram = '';
                        viber = '';
                        other = '';
                        social_arr.push(instagram,facebook,linkedin,tiktok,qq,wechat,weibo,kakaotalk,line,redbook,telegram,viber,other);
                        test_details_res(id,social_arr);
                 }

                
          });   
        
   
    if (social_arr != '') {
        await resolve(social_arr);
        } else {
        await  reject("Error");
        }
      
});
const checksocial = async(id) =>{
    try {
     const data = await social_promise(id);
     return data;
    } catch (error) {
     return error
 
    }
  }

  const socialdetails = async(id)=>{
    const data = await checksocial(id);
    return data;
  }
  

//----------------------- Create HubSpot Promise to insert records-------------------------------  

const hub_promise_insert = (id,ids) => new Promise(async(resolve, reject)=> {


  
  
   //console.log("valid_ids "+ids);
  
  var instagram='', facebook='',linkedin='',line='',kakaotalk='',tiktok='',qq='',wechat='',weibo='',redbook='',telegram='',viber='',other='';
  
    instagram = ids[0];
    facebook = ids[1];
    linkedin = ids[2];
    tiktok = ids[3];
    qq = ids[4];
    wechat = ids[5];
    weibo = ids[6];
    kakaotalk = ids[7];
    line = ids[8];
    redbook = ids[9];
    telegram = ids[10];
    viber = ids[11];
    other = ids[12];
    email = ids[13];
    country = ids[14];

    

    if(email !='' && email != undefined)
    {

      if(country != 'China')
      {
    var options09 = { method: 'POST', url: 'https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/'+email+'/',
    headers: 
    {
    'X-HubSpot-RateLimit-Daily': 500000,
    'X-HubSpot-RateLimit-Daily-Remaining': 485048,
    'X-HubSpot-RateLimit-Interval-Milliseconds': 10000,
    'X-HubSpot-RateLimit-Remaining': 0,
    'X-HubSpot-RateLimit-Max': 100,
    'X-HubSpot-RateLimit-Secondly': 10,
    'X-HubSpot-RateLimit-Secondly-Remaining': 0,
    'Authorization': 'Bearer pat-eu1-f1e6f3dc-269d-485e-9adc-1215b1ed2d3a ',
    'Content-Type': 'application/json' },
     body: 
    { properties: 
     [ 
  
       { property: 'instagram', value: instagram },
       { property: 'facebook', value: facebook },
       { property: 'linkedin', value: linkedin },
       { property: 'kakaotalk', value: kakaotalk },
       { property: 'line', value: line },
       { property: 'tiktok', value: tiktok },
       { property: 'qq', value: qq },
       { property: 'wechat', value: wechat },
       { property: 'weibo', value: weibo },
       { property: 'redbook', value: redbook },
       { property: 'telegram', value: telegram },
       { property: 'viber', value: viber },
       { property: 'other__social_handle_', value: other }
    
     ] 
    },
      json: true };
    
    request(options09,async function (error, response09, body) {
     if (error) throw new Error(error);
    //console.log(body);
    console.log(id+" has been updated");
    
    });
  }else{
    console.log("China user will not sync");
  }
}
if (id != '') {
  await resolve(id);
  } else {
  await  reject("Error");
  }
});
const check_soc = async(a,b) =>{
  try {
   const data = await hub_promise_insert(a,b);
   return data;
  } catch (error) {
   return error

  }
}
const soc = async(a,b)=>{
  const data = await check_soc(a,b);
  return data;

}



    //----------------------------- fetch basic details Promise -----------------------------------------    

const fetch_details_promise = (id,social_arr)=> new Promise(async(resolve, reject)=> {
  try{
    var token = await testToken();
    
    var basic_email='';
    var basic_country='';
    var basic_details_arr = [];
    var alldata = [];
    
    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'https://live.cxg.com/api/v2/execute',
        'headers': {
          'Authorization': 'Bearer '+token
        },
        formData: {
          'post': '{ "action": "exec", "dataset" : { "datasetname" : "/Apps/SM/APIv2/Query/Fieldworkers/FieldworkerProfile" }, "parameters": [ { "name": "QuerySpecification", "value": "[Email][User ID][Login][First Name][Last Name][Gender][Date Of Birth][User Language Local][Date/Time Last Login UTC][Date/Time Registered UTC][Account Status][Country]" }, { "name": "SecurityObjectUserID", "value": null }, { "name": "UserIDs", "value": null }, { "name": "Login", "value": "'+id+'" }, { "name": "Email", "value": null }, { "name": "FirstName", "value": null }, { "name": "LastName", "value": null }, { "name": "ObjectNamesCSV", "value": null }, { "name": "DateTimeLastSavedUTCFrom", "value": null }, { "name": "DateTimeLastSavedUTCTo", "value": null }, { "name": "BadgeIDs", "value": null }, { "name": "MiscSettings", "value": null } ] }'
        }
      };


      request(options, async function (error, response) {
      if (error) throw new Error(error);
      data = JSON.parse(response.body);
  

        if(data !=undefined && data !='' && data !=null)
        {
        if(data.dataset !=undefined && data.dataset !='' && data.dataset !=null)
        {
        if(data.dataset.data !=undefined && data.dataset.data !='' && data.dataset.data !=null)
        {

        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            basic_email = data.dataset.data[0][0]['Email'];
        }else{
            basic_email ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            basic_country = data.dataset.data[0][0]['Country'];
        }else{
            basic_country ='';
        }
        
         
        basic_details_arr.push(basic_email,basic_country);
        alldata = social_arr.concat(basic_details_arr);
        soc(id,alldata);

        }//else{console.log("NO Data");}
        }//else{console.log("NO DataSet");}
        }//else{console.log("NO Data0");}

    if (alldata != '') {
        await resolve(alldata);
        } else {
        await  reject("Error");
        }
 
});
} catch (error) {
  return error
  }
});
  const details_res = async(id,social_arr) =>{
  try {
  const data = await fetch_details_promise(id,social_arr);
  return data;
  } catch (error) {
  return error
  
  }
  }
  
  const test_details_res = async(id,social_arr)=>{
  const res_data = await details_res(id,social_arr);
  //console.log(res_data);
  return res_data;
  
  }


