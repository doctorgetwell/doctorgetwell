let url = window.location.href; 
  if (url.slice(-1) != 'e'){ 
      url += '?q=acupuncture site:www.healthcmi.com/acupuncture-continuing-education-news OR site:acupuncturetoday.com/issues/current-issue'
      window.location.href = url;
  }    
  setTimeout(() => {
    if (url.slice(-1) != 'e'){ 
      url += '?q=acupuncture site:www.healthcmi.com/acupuncture-continuing-education-news OR site:acupuncturetoday.com/issues/current-issue'
      window.location.href = url;
    } else {
      document.getElementById("loading").style.display = "none"
    }
    var now = new Date();
    var datetime = now.toLocaleString();
    document.getElementById("digesttoday").innerHTML += "ㅤ(" + datetime.slice(0, -3)  + ")";
    // clock 

    
  }, 500)

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCUhZStuBYBoYzinB9P1Q1idE8Dg7WSj20",
    authDomain: "doctorgetwell-application.firebaseapp.com",
    databaseURL: "https://doctorgetwell-application-default-rtdb.firebaseio.com/",
    projectId: "doctorgetwell-application",
    storageBucket: "doctorgetwell-application.appspot.com",
    messagingSenderId: "212734359035",
    appId: "1:212734359035:web:7b34470e7ecb1048dd475e",
    measurementId: "G-2QJ05NHPM6"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database=firebase.database();

function sendMessage() {
    var email = document.getElementById("email_main").value; 
    var name = document.getElementById("name_main").value; 
    var message = document.getElementById("message_main").value; 

    var newMessagekey = database.ref().child('comments').push().key;
    
    database.ref('comments/' + newMessagekey + '/Email').set(email);
    database.ref('comments/' + newMessagekey + '/Name').set(name);
    database.ref('comments/' + newMessagekey + '/message').set(message);

    window.alert("Message sent! We thank you for your comment!");

    setInterval(() => {
      location.reload();
    }, 1000)
}

function sendReply(k) {
  var email = document.getElementById("email_" + k).value; 
  var name = document.getElementById("name_" + k).value; 
  var message = document.getElementById("message_" + k).value; 

  var newMessagekey = database.ref('comments/' + k).child('Replies').push().key;

  database.ref('comments/' + k + '/Replies/' + newMessagekey + '/Email').set(email);
  database.ref('comments/' + k + '/Replies/' + newMessagekey + '/Name').set(name);
  database.ref('comments/' + k + '/Replies/' + newMessagekey + '/message').set(message);

  window.alert("Message sent! We thank you for your comment!");

  setInterval(() => {
    location.reload();
  }, 1000)
}

function comment_display(k) {
  document.getElementById("contactForm_" + k).style.display = "block"
  document.getElementById("display_" + k).style.display = "none"
}

function block_display(num) {
  document.getElementById("block" + num.toString()).style.display = "block"
  document.getElementById("display" + num.toString()).style.display = "none"
}

firebase.database().ref("comments").on("value", (data) => {
    var ourData = data.val()
    
    console.log(ourData);

    var keys = Object.keys(ourData);

    let list = document.getElementById("list");

    for (const k of keys) {
        let Email = ourData[k].Email
        let Name = ourData[k].Name
        let message = ourData[k].message

        let li = document.createElement("li");

        let span = document.createElement("span");
        span.style = "border-top: -1em;"

        span.innerHTML 
        =  "Comment from " +  Name + "  -  (" + Email + ")"
        span.className = "comment-info"

        li.appendChild(span);

        let msg_info = document.createElement("span");

        msg_info.innerHTML 
        =  message
        msg_info.className = "text-info"

        li.appendChild(msg_info);

        // *** Add replies *** //

        let replies = document.createElement("ul");

        if (ourData[k].Replies != undefined) {
          for (const r of Object.keys(ourData[k].Replies)) {
            let reply = document.createElement("li");
  
            let Email = ourData[k].Replies[r].Email
            let Name = ourData[k].Replies[r].Name
            let message = ourData[k].Replies[r].message
  
            let li = document.createElement("li");
  
            let span = document.createElement("span");
            span.style = "border-top: -1em;"
  
            span.innerHTML 
            =  "Comment from " +  Name + "  -  (" + Email + ")"
            span.className = "comment-info"
  
            reply.appendChild(span);
  
            let msg_info = document.createElement("span");
  
            msg_info.innerHTML 
            =  message
            msg_info.className = "text-info"
  
            reply.appendChild(msg_info);
  
            replies.appendChild(reply);
          }
        }

        li.appendChild(replies);

        // *** Add reply un-hide button *** 

        let btn = document.createElement("button");
        btn.id = "display_" + k
        btn.className = "w3-margin"
        btn.onclick = function(){comment_display(k)};
        btn.innerHTML = "Reply"
        btn.style = "background-color: #e7e184; box-shadow: 0 0 30px #b9984d inset; color: #07543e;"
        li.appendChild(btn);

        li.appendChild(document.createElement("br"));

        // *** Add reply function *** //
        let form = document.createElement("form");
        form.id = "contactForm_" + k
        form.style.display = "none"
        form.onsubmit = function(){sendReply(k)};
        
        let fieldset = document.createElement("fieldset");
        form.appendChild(fieldset);

        let legend = document.createElement("legend");
        legend.innerHTML = "Reply"
        legend.style="color: #005f19;"
        fieldset.appendChild(legend);

        //email

        let span_email = document.createElement("span");
        span_email.innerHTML = "Email: "
        fieldset.appendChild(span_email);

        let input_email = document.createElement("input");
        input_email.id = "email_" + k
        input_email.required = true 
        input_email.type = "email"
        fieldset.appendChild(input_email);

        fieldset.appendChild(document.createElement("br"));

        //name 

        let span_name = document.createElement("span");
        span_name.innerHTML = "Name: "
        fieldset.appendChild(span_name);

        let input_name = document.createElement("input");
        input_name.id = "name_" + k
        input_name.required = true 
        input_name.type = "text"
        fieldset.appendChild(input_name);

        fieldset.appendChild(document.createElement("br"));

        fieldset.appendChild(document.createElement("br"));

        //text message
        let span_message = document.createElement("span");
        span_message.innerHTML = "Enter your reply: "
        fieldset.appendChild(span_message);

        fieldset.appendChild(document.createElement("br"));

        let textarea = document.createElement("textarea");
        textarea.required = true
        textarea.rows = 1
        textarea.style.width = "100%"
        textarea.id = "message_" + k
        fieldset.appendChild(textarea);

        fieldset.appendChild(document.createElement("br"));

        //

        //

        //*** submit button ***//

        let submit_button = document.createElement("button");
        submit_button.type= "submit"
        submit_button.innerHTML= "Submit"
        submit_button.style = "background-color: #f1f74b; box-shadow: 0 0 30px #b9984d inset; color: #005f19;"
        fieldset.appendChild(submit_button);

        li.appendChild(form);

        //add li
        list.appendChild(li);
    }
})