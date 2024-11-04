// Menghasilkan ID unik untuk pengguna
let userId = localStorage.getItem('userId');
if (!userId) {
    userId = 'user-' + Date.now(); // ID unik berdasarkan timestamp
    localStorage.setItem('userId', userId);
}

// Menampilkan kontainer pesan
document.getElementById('messageContainer').classList.add('active');

function sendMessage() {
    const messageInput = document.getElementById("message");
    const messageText = messageInput.value.trim();
    if (messageText) {
        const messages = JSON.parse(localStorage.getItem('messages')) || {};
        if (!messages[userId]) {
            messages[userId] = [];
        }
        messages[userId].push(messageText);
        localStorage.setItem('messages', JSON.stringify(messages));
        messageInput.value = ""; // Kosongkan textarea setelah mengirim
        loadMessages();
    } else {
        alert("Harap tulis pesan terlebih dahulu!");
    }
}

function loadMessages() {
    const messagesContainer = document.getElementById("messages");
    messagesContainer.innerHTML = ""; // Kosongkan isi sebelumnya
    const messages = JSON.parse(localStorage.getItem('messages')) || {};
    if (messages[userId]) {
        messages[userId].forEach(message => {
            const messageDiv = document.createElement("div");
            messageDiv.className = "message";
            messageDiv.textContent = message;
            messagesContainer.appendChild(messageDiv);
        });
    }
}

function generateLink() {
    const link = window.location.href + "?userId=" + userId;
    alert("Bagikan link ini kepada orang-orang untuk mengirim pesan: " + link);
}

// Memeriksa apakah ada parameter userId di URL
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('userId')) {
    userId = urlParams.get('userId');
    loadMessages();
}