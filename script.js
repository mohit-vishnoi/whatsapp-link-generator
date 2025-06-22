const alertMessage = document.getElementById("alertMessage");
const country = document.getElementById("country");
const number = document.getElementById("number");
const waMessage = document.getElementById("waMessage");
const generateBtn = document.getElementById("generateBtn");
const linkInfo = document.getElementById("linkInfo");
const waLink = document.getElementById("waLink");
const copyBtn = document.getElementById("copyBtn");
const shareBtn = document.getElementById("shareBtn");
const openBtn = document.getElementById("openBtn");
const newLinkBtn = document.getElementById("newLinkBtn");
const liveAnnouncement = document.getElementById("liveAnnouncement");

let link = "";

generateBtn.addEventListener("click", generateLink);
copyBtn.addEventListener("click", copyLink);
shareBtn.addEventListener("click", shareLink);
openBtn.addEventListener("click", openLink);
newLinkBtn.addEventListener("click", () => {
    linkInfo.close();
    announce("Dialog closed. Ready to generate new link.");
});

function generateLink() {
    const countryCode = country.value.trim();
    const waNumber = number.value.trim();
    const messageInput = waMessage.value.trim();
    
    if (!countryCode || !waNumber) {
        alertText("Please enter both country code and phone number");
        return;
    }
    
    if (countryCode.length > 3) {
        alertText("Country code should be 1-3 digits long");
        return;
    }
    
    if (waNumber.length !== 10) {
        alertText("Phone number should be 10 digits long");
        return;
    }
    
    link = `https://wa.me/${countryCode + waNumber}`;
    
    if (messageInput) {
        const encodedMessage = encodeURIComponent(messageInput);
        link += `?text=${encodedMessage}`;
    }
    
    showLinkInfo();
    waLink.textContent = link;
    announce("Link generated successfully. Use the buttons below to copy, share, or open the link.");
}

function alertText(message) {
    alertMessage.style.display = "block";
    alertMessage.textContent = message;
    setTimeout(() => {
        alertMessage.style.display = "none";
        alertMessage.textContent = "";
    }, 3000);
    announce(message);
}

function showLinkInfo() {
    linkInfo.show();
    linkInfo.setAttribute('aria-modal', 'true');
    linkInfo.setAttribute('role', 'dialog');
}

function copyLink() {
    navigator.clipboard.writeText(link)
        .then(() => {
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';
            announce("Link copied to clipboard");
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
            }, 2000);
        })
        .catch(err => {
            alertText("Failed to copy link");
            console.error('Failed to copy: ', err);
        });
}

function shareLink() {
    if (navigator.share) {
        navigator.share({
            title: 'WhatsApp Chat Link',
            text: 'Chat with me on WhatsApp',
            url: link
        })
        .then(() => announce("Link shared successfully"))
        .catch(err => {
            alertText("Sharing cancelled");
            console.error('Error sharing: ', err);
        });
    } else {
        copyLink();
        announce("Link copied to clipboard. Your browser doesn't support direct sharing.");
    }
}

function openLink() {
    window.open(link, '_blank');
    announce("Opening WhatsApp in a new tab");
}

function announce(message) {
    liveAnnouncement.textContent = message;
    setTimeout(() => {
        liveAnnouncement.textContent = '';
    }, 1000);
}Enter file contents here
