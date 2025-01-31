const userInput = document.getElementById("userInput");
const messagesContainer = document.getElementById("messages");
const spinner = document.getElementById("spinner");

let conversationHistory = [];

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === "") return;

    createMessageElement(userMessage, "user");
    userInput.value = "";

    conversationHistory.push({ role: "user", content: userMessage });

    spinner.style.display = "block";

    let botMessage = await handleMessage(userMessage);

    conversationHistory.push({ role: "bot", content: botMessage });
    createMessageElement(botMessage, "bot");

    spinner.style.display = "none";
}

async function handleMessage(userMessage) {
    // Check if the user input is a math question
    if (isMathQuestion(userMessage)) {
        return calculateMath(userMessage);
    }

    // For other cases, use the Hugging Face API to get a response
    return getAiResponse(userMessage);
}

function isMathQuestion(message) {
    // Check if the message contains a simple math operation
    const mathPattern = /[0-9]+[\+\-\*\/][0-9]+/; // Detects simple math like 2+2, 5*3, etc.
    return mathPattern.test(message);
}

function calculateMath(message) {
    try {
        // Evaluate the math expression using JavaScript's eval
        const result = eval(message);
        return `The answer is: ${result}`;
    } catch (error) {
        return "Sorry, I couldn't understand the math question. Please try again.";
    }
}

async function getAiResponse(userMessage) {
    const requestBody = {
        inputs: userMessage,
    };

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/EleutherAI/gpt-neox-20b", {
            method: "POST",
            headers: {
                Authorization: `Bearer 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`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            const responseData = await response.json();
            if (responseData && responseData.length > 0) {
                const generatedText = responseData[0].generated_text;
                return generatedText || "I'm not sure how to respond to that.";
            }
        } else {
            throw new Error("Error in response");
        }
    } catch (error) {
        return "Oops! Something went wrong. Please try again. 😓";
    }
}

function createMessageElement(text, type) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", `${type}-message`);

    const avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.src = type === "user" ? "red4.jpg" : "EduPulse.png";

    const messageText = document.createElement("p");
    messageText.textContent = text;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageText);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});