// Function to make an API call to Gemini's chatbot (replace with actual endpoint)
async function getChatbotResponse(userMessage) {
    try {
        // Replace this URL with the actual Gemini API endpoint
        const response = await fetch('https://api.gemini.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer AIzaSyCALd9ecvYoC_escAyiqN1-RXLgU3tH7XA' // Replace YOUR_API_KEY with your actual Gemini API key
            },
            body: JSON.stringify({ message: userMessage })
        });

        // Parse the response
        const data = await response.json();

        // Assuming the response structure has a "reply" field
        return data.reply; // Adjust this based on the actual structure of the Gemini response
    } catch (error) {
        console.error('Error fetching chatbot response:', error);
        return "Sorry, I couldn't understand that.";
    }
}

// Simulating AI response for now (for testing purposes)
function simulateChatbotResponse(userMessage) {
    const responses = [
        "Hello! How can I help you today?",
        "I can answer questions or just chat with you.",
        "Sure, let me think about that for a second...",
        "I'm here to assist you with anything you need.",
        "That's an interesting question!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Function to handle sending a message
function sendMessage() {
    const userMessage = document.getElementById('user-input').value.trim();
    if (userMessage === '') return;

    // Display user message in a bubble
    displayMessage(userMessage, 'user');

    // Clear the input field
    document.getElementById('user-input').value = '';

    // Use the Gemini API to get a response
    getChatbotResponse(userMessage)
        .then(botResponse => {
            // Display bot response in a bubble
            displayMessage(botResponse, 'bot');
        })
        .catch(err => {
            console.error(err);
            // If there is an error, use the fallback simulated response
            const botResponse = simulateChatbotResponse(userMessage);
            displayMessage(botResponse, 'bot');
        });
}

// Function to display messages in the chat window
function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');

    // Create a new message div
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message-bubble');

    if (sender === 'user') {
        messageDiv.classList.add('user-message');
    } else {
        messageDiv.classList.add('bot-message');
    }

    messageDiv.textContent = message;

    // Append the message to the chat box
    chatBox.appendChild(messageDiv);

    // Scroll to the bottom to show the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Listen for the Enter key press to trigger sending the message
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default behavior (like form submission)
        sendMessage(); // Send the message when Enter is pressed
    }
});
