const socket = io('http://localhost:3000')

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

socket.on('chat-message', data =>{
    AppendMessage(`${data.name}: ${data.message}`);
})


const name = prompt("What is your name? ");
AppendMessage("You joined");

socket.emit("New-User", name);

messageForm.addEventListener('submit', e=>{
    e.preventDefault()
    const message = messageInput.value
    AppendMessage(`You ${message}`);
    socket.emit('send-chatmessage', message)
    messageInput.value = '';
})


function AppendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}

socket.on('user-connect', name =>{
    AppendMessage(`${name} has connected`);
})

socket.on('user-disconnect', name => {
    AppendMessage(`${name} has disconnected`);
})