// Select DOM elements
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-btn');
const messagesContainer = document.getElementById('messages-container');

// Create WebSocket connection to the server (replace with your server's URL)
const socket = new WebSocket('ws://your-websocket-server-url');

// Listen for messages from the server
socket.addEventListener('message', (event) => {
    const message = event.data;
    displayMessage(message, 'bot');
});

// Send message to WebSocket server when button is clicked
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.send(message); // Send to the WebSocket server
        displayMessage(message, 'user'); // Display message on the client side
        messageInput.value = ''; // Clear input field
        messageInput.focus();
    }
});

// Display message on the UI
function displayMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender);
    messageDiv.textContent = message;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the latest message
}

// Optional: Send message when 'Enter' key is pressed
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
