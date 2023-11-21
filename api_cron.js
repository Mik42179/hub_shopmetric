var request = require('request');
var fs = require('fs');
var path = require('path');
var nodemailer = require('nodemailer'); 


 


//---------------------------------FILE API LOG CODE -----------------------
const dir="logfiles";
var filename = "Applog "+new Date().toISOString().split('T')[0];

function loginids(login) {
  const logFilePath = path.join(__dirname, dir+'/'+filename+'.log');
  const logMessage = `[${new Date().toISOString()}] ${login}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    } else {
      //console.log('Logged:', logMessage);
    }
  });
}

function errorlog(errormess) {
  const logFilePath = path.join(__dirname, dir+'/'+filename+'.log');
  const logMessage = `\nERROR -:\n`+errormess+`\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    } else {
      // sendEmail();
      //console.log('Logged:', logMessage);
    }
  });
}

function startEnd(mess) {
  const logFilePath = path.join(__dirname, dir+'/'+filename+'.log');
  if(mess == "Start")
  {
  var logMessage = `\n=========================================START==============================\n\n`+new Date().toISOString()+"\n";
  }else
  {
    var logMessage = `========================END=====================\n`+new Date().toISOString()+"\n";
  }
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    } else {
      //console.log('Logged:', logMessage);
    }
  });
}
startEnd("Start");



function logToFile (message) {
  const logFilePath = path.join(__dirname, dir+'/'+filename+'.log');

  // const logMessage = `[${new Date().toISOString()}] ${message}\n`;

  const logMessage = `${message}`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    } else {
      //console.log('Logged:', logMessage);
    }
  });
}
//logToFile('File is Running');
//------------------------------------API FILE CODE 2--------
var filename2 = "Api_log "+new Date().toISOString().split('T')[0];

function apilog_filelogin_2(login) {
  const logFilePath = path.join(__dirname, dir+'/'+filename2+'.log');
  const logMessage = `[${new Date().toISOString()}] ${login}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    } else {
      //console.log('Logged:', logMessage);
    }
  });
}

function apilog_file_start2(mess) {
  const logFilePath = path.join(__dirname, dir+'/'+filename2+'.log');
  logMessage=`${mess}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    } else {
      //console.log('Logged:', logMessage);
    }
  });
}  
// ENd Api log file 1

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



apilog_file_start2("=====================START===========================");
apilog_file_start2(new Date().toISOString().split('T')[0]);
apilog_file_start2("--Token--");
apilog_file_start2("-- REQUEST URL : https://live.cxg.com/oauth/connect/token --");
apilog_file_start2("-- Response --");

const testToken = async()=>{
   const token = await checkToken();
   apilog_file_start2(token);
   return token;
 }
apilog_file_start2("<------>");
 //----------------------------- Create daily data Promise -----------------------------------------    

