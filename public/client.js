var host = location.origin.replace(/^http/, 'ws');
const socket = io();

let message = document.querySelector("input.textBox");
let btn = document.querySelector("button.sendButton");
let chatBoxList = document.querySelector("ul.chatBoxList");

let user = document.getElementById("userName").innerText;

btn.onclick = function(){
    socket.emit("chat",user+": "+message.value);
    message.value = "";
};

socket.on("chat", text => {
    console.log(text);
    var item = document.createElement('li');
    item.textContent = text;
    chatBoxList.appendChild(item);

    //Force scrollbar to reset at the bottom
    chatBoxList.scrollTop = chatBoxList.scrollHeight
});



//Prevent Enter key from submit

// Execute a function when the user presses a key on the keyboard
message.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    btn.click();
  }
});