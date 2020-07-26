const messageInput = document.querySelector("#user-input");
const conversationElem = document.querySelector("#conversation-container");

// focus the input on load
const handleFocus = () => {
  messageInput.focus();
};

// updateConversation expects an object with 'user' and 'text'
const updateConversation = (message) => {
  console.log(message);
  //what i have { status: 200, message:'hi'}
  // what i want {text:'hi'}
  //const { author, text } = message;
  const author = message.author;
  const text = message.text;
  const messageElem = document.createElement("p");

  messageElem.classList.add("message", author);
  messageElem.innerHTML = `<span>${text}</span>`;
  conversationElem.appendChild(messageElem);
  conversationElem.scrollTop = conversationElem.scrollHeight;

  if (author === "user") messageInput.value = "";
  handleFocus();
};

const sendMessage = (event) => {
  event.preventDefault();

  const message = { author: "user", text: messageInput.value };
  updateConversation(message);

  fetch("/monkey-message")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // data = { status: 200, message:'hi'}
      updateConversation(data.message);
    });
};

// call handleFocus on load
handleFocus();
