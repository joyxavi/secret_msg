
const q=id=>document.getElementById(id);


/* Toggle view */

if(location.hash){

q("create").style.display="none";

q("read").style.display="block";

}


/* Create Link */

function createLink(){

const msg=q("message").value;

const pass=q("password").value || "default";

const expiry=q("expiry").value;

const self=q("selfdestruct").checked;


const encrypted=

CryptoJS.AES.encrypt(msg,pass).toString();


const obj={

message:encrypted,

expiry:expiry ? Date.now()+expiry*60000 : null,

selfdestruct:self

};


const link=

location.href.split("#")[0]

+"#"+

btoa(JSON.stringify(obj));


q("result").innerHTML=

`Link:<br>${link}

<br><br>

<button class="btn" onclick="copyLink('${link}')">

Copy Link

</button>

<button class="btn" onclick="shareWA('${link}')">

Share WhatsApp

</button>`;

}


/* Decode */

function decode(){

const data=

JSON.parse(

atob(location.hash.slice(1))

);


if(data.expiry && Date.now()>data.expiry){

q("output").innerHTML="⏳ Message expired";

return;

}


const pass=

q("enterPassword").value || "default";


try{

const bytes=

CryptoJS.AES.decrypt(data.message,pass);

const msg=

bytes.toString(CryptoJS.enc.Utf8);


if(!msg){

throw "error";

}


q("output").innerHTML="✅ "+msg;


if(data.selfdestruct){

location.hash="";

}


}

catch{

q("output").innerHTML="❌ Wrong Password";

}

}


/* Copy */

function copyLink(text){

navigator.clipboard.writeText(text);

alert("Link Copied!");

}


/* WhatsApp */

function shareWA(url){

window.open(

"https://wa.me/?text="+encodeURIComponent(url)

);

}

