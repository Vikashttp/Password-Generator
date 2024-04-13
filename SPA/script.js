let inputSlider = document.getElementById("inputSlider");
let sliderValue = document.getElementById("sliderValue");
let passBox = document.getElementById("passBox");
let pattern = document.getElementById("pattern");
let genPatternBtn = document.getElementById("genPatternBtn");
let genBtn = document.getElementById("genBtn");
let exportBtn = document.getElementById("exportBtn");
let copyIcon = document.getElementById("copyIcon");
let recentPasswords = [];

sliderValue.textContent = inputSlider.value;

inputSlider.addEventListener('input', () => {
    sliderValue.textContent = inputSlider.value;
});

genPatternBtn.addEventListener('click', () => {
    let password = generatePasswordFromPattern();
    passBox.value = password;
    updateRecentPasswords(password);
});

genBtn.addEventListener('click', () => {
    let password = generateRandomPassword();
    passBox.value = password;
    updateRecentPasswords(password);
});

function generatePasswordFromPattern() {
    let passwordPattern = pattern.value || "Aan#";
    let password = "";
    for (let char of passwordPattern) {
        password += generateCharacter(char);
    }
    return password;
}

function generateRandomPassword() {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+=|<>?{}[]~";
    let password = "";
    for (let i = 0; i < inputSlider.value; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

function generateCharacter(charType) {
    switch (charType) {
        case 'A': return randomChar("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        case 'a': return randomChar("abcdefghijklmnopqrstuvwxyz");
        case '#': return randomChar("!@#$%^&*()-_+=|<>?{}[]~");
        case 'n': return randomChar("0123456789");
        default:  return charType; // Allow literals in patterns
    }
}

function randomChar(charSet) {
    return charSet[Math.floor(Math.random() * charSet.length)];
}

copyIcon.addEventListener('click', () => {
    if (passBox.value) {
        navigator.clipboard.writeText(passBox.value);
        copyIcon.innerText = "check";
        copyIcon.title = "Password Copied";
        setTimeout(() => {
            copyIcon.innerText = "content_copy";
            copyIcon.title = "";
        }, 3000);
    }
});

function updateRecentPasswords(password) {
    if (recentPasswords.length >= 5) {
        recentPasswords.shift();
    }
    recentPasswords.push(password);
    const recentList = document.getElementById('recentPasswordsList');
    recentList.innerHTML = '';
    recentPasswords.forEach(pass => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = pass;
        span.style.flexGrow = "1";
        const button = document.createElement('button');
        button.textContent = 'Copy';
        button.style.marginLeft = "10px";
        button.onclick = () => {
            navigator.clipboard.writeText(pass);
            alert('Password copied: ' + pass);
        };
        li.appendChild(span);
        li.appendChild(button);
        recentList.appendChild(li);
    });
}

exportBtn.addEventListener('click', () => {
    const data = new Blob([recentPasswords.join('\n')], {type: 'text/plain'});
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'passwords.txt';
    link.click();
});
