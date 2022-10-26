function main()
{
   for(var i=2;i<=32;i++){
 var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Abhay mail");
 var obj={}
 obj.sflag = ss.getRange(i,10).getValue();
      if(obj.sflag==0){
    return;
  }
  else
  {
getdata(i);
  }
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
  obj.hii = ss.getRange(i,3).getValue();
  obj.greet_name = ss.getRange(i,4).getValue();
  obj.emoji = ss.getRange(i,5).getValue();
  obj.dob = ss.getRange(i,6).getValue();
  obj.anv = ss.getRange(i,7).getValue() || "";
  obj.email = ss.getRange(i,9).getValue();
  obj.sflag = ss.getRange(i,10).getValue();
  obj.greet = ss.getRange(i,11).getValue();
  obj.msg = ss.getRange(i,12).getValue() || "";
  obj.event_type = ss.getRange(i,13).getValue();
  obj.img = ss.getRange(i,15).getValue();
    if(obj.event_type=="Anniversary"){
    obj.edate=obj.anv;
      }
      else{
    obj.edate=obj.dob;
      }

   let tdate= new Date();
   obj.tage = tdate.getFullYear() - obj.edate.getFullYear();
    let x =obj.tage
    var y = x % 10,
        z = x % 100;
    if (y == 1 && z != 11) {
        obj.tage= x + "st";
    }
    else if (y == 2 && z != 12) {
        obj.tage= i + "nd";
    }
    else if (y == 3 && z != 13) {
        obj.tage= x + "rd";
    }else
    obj.tage= z + "th";

//  Logger.log(obj.tage);
   
   goomail(obj);
  return obj;

}



function goomail(obj){
  //obj=getdata();
  Logger.log(obj);
  
  if(obj.sflag==0){
    return;
  }

var bbody = mailbody();
bbody= bbody.replace("{greet_name}",obj.greet_name)
  .replace("{hii}",obj.hii)
  .replace("{edate}",obj.edate)
  .replace("{greet}",obj.greet)
  .replace("{msg}",obj.msg)
  .replace("{img}",obj.img)
  .replace("{event_type}",obj.event_type)
  .replace("{tage}",obj.tage);


const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var date=obj.edate;
let tdate= new Date();
var dd=  date.getDate()+'-'+ months[date.getMonth()]+'-'+ tdate.getFullYear();

MailApp.sendEmail({
    to: obj.email,
    bcc:"email@gmail.com",
    subject: "Happy "+obj.event_type+" "+obj.fname+obj.emoji+" on " + dd +"🎉🎉" ,
    htmlBody: bbody,
     
  });
  
  //////log all
  obj.status="Done";
  log(obj);
}


function mailbody() {
  var htmlTemplate = HtmlService.createTemplateFromFile("mail body.html");
  var htmlBody = htmlTemplate.evaluate().getContent();
   return htmlBody;
}


function log(obj){
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("log");
  ss.appendRow([new Date(),obj.fname,obj.email,obj.event_type,obj.greet,obj.msg,obj.img,obj.status]);
  //Logger.log(obj);
  //sendMail(obj);
}


