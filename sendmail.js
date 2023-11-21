 var cron = require('node-cron');
 var nodemailer = require('nodemailer');
 var fs = require('fs');
 var path = require('path');
 

const { promises: fsPromises } = require('fs');

var dir="logfiles";
var filename = "Applog "+new Date().toISOString().split('T')[0];
var filePath = path.join(__dirname, dir+'/'+filename+'.log'); 

async function readFile() {
  try {
    const data = await fsPromises.readFile(filePath, 'utf8');

    const transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., 'Gmail', 'Yahoo', or your SMTP server settings
        auth: {
            user: 'kmik42179@gmail.com',
            pass: 'oxzoatabsalfqzbk',
            },
        });

    const mailOptions = {
        from: 'kmik42179@gmail.com',
         to: 'ahmed.klabi@cxg.com,sasha.kan@cxg.com,Asif@arcsncurves.com', // Recipient's email address
         cc:'irfan.linuxbean@gmail.com,limefresh5455@gmail.com,ranveer.linuxbean@gmail.com',
        subject: 'Cron job smx',
        text: data,
        };

        const sendEmail = () => {
        return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
        console.log("Error:-\n"+error);
      } else {
        resolve(info.response);
        console.log(info);
      }
    });
  });
};

sendEmail()
  .then(response => {
    console.log('Email sent:', response);
  })
  .catch(error => {
    console.error('Error sending email:', error);
  });


    //console.log('File content:', data);
  } catch (err) {
    console.error('Error reading the file:', err);
  }
}

 readFile();

//  var cron = require('node-cron');
//  var nodemailer = require('nodemailer');
//  var fs = require('fs');
//  var path = require('path');
 
 
// const promise = new Promise(async(resolve, reject)=> {
//  try {

// var dir="logfiles";
// var filename = "Applog "+new Date().toISOString().split('T')[0];
// var logFilePath = path.join(__dirname, dir+'/'+filename+'.log');   
// var data = fs.readFileSync(logFilePath, 'utf8');          
        
//               if (data != '') {
//               await resolve(data);
//               } else {
//               await  reject("Error");
//               }
             
//    } catch (err) {
//         console.error('Error reading the file:', err);
//    } 

// });
//  const checkcontent = async() =>{
//    try {
//     const data = await promise;
//     return data;
//    } catch (error) {
//     return error

//    }
// }
// const testcontent = async()=>{
//    const data = await checkcontent();

//    return data;
//  }

//  const mailpromise = new Promise(async(resolve, reject)=> {
//  try {
//   const body_content = await testcontent();
//   var transporter = nodemailer.createTransport({
//    service: 'gmail',
//    auth: {
//            user: 'kmik42179@gmail.com',   //put your mail here
//            pass: 'oxzoatabsalfqzbk'    //password here
                       
//          }
// });
  
//   const mailOptions = { 
//                from: 'kmik42179@gmail.com',       
//                to: 'ahmed.klabi@cxg.com,sasha.kan@cxg.com,Asif@arcsncurves.com', // Recipient's email address
//                cc:'irfan.linuxbean@gmail.com,limefresh5455@gmail.com,ranveer.linuxbean@gmail.com',
//                subject: 'Cron Job', // Email subject                        
//                text: `${body_content}`
// };

// // // cron.schedule('0 */1 * * * *', () => {
  
// transporter.sendMail(mailOptions, function (err, info) {
//     if(err) 
//       console.log(err);
//     else
//       //console.log(info);
//       console.log("mail has been sent "+new Date());
//      });
// // //});

//   } catch (err) {
//         console.error('Error reading the file:', err);
//   }

//  });

//  const check_mail_promise = async() =>{
//    try {
//     const data = await mailpromise;
//     return data;
//    } catch (error) {
//     return error

//    }
//  }

// const test_mail_promise= async()=>{
//    const data = await check_mail_promise();
//    return data;
//  }

//  test_mail_promise();