const fetch_id_promise = new Promise(async(resolve, reject)=> {
  try {
    var token = await testToken();
    var idarr=[];
    var emailarr = [];
    //var today =  new Date().toISOString().split('T')[0];
    
    var date = new Date();
    var yesterday = date - 1000 * 60 * 60 * 24 * 1;   
    //var old_date = new Date(yesterday).toISOString().split('T')[0];

    var today = '2023-11-18';
    var old_date = '2023-11-17';
    
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
    
    apilog_file_start2("-- GET SHOPMETRIC LOGIN --");
    apilog_file_start2("-- REQUEST URL : /Apps/SM/APIv2/Query/Fieldworkers/FieldworkerProfile --");
    apilog_file_start2("--  RESPONSE --");
    apilog_file_start2("--Total Login Ids of "+today+" --");
    apilog_file_start2("-- SHOPMETRIC LOGIN --")
    apilog_file_start2("-- Shopmetric IDS: --")

    request(options2, function (error, response2) {
      if (error) throw new Error(error);
      var result2 = JSON.parse(response2.body);
      result2.dataset.data[0].forEach(async ids => {
            var   Fieldworker_Login = ids['Login'];
            var   Fieldworker_email = ids['Email'];
            console.log("Fieldworker_Login "+Fieldworker_Login);
            //console.log("Fieldworker_Email "+Fieldworker_email);
            idarr.push(Fieldworker_Login);
            emailarr.push(Fieldworker_email);
            
     });
     
     //var idarr = ["rsingh24"];
     //var emailarr = ["linuxtest123@gmail.com"];

     var len = idarr.length;

     apilog_file_start2(idarr);
     apilog_file_start2("---Total Records--");
     apilog_file_start2("-- Total Number Of Records --->"+len);

    
     logToFile("\n-----------------------------------------Shopmetric IDS:- -----------------------------------------\n\n");
     setTimeout(function(){
     logToFile(idarr+"\n");
     },5000);
     setTimeout(function(){
     logToFile("\n--------------------------------------------- * * * ------------------------------------------------\n\n");
     },7000);
     setTimeout(function(){
     logToFile("TOTAL RECORD => "+len+"\n");
     },9000);
     setTimeout(function(){
     logToFile("\n----------------------------------------------- * * * ----------------------------------------------\n\n");
     },11000);
     setTimeout(function(){
     logToFile("\n===========================================END==================================================\n\n");
     },150000);
    


     console.log("TOTAL RECORD => "+len); 
     var div = parseInt(len/50);
     var mod = len%50;
     if(mod>0)
     {
       div = div+1;
     }
     //console.log(div);
     var temp=0;
     var start =0;
     var end =50;
     var start_count = 0;
     var end_count = 50;
     for(let i=0;i<div;i++)
     {
        start = start_count;
        end = end_count;
        //console.log(start);
        //console.log(end);
        for(let j=start;j<end;j++)
          {
            //console.log("forloop_id "+idarr[j]);
            if(idarr[j]!=undefined && idarr[j]!='' && emailarr[j]!=undefined && emailarr[j]!='')
            {
              test_data_res(idarr[j]);
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
  //----------------------------- fetch data Promise -----------------------------------------    

const fetch_data_promise = (id)=> new Promise(async(resolve, reject)=> {
  try{
    var token = await testToken();
    var worker_id='';
    var user_id='';
    var inst_id='';
    var accout_status='';
    var hire_status='';
    var title='';
    var inst_name='';
    var email='';
    var mobile='';
    var gender1='';
    var country='';
    var last_timestamp='';
    var que1='';
    var que2='';
    var que3='';
    var que4='';
    var que5='';
    var que6='';
    var que7='';
    var que8='';
    var que9='';
    var que10='';
    var que11='';
    var que12='';
    var que13='';
    var que14='';
    var que15='';
    var que16='';
    var que17='';
    var que18='';
    var que19='';
    var que20='';
    var que21='';
    var que22='';
    var ans1='';
    var ans2='';
    var ans3='';
    var ans4='';
    var ans5='';
    var ans6='';
    var ans7='';
    var ans8='';
    var ans9='';
    var ans10='';
    var ans11='';
    var ans12='';
    var ans13='';
    var ans14='';
    var ans15='';
    var ans16='';
    var ans17='';
    var ans18='';
    var ans19='';
    var ans20='';
    var ans21='';
    var ans22='';
    
    var dataarr = [];
    var request = require('request');
                var options = {
                'method': 'POST',
                'url': 'https://live.cxg.com/api/v2/execute',
                'headers': {
                    'Authorization': 'Bearer '+token
                },
                formData: {
                    'post': '{\n              "action":"exec",\n              "dataset": \n                        { \n                          "rowSetLimit":1,\n                          "datasetname":"/Apps/SM/Analysis/AnalysisCustomRollups",\n                          "datafieldproperties":\n                           {\n                                "parameters":["name","returnvalue"],\n                                "columns":["name"]\n                           },\n                            "dataformat":"simple"\n                        },\n                            "parameters":\n                            [\n                                    {\n                                        "name":"QuerySpecification",\n                                         "value":"[Fieldworker Login][Login][Question Text][Answer Text Globalized][AccountStatus][HireStatus][InstanceID][Title][SurveyStatusName][Email][Phone Mobile][Gender][Country][TimeStamp Last Validated][WHERENOT:AccountStatus|Disabled]"\n                                    },\n                                    {\n                                        "name":"SecurityObjectUserID",\n                                        "value":"422324"\n                                    },\n                                    {\n                                        "name":"ProtoSurveysAndClientIDsList",\n                                        "value":"25981"\n                                    },\n                                    {\n                                        "name":"dtStart",\n                                        "value":null\n                                    },\n                                    {\n                                        "name":"dtEnd",\n                                        "value":null\n                                    },\n                                    {\n                                        "name":"CampaignFilter",\n                                        "value":""\n                                    },\n                                    {\n                                        "name":"LocationStoreIDList",\n                                        "value":""\n                                    },\n                                    {\n                                        "name":"LocationNameList",\n                                        "value":""\n                                    },\n                                    {\n                                        "name":"LocationStateList",\n                                        "value":""\n                                    },\n                                    {\n                                        "name":"LocationCityList",\n                                        "value":""\n                                    },\n                                    {\n                                        "name":"LocationPropertyList",\n                                        "value":""\n                                    },\n                                    {\n                                        "name":"ShopperLoginOrEmail",\n                                        "value":"'+id+'"\n                                    },\n                                    {\n                                        "name":"ShopperLastName",\n                                        "value":""\n                                    },\n                                    {\n                                        "name":"ShopperFirstName",\n                                        "value":""\n                                    },\n                                    {\n                                        "name":"ClientLocationPropertiesOrder",\n                                        "value":null\n                                    },\n                                    {\n                                        "name":"ProtoQuestionIDsFilterList",\n                                        "value":null\n                                    },\n                                    {\n                                        "name":"SurveyInstancesFilter",\n                                        "value":null\n                                    },\n                                    {\n                                        "name":"MiscSettings",\n                                        "value":"[IgnoreNOCOUNToption][IsAnalysisCustomRollupsClientAccessInterface:1]"\n                                    },\n                                    {\n                                        "name":"JoinGroupGUID",\n                                        "value":null\n                                    },\n                                    {\n                                        "name":"RowCount",\n                                        "value":null\n                                    }\n                            ]\n}'
                }
                };
                request(options, async function (error, response) {

    apilog_file_start2("-- GET LOGIN DETAILS --");
    apilog_file_start2("-- REQUEST URL : /Apps/SM/Analysis/AnalysisCustomRollups --");
    apilog_file_start2("-- Response --");

  if (error) throw new Error(error);
 
  data = JSON.parse(response.body);
  
        //console.log("len "+data.dataset.data[0]);
        if(data !=undefined && data !='' && data !=null)
        {
        if(data.dataset !=undefined && data.dataset !='' && data.dataset !=null)
        {
        if(data.dataset.data !=undefined && data.dataset.data !='' && data.dataset.data !=null)
        {
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            worker_id = data.dataset.data[0][0]['Col001'];
        }else{
            worker_id ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            user_id = data.dataset.data[0][0]['Col002'];
        }else{
            user_id ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            inst_id = data.dataset.data[0][0]['Col007'];
        }else{
            inst_id ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            accout_status = data.dataset.data[0][0]['Col005'];
        }else{
            accout_status ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            hire_status = data.dataset.data[0][0]['Col006'];
        }else{
            hire_status ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            title = data.dataset.data[0][0]['Col008'];
        }else{
            title ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            inst_name = data.dataset.data[0][0]['Col009'];
        }else{
            inst_name ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            email = data.dataset.data[0][0]['Col010'];
        }else{
            email ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            mobile = data.dataset.data[0][0]['Col011'];
        }else{
            mobile ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            gender1 = data.dataset.data[0][0]['Col012'];
        }else{
            gender1 ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            country = data.dataset.data[0][0]['Col013'];
        }else{
            country ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            last_timestamp = data.dataset.data[0][0]['Col014'];
        }else{
            last_timestamp ='';
        }
      
        

 
  data.dataset.data[0].forEach(async element => {
         var question = element['Col003'];
 switch(question)
   {
   case "How did you hear about us?":
     que1 = question;
     if(element['Col004'] == "I'm an existing Evaluator")
       { ans1 =  element['Col004'];}
     else
     if(element['Col004'] == "LinkedIn")
     { ans1 =  element['Col004']; }
     else
     if(element['Col004'] == "Instagram")
     { ans1 =  element['Col004']; }
     else
     if(element['Col004'] == "Facebook")
     { ans1 =  element['Col004']; }
     else
     if(element['Col004'] == "Word of Mouth")
     { ans1 =  element['Col004']; }
     else
     if(element['Col004'] == "WeChat")
     {ans1 =  element['Col004']; }
     else
     if(element['Col004'] == "Web Search (Google, Yahoo, Bing, etc.)")
     {ans1 =  element['Col004']; }
     else
     {
       ans1 =  "Other";
     }
     break;
 
   case "Nationality/Citizenship":
     que2 = question;
     ans2 +=  element['Col004']+',';
     break;
 
 case "Which languages do you speak fluently to perform a mission?":
   que3 = question;
   ans3 +=  element['Col004']+',';
   break;
 
 case "Your social media/network account(s)":
   que4 = question;
   ans4 +=  element['Col004']+',';
   break;
 
 case "Your current company":
   que5 = question;
   ans5 +=  element['Col004']+',';
   break;
 
 case "Your current position":
   que6 = question
   ans6 +=  element['Col004']+',';
   break;
 case "Which cosmetic brands are in your bathroom?":
   que7 = question
   ans7 +=  element['Col004']+',';
   break;
 
 case "Which fashion brands do you purchase?":
   que8 = question
   ans8 +=  element['Col004']+',';
   break;
 
 case "Which watch brands do you own?":
   que9 = question
   ans9 +=  element['Col004']+',';
   break;
 
 case "Which jewelry and accessories brands do you wear?":
   que10 = question
   ans10 +=  element['Col004']+',';
   break;
 
 case "Which leather goods and accessories brands do you own?":
   que11 = question
   ans11 +=  element['Col004']+',';
   break;
 
 case "Which shoe brands do you purchase?":
   que12 = question
   ans12 +=  element['Col004']+',';
   break;
 
 case "Which home appliances & décor brands do you purchase?":
   que13 = question
   ans13 +=  element['Col004']+',';
   break;
 
 case "What are your frequent travel destinations?":
   que14 = question
   ans14 +=  element['Col004']+',';
   break;
 
 case "Which hotel(s) do you usually stay at during your trips?":
   que15 = question
   ans15 +=  element['Col004']+',';
   break;
 
 case "What are your hobbies, favourite activities, and personal interests?":
   que16 = question
   ans16 +=  element['Col004']+',';
   break;
 
 case "Did you purchase pre-loved luxury items in the past year?":
   que17 = question
   ans17 +=  element['Col004']+',';
   break;
 
 case "Which channel(s) do you use?":
   que18 = question
   ans18 +=  element['Col004']+',';
   break;
 
 case "Do you sell your pre-loved luxury items?":
   que19 = question
   ans19 +=  element['Col004']+',';
   break;
 
 case "Do you own a car?":
   que20 = question
   ans20 +=  element['Col004']+',';
   break;
 
 case "Please select the brand of your car":
   que21 = question
   ans21 +=  element['Col004']+',';
   break;
 case "Profile Verification":
   que22 = question
   ans22 +=  element['Col004']+',';
   break;
   
   }
 
 });

 

 if(ans1 == 'null,'){ans1='';}
if(ans2 == 'null,'){ans2='';}
if(ans3 == 'null,'){ans3='';}
if(ans4 == 'null,'){ans4='';}
if(ans5 == 'null,'){ans5='';}
if(ans6 == 'null,'){ans6='';}
if(ans7 == 'null,'){ans7='';}
if(ans8 == 'null,'){ans8='';}
if(ans9 == 'null,'){ans9='';}
if(ans10 == 'null,'){ans10='';}
if(ans11 == 'null,'){ans11='';}
if(ans12 == 'null,'){ans12='';}
if(ans13 == 'null,'){ans13='';}
if(ans14 == 'null,'){ans14='';}
if(ans15 == 'null,'){ans15='';}
if(ans16 == 'null,'){ans16='';}
if(ans17 == 'null,'){ans17='';}
if(ans18 == 'null,'){ans18='';}
if(ans19 == 'null,'){ans19='';}
if(ans20 == 'null,'){ans20='';}
if(ans21 == 'null,'){ans21='';}
if(ans22 == 'null,'){ans22='';}

 dataarr.push(worker_id,user_id,inst_id,accout_status,hire_status,title,inst_name,email,mobile,gender1,country,last_timestamp,ans1,ans2,ans3,ans4,ans5,ans6,ans7,ans8,ans9,ans10,ans11,ans12,ans13,ans14,ans15,ans16,ans17,ans18,ans19,ans20,ans21,ans22); 
 apilog_file_start2("** ID - "+dataarr+'**');
 test_details_res(id,dataarr)   
 
 }else{
  console.log("Profile has no survay DataSet("+id+")");
  apilog_file_start2("Profile has no survay DataSet("+id+")");
}

 }else{
  console.log("Profile has no survay DataSet("+id+")");
  apilog_file_start2("Profile has no survay DataSet("+id+")");
}
 }else{
  console.log("Profile has no survay DataSet("+id+")");
  apilog_file_start2("Profile has no survay DataSet("+id+")");
}
 
 if (dataarr != '') {
        await resolve(dataarr);
        } else {
        await  reject("Error");
        }
      
});
} catch (error) {
  return error
  }
});

  const data_res = async(id) =>{
  try {
  const data = await fetch_data_promise(id);
  return data;
  } catch (error) {
  return error
  
  }
  }
  
  const test_data_res = async(id)=>{
  const res_data = await data_res(id);
  //console.log(res_data);
  return res_data;
  
  }

    //----------------------------- fetch basic details Promise -----------------------------------------    

const fetch_details_promise = (id,dataarr)=> new Promise(async(resolve, reject)=> {
  try{
    var token = await testToken();
    
    var user_lang='';
    var uid='';
    var gender='';
    var fname='';
    var lname='';
    var dofbirth='';
    var datetime_last='';
    var datetime_reg='';
    var user_lang='';
    var detailsarr = [];
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

    apilog_file_start2("-- GET BASIC DETAILS --");
    apilog_file_start2("-- REQUEST URL : /Apps/SM/APIv2/Query/Fieldworkers/FieldworkerProfile --");
    apilog_file_start2("-- Response --");

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
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            basic_account_status = data.dataset.data[0][0]['Account Status'];
        }else{
            basic_account_status ='';
        }


        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            uid = data.dataset.data[0][0]['User ID'];
        }else{
            uid ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            gender = data.dataset.data[0][0]['Gender'];
        }else{
            gender1 ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            fname = data.dataset.data[0][0]['First Name'];
        }else{
            fname ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            lname = data.dataset.data[0][0]['Last Name'];
        }else{
            lname ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            dob = data.dataset.data[0][0]['Date Of Birth'];
            if(dob != undefined && dob !='')
            {
            d_of_birth = dob.split('-');
            xdob = d_of_birth[1]+'/'+d_of_birth[2]+'/'+d_of_birth[0];
            var d = new Date(xdob);
            d.setUTCHours(24,0,0,0);
            dateISO = d.toISOString();
            dofbirth = Date.parse(dateISO);
            }else{
                dofbirth ='';
                //console.log("empty dob");
            }
        }else{
            dofbirth ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            mydate = data.dataset.data[0][0]['Date/Time Last Login UTC'];
            if(mydate != undefined && mydate !='')
            {
            z=mydate.slice(0,10);
            y = new Date(z);
            datetime_last=Date.parse(y);
            }else{
                datetime_last='';
                //console.log("empty last login");
            }
        }else{
            datetime_last ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            rdate = data.dataset.data[0][0]['Date/Time Registered UTC'];
            rdate_1 = rdate.split(" ");
            rdate_2 = String(rdate_1[0]).split('-');
            zdreg = rdate_2[1]+'/'+rdate_2[2]+'/'+rdate_2[0];
            var d3 = new Date(zdreg);
            d3.setUTCHours(24,0,0,0);
            dateISO3 = d3.toISOString();
            datetime_reg = Date.parse(dateISO3);
        }else{
            datetime_reg ='';
        }
        if(data.dataset.data[0].length !=undefined && data.dataset.data[0].length !='' && data.dataset.data[0].length !=null)
        {
            user_lang = data.dataset.data[0][0]['User Language Local'];
        }else{
            user_lang ='';
        }
        detailsarr.push(uid,gender,fname,lname,dofbirth,datetime_last,datetime_reg,user_lang); 
        basic_details_arr.push(basic_email,basic_country,basic_account_status);
        apilog_file_start2(detailsarr);
        alldata = detailsarr.concat(dataarr,basic_details_arr);
        test_insert_res(id,alldata);

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
  const details_res = async(id,dataarr) =>{
  try {
  const data = await fetch_details_promise(id,dataarr);
  return data;
  } catch (error) {
  return error
  
  }
  }
  
  const test_details_res = async(id,dataarr)=>{
  const res_data = await details_res(id,dataarr);
  //console.log(res_data);
  return res_data;
  
  }

 

  // --------------------------------------------- Hubspot API Promise ----------------------------------------------------

  
const insert_promise = (id,alldata)=> new Promise(async(resolve, reject)=> {
try{
 
  //console.log("alldata "+alldata);
  if(alldata[0] != '' && alldata[0] != undefined && alldata[0] != null)
  {
     
     var uid = alldata[0];
  }else{
     var uid ='';
  }
  if(alldata[1] != '' && alldata[1] != undefined && alldata[1] != null)
  {
    var gender=alldata[1];
  }else{
    var gender='';
  }
  if(alldata[2] != '' && alldata[2] != undefined && alldata[2] != null)
  {
    var fname=alldata[2];
  }else{
    var fname='';
  }
  if(alldata[3] != '' && alldata[3] != undefined && alldata[3] != null)
  {
    var lname=alldata[3];
  }else{
    var lname='';
  }
  if(alldata[4] != '' && alldata[4] != undefined && alldata[4] != null)
  {
    var dofbirth=alldata[4];
  }else{
    var dofbirth='';
  }
  if(alldata[5] != '' && alldata[5] != undefined && alldata[5] != null)
  {
    var datetime_last=alldata[5];
  }else{
    var datetime_last='';
  }
  if(alldata[6] != '' && alldata[6] != undefined && alldata[6] != null)
  {
    var datetime_reg=alldata[6];
  }else{
    var datetime_reg='';
  }
  if(alldata[7] != '' && alldata[7] != undefined && alldata[7] != null)
  {
    var user_lang=alldata[7];
  }else{
    var user_lang='';
  }
  if(alldata[8] != '' && alldata[8] != undefined && alldata[8] != null)
  {
    var worker_id=alldata[8];
  }else{
    var worker_id='';
  }
  if(alldata[9] != '' && alldata[9] != undefined && alldata[9] != null)
  {
    var user_id=alldata[9];
  }else{
    var user_id='';
  }
  if(alldata[10] != '' && alldata[10] != undefined && alldata[10] != null)
  {
    var inst_id=alldata[10];
  }else{
    var inst_id='';
  }
  if(alldata[11] != '' && alldata[11] != undefined && alldata[11] != null)
  {
    var accout_status=alldata[11];
     if(accout_status == 'Enabled'){accout_status = 'Active';}
  }else{
    var accout_status='';
  }
  if(alldata[12] != '' && alldata[12] != undefined && alldata[12] != null)
  {
    var hire_status=alldata[12];
  }else{
    var hire_status='';
  }
  if(alldata[13] != '' && alldata[13] != undefined && alldata[13] != null)
  {
    var title=alldata[13];
  }else{
    var title=''; 
  }
  if(alldata[14] != '' && alldata[14] != undefined && alldata[14] != null)
  {
    var inst_name=alldata[14];
  }else{
    var inst_name='';
  }
  // if(alldata[15] != '' && alldata[15] != undefined && alldata[15] != null)
  // {
  //   var email=alldata[15];
  // }else{
  //   var email=''; 
  // }
  if(alldata[16] != '' && alldata[16] != undefined && alldata[16] != null)
  {
    var mobile=alldata[16];
  }else{
    var mobile='';
  }
  if(alldata[17] != '' && alldata[17] != undefined && alldata[17] != null)
  {
    var gender1=alldata[17];
  }else{
    var gender1='';
  }
  if(alldata[18] != '' && alldata[18] != undefined && alldata[18] != null)
  {
    var country=alldata[18];
  }else{
    var country='';
  }
  if(alldata[19] != '' && alldata[19] != undefined && alldata[19] != null)
  {
    var last_timestamp=alldata[19];
  }else{
    var last_timestamp='';
  }
  if(alldata[20] != '' && alldata[20] != undefined && alldata[20] != null)
  {
    var ans1=alldata[20];
  }else{
    var ans1='';
  }
  if(alldata[21] != '' && alldata[21] != undefined && alldata[21] != null)
  {
    var ans2=alldata[21];
  }else{
    var ans2='';
  }
  if(alldata[22] != '' && alldata[22] != undefined && alldata[22] != null)
  {
    var ans3=alldata[22];
  }else{
    var ans3='';
  }
  if(alldata[23] != '' && alldata[23] != undefined && alldata[23] != null)
  {
    var ans4=alldata[23];
  }else{
    var ans4='';
  }
  if(alldata[24] != '' && alldata[24] != undefined && alldata[24] != null)
  {
    var ans5=alldata[24];
  }else{
    var ans5='';
  }
  if(alldata[25] != '' && alldata[25] != undefined && alldata[25] != null)
  {
    var ans6=alldata[25];
  }else{
    var ans6='';
  }
  if(alldata[26] != '' && alldata[26] != undefined && alldata[26] != null)
  {
    var ans7=alldata[26];
  }else{
    var ans7='';
  }
  if(alldata[27] != '' && alldata[27] != undefined && alldata[27] != null)
  {
    var ans8=alldata[27];
  }else{
    var ans8='';
  }
  if(alldata[28] != '' && alldata[28] != undefined && alldata[28] != null)
  {
    var ans9=alldata[28];
  }else{
    var ans9='';
  }
  if(alldata[29] != '' && alldata[29] != undefined && alldata[29] != null)
  {
    var ans10=alldata[29];
  }else{
    var ans10='';
  }
  if(alldata[30] != '' && alldata[30] != undefined && alldata[30] != null)
  {
    var ans11=alldata[30];
  }else{
    var ans11='';
  }
  if(alldata[31] != '' && alldata[31] != undefined && alldata[31] != null)
  {
    var ans12=alldata[31];
  }else{
    var ans12='';
  }
  if(alldata[32] != '' && alldata[32] != undefined && alldata[32] != null)
  {
    var ans13=alldata[32];
  }else{
    var ans13='';
  }
  if(alldata[33] != '' && alldata[33] != undefined && alldata[33] != null)
  {
    var ans14=alldata[33];
  }else{
    var ans14='';
  }
  if(alldata[34] != '' && alldata[34] != undefined && alldata[34] != null)
  {
    var ans15=alldata[34];
  }else{
    var ans15='';
  }
  if(alldata[35] != '' && alldata[35] != undefined && alldata[35] != null)
  {
    var ans16=alldata[35];
  }else{
    var ans16='';
  }
  if(alldata[36] != '' && alldata[36] != undefined && alldata[36] != null)
  {
    var ans17=alldata[36];
  }else{
    var ans17='';
  }
  if(alldata[37] != '' && alldata[37] != undefined && alldata[37] != null)
  {
    var ans18=alldata[37];
  }else{
    var ans18='';
  }
  if(alldata[38] != '' && alldata[38] != undefined && alldata[38] != null)
  {
    var ans19=alldata[38];
  }else{
    var ans19='';
  }
  if(alldata[39] != '' && alldata[39] != undefined && alldata[39] != null)
  {
    var ans20=alldata[39];
  }else{
    var ans20='';
  }
  if(alldata[40] != '' && alldata[40] != undefined && alldata[40] != null)
  {
    var ans21=alldata[40];
  }else{
    var ans21='';
  }
  if(alldata[41] != '' && alldata[41] != undefined && alldata[41] != null)
  {
    var ans22=alldata[41];
  }else{
    var ans22='';
  }
    if(alldata[42] != '' && alldata[42] != undefined && alldata[42] != null)
  {
    var basic_email=alldata[42];
  }else{
    var basic_email='';
  }
  if(alldata[43] != '' && alldata[43] != undefined && alldata[43] != null)
  {
    var basic_country=alldata[43];
  }else{
    var basic_country='';
  }
  if(alldata[44] != '' && alldata[44] != undefined && alldata[44] != null)
  {
    var basic_account_status=alldata[44];
    if(basic_account_status == 'Enabled'){basic_account_status = 'Active';}
  }else{
    var basic_account_status='';
  }
  
 
      
        
      if(basic_country != 'China')
      {

              //var object_id = await test_exist_id(id);
        //console.log("object_id "+object_id);

      //if(object_id !='' && object_id !=undefined)
      //{
        //console.log("basic_email "+basic_email);

//    var options = {
//   'method': 'POST',
//   'url': 'https://api.hubapi.com/contacts/v1/contact/vid/'+object_id+'/profile',
//   'headers': {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer pat-eu1-f1e6f3dc-269d-485e-9adc-1215b1ed2d3a '
//   },
//   body: JSON.stringify({
//     "properties": [
//    { property: 'firstname', value: fname },
//          { property: 'lastname', value: lname },
//          { property: 'mobilephone', value: mobile },
//          { property: 'email', value: basic_email },
//          { property: 'dob__date_of_birth_', value: dofbirth },
//          { property: 'gender', value: gender1 },
//          { property: 'how_did_you_hear_about_us_', value: ans1 },
//          { property: 'nationality_citizenship', value: ans2 },
//          { property: 'which_languages_do_you_speak_fluently_to_perform_a_mission_', value: ans3 },
//          { property: 'jobtitle', value: ans5 },
//          { property: 'company', value: ans6 },
//          { property: 'which_cosmetic_brands_are_in_your_bathroom_', value: ans7 },
//          { property: 'which_fashion_brands_do_you_purchase_', value: ans8 },
//          { property: 'which_watch_brands_do_you_own_', value: ans9 },
//          { property: 'which_jewelry_and_accessories_brands_do_you_wear_', value: ans10 },
//          { property: 'which_leather_goods_and_accessories_brands_do_you_own_', value: ans11 },
//          { property: 'which_shoe_brands_do_you_purchase_', value: ans12 },
//          { property: 'which_home_appliances___decor_brands_do_you_purchase_', value: ans13 },
//          { property: 'what_are_your_frequent_travel_destinations_', value: ans14},
//          { property: 'which_hotel_s__do_you_usually_stay_at_during_your_trips_', value: ans15 },
//          { property: 'what_are_your_hobbies__favourite_activities__and_personal_interests_', value: ans16 },
//          { property: 'did_you_purchase_pre_loved_luxury_items_in_the_past_year_', value: ans17 },
//          { property: 'which_channel_s__do_you_use_to_sell_', value: ans18},
//          { property: 'which_channel_s__do_you_use_', value:ans18 },
//          { property: 'do_you_sell_your_pre_loved_luxury_items_', value: ans19 },
//          { property: 'do_you_own_a_car_', value: ans20 },
//          { property: 'what_is_the_brand_of_your_car', value: ans21 },
//          { property: 'account_status', value: basic_account_status },
//          { property: 'date_last_login', value: datetime_last },
//          { property: 'date_registered', value: datetime_reg },
//          { property: 'hire_status', value: hire_status },
//          { property: 'login', value: id },
//          { property: 'user_language_local', value: user_lang },
//          { property: 'surveyinstanceid', value: inst_id },
//          { property: 'surveystatusname', value: inst_name },
//          { property: 'surveytitle', value: title },
//          { property: 'timestamp_last_validated', value: last_timestamp },
//          { property: 'country', value: basic_country },
//          { property: 'fieldworker_login', value: id },
       
//     ]
//   })

// };
// request(options,async function (error, response, body) {
//        if (error) throw new Error(error);
//        //console.log(body);
//       console.log(id+" has been updated");
//       if (body != '') {
//         await resolve(body);
//         } else {
//         await  reject("Error");
//         }
      
//       });

// }else{

        
      var options = { method: 'POST', url: 'https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/'+basic_email+'/',
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
         { property: 'firstname', value: fname },
         { property: 'lastname', value: lname },
         { property: 'mobilephone', value: mobile },
         { property: 'dob__date_of_birth_', value: dofbirth },
         { property: 'gender', value: gender1 },
         { property: 'how_did_you_hear_about_us_', value: ans1 },
         { property: 'nationality_citizenship', value: ans2 },
         { property: 'which_languages_do_you_speak_fluently_to_perform_a_mission_', value: ans3 },
         { property: 'jobtitle', value: ans5 },
         { property: 'company', value: ans6 },
         { property: 'which_cosmetic_brands_are_in_your_bathroom_', value: ans7 },
         { property: 'which_fashion_brands_do_you_purchase_', value: ans8 },
         { property: 'which_watch_brands_do_you_own_', value: ans9 },
         { property: 'which_jewelry_and_accessories_brands_do_you_wear_', value: ans10 },
         { property: 'which_leather_goods_and_accessories_brands_do_you_own_', value: ans11 }, 
         { property: 'which_shoe_brands_do_you_purchase_', value: ans12 },
         { property: 'which_home_appliances___decor_brands_do_you_purchase_', value: ans13 },
         { property: 'what_are_your_frequent_travel_destinations_', value: ans14},
         { property: 'which_hotel_s__do_you_usually_stay_at_during_your_trips_', value: ans15 },
         { property: 'what_are_your_hobbies__favourite_activities__and_personal_interests_', value: ans16 },
         { property: 'did_you_purchase_pre_loved_luxury_items_in_the_past_year_', value: ans17 },
         { property: 'which_channel_s__do_you_use_to_sell_', value: ans18},
         { property: 'which_channel_s__do_you_use_', value:ans18 },
         { property: 'do_you_sell_your_pre_loved_luxury_items_', value: ans19 },
         { property: 'do_you_own_a_car_', value: ans20 },
         { property: 'what_is_the_brand_of_your_car', value: ans21 },
         { property: 'account_status', value: basic_account_status },
         { property: 'date_last_login', value: datetime_last },
         { property: 'date_registered', value: datetime_reg },
         { property: 'hire_status', value: hire_status },
         { property: 'login', value: id },
         { property: 'user_language_local', value: user_lang },
         { property: 'surveyinstanceid', value: inst_id },
         { property: 'surveystatusname', value: inst_name },
         { property: 'surveytitle', value: title },
         { property: 'timestamp_last_validated', value: last_timestamp },
         { property: 'country', value: basic_country },
         { property: 'fieldworker_login', value: id }
       
       ] 
      },
        json: true };
      // /
     apilog_file_start2("-- RUN HUBSPOT API --");
     apilog_file_start2("-- REQUEST URL : https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/ --");
     apilog_file_start2("-- Response --");

      request(options,async function (error, response, body) {
       if (error) throw new Error(error);
      console.log(id + " has been inserted");
      loginids(id + " has been inserted");
      apilog_file_start2(id + "has been inserted");
      if (body != '') {
        await resolve(body);
        } else {
        await  reject("Error");
        }
      
      });
//}
      
    }else{
      console.log("China user will not sync("+id+")");
      loginids("China user will not sync("+id+")");
      apilog_file_start2("China user will not sync("+id+")");
    } 
  
    } catch (error) {
     errorlog("Error - "+error);
      return error
      }
});

const insert_res = async(id,detailsarr) =>{
try {
const data = await insert_promise(id,detailsarr);
return data; 
} catch (error) {
errorlog("Error - "+error);
return error

}
}

const test_insert_res = async(id,detailsarr)=>{
const res_data = await insert_res(id,detailsarr);
//console.log(res_data);
return res_data;

}

//--------------------- Create Token promise--------------------------------------

const exist_id_promise = (id) => new Promise(async(resolve, reject)=> {
    try{
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
        
          if (error){errorlog(error); throw new Error(error);}
          var result = JSON.parse(response.body);
           // console.log(result);
           // console.log(result.results);
           if(result != '' && result != undefined && result != null)
            {
           if(result.results != '' && result.results != undefined && result.results != null)
             {
           if(result.results.length != 0 && result.results.length !== undefined && result.results.length != null)
             {
                var email = result.results[0].properties['email'];
                 var objectid = result.results[0].properties['hs_object_id'];
                // console.log(email);
                 //console.log("Object Id1=> "+objectid);
              
                

             }else{
                 var objectid =''; 
             }

           }
         }

           
          

             if (objectid != '') {
                await resolve(objectid);
                } else {
                await  reject("Error");
                }
        });
         } catch (error) {
              return error

             }
           
    
 });
 const check_exist_id = async(id) =>{
   try {
    const data = await exist_id_promise(id);
    return data;
   } catch (error) {
    return error

   }
 }




   const test_exist_id = async(id)=>{
   const exist_id = await check_exist_id(id);
   return exist_id;

 }

