const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');
const sendButton = document.getElementById('send-button');
const suggestions = document.getElementById('suggestions');
const clientId = document.body.dataset.clientId;
const history = [];
document.getElementById('year').textContent = new Date().getFullYear();

function addMessage(text, role) {
  const row = document.createElement('div');
  row.className = `message ${role}`;
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;
  row.appendChild(bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

async function sendMessage(text) {
  const message = text.trim();
  if (!message || sendButton.disabled) return;
  addMessage(message, 'user');
  history.push({role: 'user', content: message});
  input.value = '';
  sendButton.disabled = true;
  try {
    const response = await fetch(`/api/${encodeURIComponent(clientId)}/chat`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({message, history: history.slice(-8, -1)})
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Request failed');
    addMessage(data.reply, 'bot');
    history.push({role: 'assistant', content: data.reply});
  } catch (error) {
    addMessage(error.message || 'Sorry, I could not connect just now. Please try again.', 'bot');
  } finally {
    sendButton.disabled = false;
    input.focus();
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  sendMessage(input.value);
});

fetch(`/api/${encodeURIComponent(clientId)}/config`)
  .then(response => response.json())
  .then(config => {
    document.getElementById('chat-title').textContent = `${config.name} Assistant`;
    suggestions.innerHTML = '';
    (config.suggestions || []).forEach(question => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'suggestion';
      button.textContent = question;
      button.addEventListener('click', () => sendMessage(question));
      suggestions.appendChild(button);
    });
  })
  .catch(() => {});
