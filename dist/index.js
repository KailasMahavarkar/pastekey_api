"use strict";var at=Object.create;var ue=Object.defineProperty;var st=Object.getOwnPropertyDescriptor;var it=Object.getOwnPropertyNames;var nt=Object.getPrototypeOf,ot=Object.prototype.hasOwnProperty;var dt=(e,r,t,s)=>{if(r&&typeof r=="object"||typeof r=="function")for(let i of it(r))!ot.call(e,i)&&i!==t&&ue(e,i,{get:()=>r[i],enumerable:!(s=st(r,i))||s.enumerable});return e};var c=(e,r,t)=>(t=e!=null?at(nt(e)):{},dt(r||!e||!e.__esModule?ue(t,"default",{value:e,enumerable:!0}):t,e));var me=c(require("dotenv"));me.default.config({});var lt={MODE:process.env.MODE,SERVER_URL:{dev:process.env.SERVER_URL_DEV,prod:process.env.SERVER_URL_PROD},EMAIL_MODE:process.env.EMAIL_MODE,MACHINE:process.env.MACHINE,DB_URL:process.env.DB_URL,REDIS_CONFIG:{dev:{HOST:process.env.REDIS_DEV_HOST,PORT:process.env.REDIS_DEV_PORT,PASSWORD:process.env.REDIS_DEV_PASSWORD},prod:{HOST:process.env.REDIS_PROD_HOST,PORT:process.env.REDIS_PROD_PORT,PASSWORD:process.env.REDIS_PROD_PASSWORD}},X_API_KEY:process.env.X_API_KEY,X_TEST_KEY:process.env.X_TEST_KEY,SIB_APIKEY:process.env.SIB_APIKEY,ENCRYPTION_KEY:process.env.ENCRYPTION_KEY,PASSWORD_SALT:process.env.PASSWORD_SALT,ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,ACCESS_TOKEN_EXPIRY:process.env.ACCESS_TOKEN_EXPIRY,REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,REFRESH_TOKEN_EXPIRY:process.env.REFRESH_TOKEN_EXPIRY,ADMIN_ACCESS_TOKEN_SECRET:process.env.ADMIN_ACCESS_TOKEN_SECRET,ADMIN_REFRESH_TOKEN_SECRET:process.env.ADMIN_REFRESH_TOKEN_SECRET,ADMIN_ACCESS_TOKEN_EXPIRY:process.env.ADMIN_ACCESS_TOKEN_EXPIRY,ADMIN_REFRESH_TOKEN_EXPIRY:process.env.ADMIN_REFRESH_TOKEN_EXPIRY},p=lt;var Qe=c(require("mongoose")),de=c(require("express")),Ze=c(require("crypto-js/sha512")),et=c(require("cors"));var d=require("ts-mongoose"),Q={payment:(0,d.createSchema)({paypal:d.Type.string({required:!1,default:""}),upi:d.Type.string({required:!1,default:""}),selected:d.Type.string({required:!0,enum:["paypal","upi"]})},{_id:!1}),social:(0,d.createSchema)({facebook:d.Type.string({required:!1,default:""}),twitter:d.Type.string({required:!1,default:""}),instagram:d.Type.string({required:!1,default:""}),website:d.Type.string({required:!1,default:""})},{_id:!1}),pasteCounterSchema:(0,d.createSchema)({pasteCreated:d.Type.number({required:!0}),pasteCreatedToday:d.Type.number({required:!0}),pasteRead:d.Type.number({required:!0}),pasteReadToday:d.Type.number({required:!0}),pasteUpdated:d.Type.number({required:!0}),pasteUpdatedToday:d.Type.number({required:!0})},{_id:!1}),fileCounterSchema:(0,d.createSchema)({fileCreated:d.Type.number({required:!0}),fileCreatedToday:d.Type.number({required:!0}),fileRead:d.Type.number({required:!0}),fileReadToday:d.Type.number({required:!0})},{_id:!1})},pt=(0,d.createSchema)({paste:d.Type.object({required:!0}).of(Q.pasteCounterSchema)},{_id:!1}),ct=(0,d.createSchema)({_id:d.Type.objectId({auto:!0}),username:d.Type.string({required:!0}),fullname:d.Type.string({required:!1}),email:d.Type.string({required:!0}),apikey:d.Type.string({required:!0,index:!0}),resetToken:d.Type.string({required:!1}),password:d.Type.string({required:!0}),role:d.Type.string({required:!0,enum:["member","admin"]}),datejoined:d.Type.number({required:!0}),pastes:d.Type.array({required:!1}).of(d.Type.string({required:!1})),status:d.Type.string({required:!0,enum:["active","inactive","banned","deleted"]}),paidViews:d.Type.number({required:!0}),unpaidViews:d.Type.number({required:!0}),paidEarnings:d.Type.number({required:!0}),unpaidEarnings:d.Type.number({required:!0}),payment:d.Type.object({required:!1,default:{paypal:"",upi:"",selected:"upi"}}).of(Q.payment),socials:d.Type.object({required:!1,default:{facebook:"",twitter:"",instagram:""}}).of(Q.social),pasteCounter:d.Type.object({required:!0,default:{pasteCreated:0,pasteCreatedToday:0,pasteRead:0,pasteReadToday:0,pasteUpdated:0,pasteUpdatedToday:0}}).of(pt)}),ut=(0,d.typedModel)("User",ct),g=ut;var P=async(e,r,t)=>{let s=await g.findOne({apikey:e.headers["x-api-key"]||""});return e.locals.role=s?.role||"member",e.locals.user=s||{},e.locals.owner=s?.username||"default",t()};var j=c(require("crypto-js/sha512"));var fe=require("uuid"),yr=p.MACHINE==="windows";function Y(){return(0,fe.v4)().replace(/-/g,"")}var ye=e=>t=>p.MODE===e?typeof t=="function"?t():t:"",v=ye("dev"),gr=ye("prod"),F=e=>p.MODE==="prod"||p.MODE==="PROD"?e.prod:e.dev;var A=e=>{try{return e==null||typeof e>"u"||e.length===0?!0:typeof e=="object"&&Object.keys(e).length===0}catch{return!1}},R=e=>({exists:!0,error:{message:e.message,stack:v(e.stack)}}),k=e=>e?.map(r=>({key:r.instancePath.split("/")[1],message:r.message,params:r.params}));var b=require("ts-mongoose"),mt=(0,b.createSchema)({_id:b.Type.objectId({auto:!0}),email:b.Type.string({required:!0}),username:b.Type.string({required:!0}),password:b.Type.string({required:!0}),token:b.Type.string({required:!0}),status:b.Type.string({required:!0,enum:["pending","banned","expired"],default:"pending"}),attempts:b.Type.number({required:!0,default:0}),createTS:b.Type.number({required:!0,default:Date.now()}),expireTS:b.Type.number({required:!0,default:Date.now()}),updateTS:b.Type.number({required:!0,default:Date.now()})}),ft=(0,b.typedModel)("Temp",mt),I=ft;var xe=c(require("ajv")),ve=c(require("ajv/dist/runtime/validation_error"));var yt={object:{type:"object"}},ge=e=>`<pre>${JSON.stringify(e.object,null,2)} </pre>`,be={template:ge,schema:yt,plaintext:ge};var gt={type:"object",properties:{company:{type:"string"},href:{type:"string"},username:{type:"string"}}},bt=e=>`<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
      <title></title>
      
        <style type="text/css">
          @media only screen and (min-width: 620px) {
      .u-row {
        width: 600px !important;
      }
      .u-row .u-col {
        vertical-align: top;
      }
    
      .u-row .u-col-100 {
        width: 600px !important;
      }
    
    }
    
    @media (max-width: 620px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: calc(100% - 40px) !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }
    
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    
    p {
      margin: 0;
    }
    
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    
    * {
      line-height: inherit;
    }
    
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    
    table, td { color: #000000; } a { color: #161a39; text-decoration: underline; } @media (max-width: 480px) { #u_content_heading_1 .v-font-size { font-size: 26px !important; } #u_content_heading_2 .v-font-size { font-size: 17px !important; } }
        </style>
      
      
    
    <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
        
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #f6f6f6;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="background-color: #f6f6f6;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_heading_1" style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;" align="left">
            
      <h1 class="v-font-size" style="margin: 0px; color: #105a80; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: arial black,avant garde,arial; font-size: 30px;">
        Pastekey.io
      </h1>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #105a80;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #105a80;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:11px;font-family:'Lato',sans-serif;" align="left">
            
      <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="font-size: 20px; line-height: 28px; color: #ffffff; font-family: Lato, sans-serif;">Please reset your password </span></p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #f6f6f6;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="background-color: #f6f6f6;width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;" align="left">
            
      <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px; color: #666666;">Hello ${e.username},</span></p>
    <p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px; color: #666666;">We have sent you this email in response to your request to reset your password on ${e.company}.</span></p>
    <p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px; color: #666666;">To reset your password, please follow the link below: </span></p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 40px;font-family:'Lato',sans-serif;" align="left">
            
    <div align="left">
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Lato',sans-serif;"><tr><td style="font-family:'Lato',sans-serif;" align="left"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${e.href}" style="height:52px; v-text-anchor:middle; width:205px;" arcsize="19%" stroke="f" fillcolor="#105a80"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Lato',sans-serif;"><![endif]-->
        <a href="${e.href}" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Lato',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #105a80; border-radius: 10px;-webkit-border-radius: 10px; -moz-border-radius: 10px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
          <span style="display:block;padding:15px 40px;line-height:120%;"><span style="font-size: 18px; line-height: 21.6px;">Reset Password</span></span>
        </a>
      <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
    </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;" align="left">
            
      <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;"><span style="color: #888888; font-size: 14px; line-height: 19.6px;"><em><span style="font-size: 16px; line-height: 22.4px;">Link will be valid for 10 mins, Please ignore this email if you did not request a password change.</span></em></span><br /><span style="color: #888888; font-size: 14px; line-height: 19.6px;"><em><span style="font-size: 16px; line-height: 22.4px;">&nbsp;</span></em></span></p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: #f9f9f9">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #093953;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f9f9f9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #093953;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #f6f6f6;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="background-color: #f6f6f6;width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table id="u_content_heading_2" style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;" align="left">
            
      <h1 class="v-font-size" style="margin: 0px; color: #000000; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 16px;">
        Copyrights &copy; pastekey.io<br />All Rights Reserved
      </h1>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
      </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
    
    </html>`,we={template:bt,schema:gt};var wt={type:"object",properties:{company:{type:"string"},href:{type:"string"}},required:["company","href"]},ht=e=>`Hello ${e.company}!

Please verify your email by clicking the following link:

${e.href}

Thank you,

The ${e.company} Team`,xt=e=>`<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <title></title>
    
      <style type="text/css">
        table,
        td {
          color: #000000;
        }
        
        a {
          color: #0000ee;
          text-decoration: underline;
        }
        
        @media only screen and (min-width: 620px) {
          .u-row {
            width: 600px !important;
          }
          .u-row .u-col {
            vertical-align: top;
          }
          .u-row .u-col-100 {
            width: 600px !important;
          }
        }
        
        @media (max-width: 620px) {
          .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }
          .u-row .u-col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
          .u-row {
            width: calc(100% - 40px) !important;
          }
          .u-col {
            width: 100% !important;
          }
          .u-col>div {
            margin: 0 auto;
          }
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }
        
        p {
          margin: 0;
        }
        
        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }
        
        * {
          line-height: inherit;
        }
        
        a[x-apple-data-detectors='true'] {
          color: inherit !important;
          text-decoration: none !important;
        }
      </style>
    
    
    
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
      <!--<![endif]-->
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: arial black,avant garde,arial; font-size: 22px;">
                                    ${e.company}
                                  </h1>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #105a80;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #105a80;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
    
                                        <img align="center" border="0" src="https://cdn.templates.unlayer.com/assets/1597218650916-xxxxc.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 26%;max-width: 150.8px;"
                                          width="150.8" />
    
                                      </td>
                                    </tr>
                                  </table>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 140%;"><strong>THANKS&nbsp; &nbsp;FOR&nbsp; &nbsp;SIGNING&nbsp; &nbsp;UP !!</strong></p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Verify Your E-mail Address </span></strong>
                                      </span>
                                    </p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 22px; line-height: 35.2px;">Hi, </span></p>
                                    <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">You're almost ready to get started. </span></p>
                                    <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">Please click on the button below to verify your email address</span></p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div align="center">
                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Cabin',sans-serif;"><tr><td style="font-family:'Cabin',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://google.com" style="height:46px; v-text-anchor:middle; width:234px;" arcsize="87%" stroke="f" fillcolor="#105a80"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Cabin',sans-serif;"><![endif]-->
                                    <a href="${e.href}" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Cabin',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #105a80; border-radius: 40px;-webkit-border-radius: 40px; -moz-border-radius: 40px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                                      <span style="display:block;padding:14px 44px 13px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 16px;">VERIFY YOUR EMAIL</span></strong>
                                      </span>
                                      </span>
                                    </a>
                                    <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ecf0f1;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ecf0f1;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 26px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <tbody>
                                      <tr style="vertical-align: top">
                                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                          <span>&#160;</span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="color: #000000; line-height: 180%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 16px; line-height: 28.8px;">Copyrights &copy; ${e.company} All Rights Reserved</span></p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
    
    </html>`,he={schema:wt,plaintext:ht,template:xt};var vt={verify:he,passwordReset:we,adminNotify:be},D=vt;var Et=new xe.default;async function kt(e,r){if(!D[e])return{errors:[{msg:"Template not found"}]};let t=D[e].schema,s=D[e].template,i=D[e].plaintext,a=Et.compile(t);if(a(r))return{template:s(r),plaintext:i(r),errors:null};throw new ve.default(k(a.errors))}var K=kt;var Z=c(require("sib-api-v3-sdk"));var Ee=p?.SIB_APIKEY,Tt=Z.default.ApiClient.instance,_t=Tt.authentications["api-key"];_t.apiKey=Ee;async function St(e){if(!Ee)throw new Error("Sib Api Key is not defined");let r=new Z.default.TransactionalEmailsApi,t={sender:{email:e.senderEmail,name:"Pastekey.io"},to:e.receiverEmails,subject:e.subject,htmlContent:e.html};try{e.triggers&&e.triggers.beforeEmail&&e.triggers.beforeEmail();let s=await r.sendTransacEmail(t);return e.triggers&&e.triggers?.afterEmail&&e.triggers?.afterEmail(),{msg:"mail has been processed",data:s?.messageId,status:"success"}}catch{return{msg:"mail sending failed",status:"failed",data:{}}}}var V=St;var ee=5,ke=20,At=async(e,r)=>{let t=await K("verify",{company:"pastekey.io",href:F({dev:`http://localhost:3000/register?mailtoken=${e}`,prod:`https://pastekey.io/register?mailtoken=${e}`})});return await V({senderEmail:"no-reply@pastekey.io",appname:"Pastekey.io",html:t.template,subject:"Verify your email",receiverEmails:[{email:r}],plaintext:t.plaintext})},It=async(e,r)=>{let t=e.body,s=t.username,i=t.email,a=t.password||"";e.locals.encrypt&&(a=(0,j.default)((0,j.default)(a).toString()+p.PASSWORD_SALT).toString()),a=(0,j.default)(a+p.PASSWORD_SALT).toString();try{let l=await g.findOne({username:s});if(!A(l))return r.status(400).send({status:"failed",msg:"Username already exists"});let m=await g.findOne({email:i});if(!A(m))return r.status(400).send({msg:"Email is linked with another username",status:"failed"});let h=Y(),n=await I.findOne({email:i});if(!n)await new I({email:i,username:s,password:a,token:h,attempts:1,createTS:Date.now(),expireTS:Date.now()+6e4*ee}).save();else if(n.status==="banned"){if(Date.now()<n.expireTS)return r.status(400).send({msg:`Request exceeded, registration paused for ${ke} minutes`,status:"failed",data:{timeLeftInSeconds:Math.floor((n.expireTS-Date.now())/1e3)},dev:{token:n.token}});n.status="pending",n.attempts=1,n.expireTS=Date.now()+60*1e3*ee,await n.save()}else if(n.status==="pending"){if(n.attempts>=3)return n.status="banned",n.expireTS=Date.now()+60*1e3*ke,n.attempts=0,await n.save(),r.status(400).send({msg:`You have exceeded the limit of attempts. Please try again after ${ee} minutes`,status:"failed"});n.attempts++,n.token=h,await n.save()}else if(n.status==="expired")return r.status(400).send({msg:"Your verification link has expired. Please try again",status:"failed"});return p.EMAIL_MODE==="prod"&&await At(h,i),r.status(200).send({msg:"Verification mail sent",status:"success",dev:v({token:h})})}catch(l){return r.status(500).send({msg:"error registering user",status:"exited",error:R(l)})}},Te=It;var _e=require("crypto");var Pt=async(e,r)=>{let t=e.body.token;if(typeof t!="string"||t.length!==32)return r.status(400).send({msg:"token invalid or expired",status:"unauthorized"});try{let s=await I.findOne({token:t,expireTS:{$gt:Date.now()}});if(s)try{let i=new g({username:s.username,password:s.password,email:s.email,role:"member",datejoined:Date.now(),apikey:(0,_e.randomUUID)().toString().replace(/-/g,""),lastlogin:Date.now(),pastes:[],status:"active",paidViews:0,unpaidViews:0,paidEarnings:0,unpaidEarnings:0,payment:{paypal:"",upi:"",selected:"upi"},socials:{facebook:"",twitter:"",instagram:""},counter:{paste:{pasteCreated:0,pasteCreatedToday:0,pasteRead:0,pasteReadToday:0,pasteUpdated:0,pasteUpdatedToday:0}}});return await i.save(),(await I.deleteOne({_id:s._id})).deletedCount==1?r.status(200).send({status:"success",msg:"Email Verified Successfully"}):(await g.deleteOne({_id:i._id}),r.status(400).send({status:"failed",msg:"temp to user migration failed"}))}catch{return r.status(400).send({status:"failed",msg:"temp to user migration failed"})}else return r.status(400).send({status:"failed",msg:"mail token is Invalid"})}catch{return r.status(500).send({status:"failed",msg:"mail verification failed"})}},Se=Pt;var H=c(require("mongoose")),Rt=H.default.Schema,Dt=new Rt({_id:{type:H.default.Schema.Types.ObjectId,auto:!0},token:{type:String}}),Ct=H.default.model("refreshtoken",Dt),Ae=Ct;var X=c(require("crypto-js/sha512")),te=c(require("jsonwebtoken"));var Nt=e=>(delete e.password,delete e.payment,delete e.pastes,te.default.sign(e,p.ACCESS_TOKEN_SECRET,{expiresIn:p.ACCESS_TOKEN_EXPIRY})),Ot=e=>(delete e.password,delete e.payment,delete e.pastes,te.default.sign(e,p.REFRESH_TOKEN_SECRET,{expiresIn:p.REFRESH_TOKEN_EXPIRY}));var Mt=async(e,r)=>{try{let t=e.body,s=t?.username,i=t?.password;e.locals.encrypt&&(i=(0,X.default)((0,X.default)(i).toString()+p.PASSWORD_SALT).toString()),i=(0,X.default)(i+p.PASSWORD_SALT).toString();let a=await g.findOne({username:s});if(a!==null){if(a.status!=="active")return r.status(400).send({msg:`Username has been ${a.status}`,status:"exited"});if(a.username===s&&a.password===i){let l=a.toJSON(),m=Nt(l),h=Ot(l);try{new Ae({token:h}).save()}catch{return r.status(500).send({msg:"refresh token to db failed",status:"exited"})}return r.status(200).send({msg:"successfully fetched token data",status:"success",data:{accessToken:m,refreshToken:h}})}}return r.status(400).send({msg:"Username and Password does not match",status:"failed"})}catch{return r.status(500).send({msg:"Login Failed",status:"failed"})}},Ie=Mt;var qt=async(e,r)=>{let t=await K("reset",{company:"unitywork.io",href:F(`${p.SERVER_URL}/reset-password?token=${e}`)});return await V({senderEmail:"no-reply@unitywork.io",appname:"unitywork.io",html:t.template,subject:"unity work, OTP for password reset",receiverEmails:[{email:r}],plaintext:t.plaintext})},Ut=async(e,r)=>{let t=e.body.email,s=e.body.token,i=e.body.password;if(s&&i)try{let l=await g.findOne({resetToken:s});return l?._id?(l.password=i,l.resetToken=void 0,await l.save(),r.status(200).send({msg:"password updated",status:"success"})):r.status(400).send({msg:"invalid token",status:"failed"})}catch(l){return r.status(500).send({msg:"error updating password",status:"exited",error:R(l)})}let a=Y();try{let l=await g.findOne({email:t},{email:1});return l?._id?(l.resetToken=a,await l.save(),await qt(a,t),r.status(200).send({msg:"Verification mail sent",status:"success",dev:v({token:a})})):r.status(400).send({msg:"email does not exists in database",status:"failed"})}catch(l){return r.status(500).send({msg:"error registering user",status:"exited",error:R(l)})}},Pe=Ut;var Re=c(require("jsonwebtoken"));var De=e=>(delete e.password,delete e.payment,delete e.pastes,Re.default.sign(e,p.ACCESS_TOKEN_SECRET,{expiresIn:p.ACCESS_TOKEN_EXPIRY}));var Ce=require("jsonwebtoken");var Lt=async(e,r)=>{let t=e.body.token||e.body.refreshToken;if(A(t)||typeof t!="string")return r.status(400).json({msg:"token invalid or expired",status:"failed",code:"01"});let s=await g.findOne({token:t});if(A(s))return r.status(400).json({msg:"token invalid or expired",status:"failed",code:"02"});try{let i=(0,Ce.verify)(t,p.REFRESH_TOKEN_SECRET);delete i.iat,delete i.exp;let a=De(i);return r.status(200).json({msg:"Token Refresh successful",data:{accessToken:a},status:"success"})}catch{return r.status(500).json({msg:"token invalid or expired",status:"exited"})}},Ne=Lt;var re=c(require("crypto-js/aes")),Oe=c(require("crypto-js/sha512")),Me=c(require("crypto-js/core")),T=e=>(0,Oe.default)(e).toString(),C=(e=5)=>(t=>{let s="";for(let i=0;i<=t;i++)s+=Math.floor(Math.random()*10);return s})(e),_=(e,r)=>{try{return re.default.encrypt(JSON.stringify(e),r).toString()}catch{return-1}},B=(e,r)=>{try{let t=re.default.decrypt(e,r);return JSON.parse(t.toString(Me.default.enc.Utf8))}catch{return-1}};require.main,module;var qe={CREDENTIAL_ERROR:"Paste Credentials are incorrrect",CLAIM_TOKEN_INVALID:"Paste claim token is invalid",CLAIM_TOKEN_MISMATCH:"Paste claim token does not match",LATEST_VERSION:"Paste already updated with latest version",PASSWORD_INCORRECT:"Paste Password is incorrect",MAX_ATTEMPTS:"Maximum attempts reached",MAX_VIEW_LIMIT:"Maximum views reached",PASTE_NOT_FOUND:"No pastes found",META_SUCCESS:"Successfully fetched pastes meta",TAG_EXISTS:"Paste tag already taken",TAG_INVALID:"Paste tag is invalid",TAG_AVAILABLE:"Paste tag is available",INVALID_DECRYPTION_KEY:"Invalid decryption key",INVALID_MASTERKEY_SEED:"Invalid masterkey seed",TAB_HASH_MISSING:"Paste tab hash is missing",TAB_SIZE_MISSING:"Paste tab size is missing",TAB_DATA_MISSING:"Paste tab data is missing",TAB_DATA_INVALID:"Paste tab data is invalid type",TAB_DATA_INVALID_SIZE:"Paste tabdata is invalid size",TAB_DATA_INVALID_HASH:"Paste tabhash is invalid hash",TAG_REQUIRED:"Paste tag is required",TITLE_REQUIRED:"Paste title is required",DATA_REQUIRED:"Paste data is required",PRIVACY_REQUIRED:"Paste privacy is required",CATEGORY_REQUIRED:"Paste category is required",EXPIRY_REQUIRED:"Paste expiry is required",MAXVIEWS_REQUIRED:"Paste maxviews is required",ADTYPE_REQUIRED:"Paste adtype is required",MASTERKEY_REQUIRED:"Paste masterkey is required",MASTERKEY_CHECK:"Paste masterkey is invalid or empty",TAG_TYPE:"Paste tag is invalid type",TITLE_TYPE:"Paste title is invalid type",DATA_TYPE:"Paste data is invalid type",DATA_MAP_INVALID:"Paste map is invalid type",DATA_SIZE_MAP_INVALID:"Paste size map is invalid type",HASHES_MAP_INVALID:"Paste hashes map is invalid type",PASTE_TAB_COUNT_INVALID:"Paste tab count is invalid type",PRIVACY_TYPE:"Paste privacy is invalid type",CATEGORY_TYPE:"Paste category is invalid type",EXPIRY_TYPE:"Paste expiry is invalid type",MAXVIEWS_TYPE:"Paste maxviews is invalid type",ADTYPE_TYPE:"Paste adtype is invalid type",MASTERKEY_TYPE:"Paste masterkey is invalid type",TAG_UNDEFINED:"Paste tag is undefined",TITLE_UNDEFINED:"Paste title is undefined",DATA_UNDEFINED:"Paste data is undefined",PRIVACY_UNDEFINED:"Paste privacy is undefined",CATEGORY_UNDEFINED:"Paste category is undefined",EXPIRY_UNDEFINED:"Paste expiry is undefined",MAXVIEWS_UNDEFINED:"Paste maxviews is undefined",ADTYPE_UNDEFINED:"Paste adtype is undefined",MASTERKEY_UNDEFINED:"Paste masterkey is undefined",EXPIRY_RECENTLY_UPDATED:"Paste expiry recently updated",TAG_EXPIRED:"Paste tag is expired",CREATE_SUCCESS:"Paste created successfully",CREATE_FAILED:"Paste creation failed",CREATE_ID_FAILED:"Paste ID creation failed",CREATE_EXITED:"Paste creation exited",READ_SUCCESS:"Paste read successfully",READ_FAILED:"Paste read failed",READ_EXITED:"Paste read exited",UPDATE_SUCCESS:"Paste updated successfully",UPDATE_FAILED:"Paste update failed",UPDATE_EXITED:"Paste update exited",DELETE_FAILED:"Paste deleted failed",DELETE_SUCCESS:"Paste deleted successfully",DELETE_EXITED:"Paste delete exited",CREATE_MAX_SIZE_EXCEEED:"Paste exceed maximum allowed size",SERVER_ERROR:"Server Error",DATABASE_ERROR:"Database Error",PASTE_TAG_UNDEFINED:e=>`Paste tag ${e} is undefined`,PASTE_TAG_DOES_NOT_EXIST:e=>`Paste tag ${e} does not exists`,PASTE_TAG_EXPIRED:e=>`Paste tag ${e} is expired`,PASTE_TAG_OWNER:(e,r)=>`Paste ${e} is not owned by user ${r}`};var o=require("ts-mongoose");var Ue=(a=>(a.general="general",a.coding="coding",a.document="document",a.secret="secret",a.other="other",a))(Ue||{}),Le=(a=>(a.active="active",a.inactive="inactive",a.banned="banned",a.expired="expired",a.deleted="deleted",a))(Le||{}),ze=(s=>(s.public="public",s.private="private",s.unlisted="unlisted",s))(ze||{}),Ye=(s=>(s.low="low",s.medium="medium",s.high="high",s))(Ye||{}),Fe=(y=>(y.text="text",y.javascript="javascript",y.html="html",y.css="css",y.json="json",y.python="python",y.xml="xml",y.sql="sql",y.java="java",y.rust="rust",y.cpp="cpp",y.php="php",y.wast="wast",y.lezer="lezer",y))(Fe||{});function N(e){return Object.keys(e)}var O=N(Ue),$=N(ze),M=N(Ye),q=N(Le),U=N(Fe);var G=["1 minute","5 minutes","15 minutes","30 minutes","45 minutes","1 hour","2 hours","4 hours","8 hours","12 hours","1 day","3 days","1 week","2 weeks","3 weeks","1 month","3 months","6 months","1 year","3 years","5 years","10 years"],zt={"1 minute":6e4,"5 minutes":3e5,"15 minutes":9e5,"30 minutes":18e5,"45 minutes":27e5,"1 hour":36e5,"2 hours":72e5,"4 hours":144e5,"8 hours":288e5,"12 hours":432e5,"1 day":864e5,"3 days":2592e5,"1 week":6048e5,"2 weeks":12096e5,"3 weeks":12096e5,"1 month":2592e6,"3 months":7776e6,"6 months":15552e6,"1 year":31536e6,"3 years":94608e6,"5 years":15768e7,"10 years":31536e7},ae=e=>zt[e]+Date.now();var Yt=(0,o.createSchema)({ca:o.Type.number({required:!0}),au:o.Type.number({required:!0}),uk:o.Type.number({required:!0}),us:o.Type.number({required:!0}),in:o.Type.number({required:!0}),id:o.Type.number({required:!0}),np:o.Type.number({required:!0}),pk:o.Type.number({required:!0}),bd:o.Type.number({required:!0}),fr:o.Type.number({required:!0}),ww:o.Type.number({required:!0})}),Ft={ca:0,au:0,uk:0,us:0,in:0,id:0,np:0,pk:0,bd:0,fr:0,ww:0},Kt=(0,o.createSchema)({_id:o.Type.string({required:!1}),title:o.Type.string({required:!0,default:"Untitled"}),privacy:o.Type.string({required:!1,enum:$,default:"public"}),owner:o.Type.string({required:!0,default:"member"}),category:o.Type.string({enum:O}),data:o.Type.array({required:!0,default:[]}).of(o.Type.string()),size:o.Type.number({required:!0,default:0}),maxviews:o.Type.number({required:!1,default:1e8}),note:o.Type.string({required:!0,default:"add note"}),eseed:o.Type.string({required:!1,default:""}),vseed:o.Type.string({required:!1,default:""}),ect:o.Type.string({required:!1,default:""}),vct:o.Type.string({required:!1,default:""}),language:o.Type.string({required:!1,enum:U,default:"text"}),adtype:o.Type.string({required:!1,enum:M,default:"medium"}),expiry:o.Type.string({required:!1,enum:G,default:"5 years"}),status:o.Type.string({required:!0,enum:q,default:"active"}),createdAt:o.Type.number({required:!0,default:Date.now()}),updateAt:o.Type.number({required:!0,default:Date.now()}),expireAt:o.Type.number({required:!1,default:Date.now()+15768e7}),country:o.Type.object({required:!1,default:Ft}).of(Yt),paidViews:o.Type.number({required:!0,default:0}),uniqueViews:o.Type.number({required:!0,default:0}),totalViews:o.Type.number({required:!0,default:0}),paidEarnings:o.Type.number({required:!0,default:0}),unpaidEarnings:o.Type.number({required:!0,default:0}),reportedCount:o.Type.number({required:!0,default:0}),reportedMap:o.Type.object({required:!1,default:{}}).of(o.Type.string()),version:o.Type.number({required:!0,default:1})}),Vt=(0,o.typedModel)("Paste",Kt),u=Vt;var Ke=c(require("ajv"));var W=new Ke.default,Ve={tag:{type:"string"},title:{type:"string",maxLength:70},privacy:{type:"string",enum:$},status:{type:"string",enum:q},note:{type:"string",maxLength:500},category:{type:"string",enum:O},maxviews:{type:"number"},expiry:{type:"string",enum:G},data:{type:"array"},adtype:{type:"string",enum:M},language:{type:"string",enum:U}},jt={type:"object",nullable:!1,properties:{...Ve,eseed:{type:"string",minLength:64,maxLength:64},vseed:{type:"string",minLength:64,maxLength:64},ect:{type:"string"},vct:{type:"string"}},required:["tag","eseed","vseed","ect","vct"]},Ht={type:"object",properties:{...Ve,password:{type:"string"},masterkey:{type:"string"}}},Xt={type:"object",properties:{tag:{type:"string"},masterkey:{type:"string"},eseed:{type:"string"},password:{type:"string"},updateProps:{type:"object",properties:{title:{type:"string"},category:{type:"string",enum:O},data:{type:"array"},status:{type:"string",enum:q},vseed:{type:"string"},vct:{type:"string"},password:{type:"string"},adtype:{type:"string",enum:M},language:{type:"string",enum:U}}}},required:["tag"]},Bt={type:"object",properties:{tag:{type:"string"},eseed:{type:"string"},masterkey:{type:"string"}},required:["tag","eseed"]},Ea=W.compile(jt),L=W.compile(Ht),se=W.compile(Xt),ie=W.compile(Bt);var oe=c(require("qqid")),He=c(require("mongoose"));var x=require("ts-mongoose"),$t=new Date().toISOString().slice(0,10),Gt=(0,x.createSchema)({[$t]:x.Type.number({required:!0,default:0})},{_id:!1}),Wt=(0,x.createSchema)({_id:x.Type.objectId({auto:!0}),service:x.Type.string({required:!0,enum:["paste","file"]}),views:x.Type.object({required:!0}).of(Gt),counter:x.Type.number({required:!0,default:0})}),Jt=(0,x.typedModel)("counter",Wt),ne=Jt;var Xe=c(require("base62"));function Qt(){let e=t=>t.map(s=>s.length/1024).reduce((s,i)=>s+i,0);return{arraySizeKB:e,arraySizeMB:t=>e(t)/1024}}var Zt=Qt(),je=Zt;var er=async e=>await ne.updateOne({server:"paste"},{$inc:{counter:1}},{session:e}),tr=async(e,r)=>{let t=e.body,s=Date.now(),i,a=t.tools,l=await He.default.startSession();try{let m={_id:t.tag||(0,oe.default)(),title:t.title,privacy:t.privacy,owner:e.locals.owner,category:"general",maxviews:t.maxviews,note:t.note||"add note",adtype:"medium",expiry:"5 years",status:"active",paidViews:0,uniqueViews:0,totalViews:0,viewsMap:{},paidEarnings:0,unpaidEarnings:0,reportedCount:0,language:t?.tools?.language||"text",createdAt:s,expireAt:ae(t.expiry)||ae("5 years"),updateAt:s,burnByUnique:t.options?.burnByUnique||!0,version:1,tools:a};if(await u.exists({_id:m._id}))return r.status(400).send({msg:`Tag (${t.tag}) already in use`,status:"failed"});if(e.locals.checks.testkey){let f;try{if(f=L(t),!f)return r.status(400).send({msg:"invalid schema",errors:k(L.errors)})}catch{return r.status(400).send({msg:"invalid schema"})}let E=C(64),z=C(64),le=T(t.password||"123"),y=T(t.masterkey||"1234"),pe=_(z,le),ce=_(E,y),J=[];t.privacy==="public"&&(E="",z="",ce="",pe="");let tt=t.data?.map(S=>S.length/1024)?.reduce((S,rt)=>S+rt,0);t.privacy==="private"?J=t.data?.map(S=>_(S,le)):J=t.data,i=new u({...m,data:J,size:tt,eseed:E,vseed:z,ect:ce,vct:pe},{_id:!1})}else{try{L(t)||r.status(400).send({msg:"invalid schema",errors:k(L.errors)})}catch{return r.status(400).send({msg:"invalid schema"})}let f={...m,size:je.arraySizeKB(t.data||[]),eseed:t.eseed,vseed:t.vseed,ect:t.ect,vct:t.vct,data:t.data};i=new u(f)}let n=await ne.findOne({service:"paste"},{_id:!1});if(!n)return r.status(400).send({msg:"error saving paste"});if(!t.tag){let f=n.counter||0;i._id=Xe.default.encode(f+1)||(0,oe.default)()}return await l.withTransaction(async()=>await Promise.all([i.save({session:l}),er(l)])),await l.endSession(),r.status(200).send({msg:qe.CREATE_SUCCESS,status:"success",data:{tag:i._id}})}catch(m){await l.endSession(),r.status(500).send({msg:"error saving paste",error:m})}},Be=tr;var rr=async(e,r)=>{let t=e.query,s=e.body,i=s?.tag||t?.tag,a=s?.password||t?.password;try{if(!i)return r.status(400).send({msg:"Bad Request",status:"failed"});let l=await u.findOne({_id:i,status:"active"},{_id:1,title:1,privacy:1,owner:1,category:1,eseed:1,vseed:1,ect:1,vct:1,language:1}).lean();if(!l)return r.status(404).send({msg:"Not Found",status:"failed"});if(l.privacy==="public"){let n=await u.findOne({_id:i}),f=v({vseed:n.vseed,eseed:n.eseed});return n.vseed=void 0,n.eseed=void 0,r.status(200).send({msg:"paste found",status:"success",data:n,dev:f})}if(a){let n=await u.findOne({_id:i}),f=v({vseed:n.vseed,eseed:n.eseed}),E=T(a);if(B(n.vct,E)===n.vseed)return n.vseed=void 0,n.eseed=void 0,r.status(200).send({msg:"paste found",status:"success",data:n,dev:f})}let m=t?.vseed;if(m&&!a){let n=await u.findOne({_id:i,vseed:m});if(n?.vseed===m){let f=v({vseed:n.vseed,eseed:n.eseed});return n.vseed=void 0,n.eseed=void 0,r.status(200).send({msg:"paste found",status:"success",data:n,dev:f})}}let h=v({vseed:l.vseed,eseed:l.eseed});return l.eseed=void 0,l.vseed=void 0,r.status(403).send({msg:"paste found but not authorized",status:"failed",meta:l,dev:h})}catch{return r.status(500).send({msg:"Internal Server Error",status:"failed"})}},$e=rr;var ar=async(e,r)=>{let t=e.body,s=e.query,i=t?.tag||s?.tag;if(t.data?.length>.35*1024*1024)return r.status(400).send({message:"Request body too large",status:"error"});try{if(!se(t))return r.status(400).send({msg:"invalid schema",errors:k(se.errors)})}catch{return r.status(400).send({msg:"invalid schema"})}if(!await u.exists({_id:i}))return r.status(400).send({msg:"paste does not exist to update"});let a=await u.findById({_id:i,status:{$in:["active","inactive"]}});if(!a)return r.status(400).send({msg:"paste does not exist to update"});if(e.locals.checks.testkey){if(t.eseed!==a.eseed)return r.status(400).send({msg:"eseed does not match"});let l=C(64),m=T(t.password||"123"),h=_(l,m).toString(),n=[];if(t.updateProps.data){for(let f=0;f<t.updateProps.data.length;f++){let E=_(t.updateProps.data[f],m);n.push(E)}a.size=t.updateProps.data.length}return a.data=n,a.title=t.updateProps.title,a.vseed=l,a.vct=h,a.language=t.updateProps?.language||a.language||"text",await a.save(),r.status(200).send({msg:"paste updated"})}else return t.eseed&&t.updateProps.vseed&&t.updateProps.vct?a.eseed!==t.eseed?r.status(400).send({msg:"invalid eseed"}):(a.title=t.updateProps?.title||a.title||"",a.category=t.updateProps?.category||a.category,a.status==="active"&&t.updateProps?.status==="inactive"?a.status="inactive":a.status==="inactive"&&t.updateProps?.status==="active"&&(a.status="active"),a.data=t.updateProps?.data||a.data,a.adtype=t.updateProps?.adtype||"medium",a.vct=t.updateProps?.vct||a.vct,a.vseed=t.updateProps?.vseed||a.vseed,a.language=t.updateProps?.language||a.language||"text",await a.save(),r.status(200).send({msg:"paste updated"})):r.status(400).send({msg:"eseed, vseed and vct are required"})},Ge=ar;var sr=async(e,r)=>{let t=e.body,s=t.tag,i=t.eseed;try{if(!ie(t))return r.status(400).send({msg:"invalid schema",errors:k(ie.errors)})}catch{return r.status(400).send({msg:"invalid schema"})}if(e.locals.checks.testkey){let a=await u.findById({_id:s,status:{$in:["active","inactive"]}},{_id:0,eseed:1,ect:1});if(!a)return r.status(400).send({msg:"no active or inactive paste found"});let l=a.ect||"";return B(l,t.masterkey)!==a.eseed?r.status(400).send({msg:"incorrect masterkey"}):(await u.deleteOne({_id:s})).deletedCount===0?r.status(400).send({msg:"no active or inactive paste found"}):r.status(200).send({msg:"paste deleted"})}else return i!==t.eseed?r.status(400).send({msg:"incorrect eseed"}):(await u.deleteOne({_id:s})).deletedCount===0?r.status(400).send({msg:"no active or inactive paste found"}):r.status(200).send({msg:"paste deleted"})},We=sr;var w=(0,de.default)();w.use(de.default.json({limit:"0.5mb"}));w.use((0,et.default)({origin:"*"}));w.use(async(e,r,t)=>{let s=e.body,i=e.headers["x-test-key"]||"",a=(0,Ze.default)(i).toString()===p.X_TEST_KEY;return e.locals={hash:s?.options?.hash===!0,compress:s?.options?.compress===!0,encrypt:s?.options?.encrypt===!0,decrypt:s?.options?.decrypt===!0,owner:"default",role:"member",user:{},checks:{testkey:a},headers:{testkey:i}},t()});w.post("/auth/register",Te);w.post("/auth/mailverify",Se);w.post("/auth/login",Ie);w.post("/auth/reset",Pe);w.post("/auth/renewtoken",Ne);w.post("/paste",P,Be);w.get("/paste",P,$e);w.patch("/paste",P,Ge);w.delete("/paste",P,We);w.get("/paste/tagcheck",async(e,r)=>{let t=e.query.tag;if(!t)return r.status(400).send({msg:"tag is required",status:"failed"});if(t.length>20)return r.status(400).send({msg:"tag is too long",status:"failed"});try{return await u.exists({_id:t})?r.status(200).send({msg:"tag is not available",available:!1}):r.status(200).send({msg:"tag is available",available:!0})}catch(s){return r.status(500).send({error:s.message,msg:"internal server error"})}});w.use((e,r)=>r.status(404).send({msg:"no route found"}));var Je;async function ir(e){Je||(Je=await Qe.default.connect(e,{serverSelectionTimeoutMS:5e3,retryWrites:!0}))}w.listen(process.env.PORT||2e3,async()=>{console.log("db url -->",p.DB_URL),await ir(p.DB_URL),console.log({msg:"paste api is live",status:"success"})});
