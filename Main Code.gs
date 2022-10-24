function main()
{
   for(var i=2;i<=5;i++){
getdata(i);
//return i;
   }

}

function getdata(i)
{
 //   var i=2;
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Abhay mail");
  var obj={};
  
  obj.fname = ss.getRange(i,1).getValue();
  obj.lname = ss.getRange(i,2).getValue();
  obj.emoji = ss.getRange(i,3).getValue();
  obj.dob = ss.getRange(i,4).getValue();
  obj.anv = ss.getRange(i,5).getValue() || "";
  obj.email = ss.getRange(i,7).getValue();
  obj.sflag = ss.getRange(i,8).getValue();
  obj.greet = ss.getRange(i,9).getValue();
  obj.msg = ss.getRange(i,10).getValue() || "";
  obj.img = ss.getRange(i,13).getValue();
  
 //  Logger.log(obj);
  goomail(obj);
  return obj;
}




function inlineImage() {
  
  var googleLogoUrl = "https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_74x24dp.png";
  var youtubeLogoUrl = "https://developers.google.com/youtube/images/YouTube_logo_standard_white.png";
  var googleLogoBlob = UrlFetchApp
                         .fetch(googleLogoUrl)
                         .getBlob()
                         .setName("googleLogoBlob");
  var youtubeLogoBlob = UrlFetchApp
                          .fetch(youtubeLogoUrl)
                          .getBlob()
                          .setName("youtubeLogoBlob");
 
 
}

function goomail(obj){
  //obj=getdata();
  Logger.log(obj);
  
  if(obj.sflag==0){
    return;
  }

var bbody = mailbody();
bbody= bbody.replace("{fname}",obj.fname)
  .replace("{lname}",obj.lname)
  .replace("{dob}",obj.dob)
  .replace("{greet}",obj.greet)
  .replace("{msg}",obj.msg)
  .replace("{img}",obj.img);

var date=obj.dob;
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var dd=  date.getDate()+'-'+ months[date.getMonth()]+'-'+ date.getFullYear();

MailApp.sendEmail({
    to: obj.email,
    bcc:"email@gmail.com",
    subject: "Happy Birthday "+obj.fname+obj.emoji+" on " + dd +"🎉🎉" ,
    htmlBody: bbody,
  });
  
  //////log all
  obj.status="Done";
  log(obj);
}
function log(obj){
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("log");
  ss.appendRow([new Date(),obj.fname,obj.email,obj.event_type,obj.greet,obj.msg,obj.img,obj.status]);
  //Logger.log(obj);
  //sendMail(obj);
}


