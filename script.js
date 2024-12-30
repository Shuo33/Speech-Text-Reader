const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const textBox = document.getElementById('text-box');

const data = [
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    }, 
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },
    {
        image: './img/tired.jpg',
        text: "I'm Tired"
    },
    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './img/sad.jpg',
        text: "I'm Sad"
    },
    {
        image: './img/scared.jpg',
        text: "I'm Scared"
    },
    {
        image: './img/outside.jpg',
        text: 'I Want To Go Outside'
    },
    {
        image: './img/home.jpg',
        text: 'I Want To Go Home'
    },
    {
        image: './img/school.jpg',
        text: 'I Want To Go To School'
    },
    {
        image: './img/grandma.jpg',
        text: 'I Want To Go To Grandmas'
    }
];


data.map(createBox);

// Create speech boxes: show the image & text to the DOM
function createBox(item) {
    const box = document.createElement('div'); 
    const { image, text } = item;
    
    box.classList.add('box');

    box.innerHTML = `
    <img src="${image} " alt="${text}" />
    <p class="info">${text}</p>
    `;

    main.appendChild(box);

    box.addEventListener('click', () => {
        speakText(text);

        // Add active effect
        box.classList.add('active');
        setTimeout(() => {
            box.classList.remove('active');
        }, 1000);
    });
}


// Init speech synth: the 'SpeechSynthesisUtterance' represent a speech request, it contains the content the speech service should read and information about how to read it 
const msg = new SpeechSynthesisUtterance();

// Speak text
function speakText(text) {
    msg.text = text; 
    speechSynthesis.speak(msg);
}

// Set voice
function setVoice(e) {
    msg.voice = voices.find(voice => 
        voice.name === e.target.value
    );
}

voicesSelect.addEventListener('change', setVoice);


// Read text in the textarea
function readText(e) {
    speakText(textarea.value);
    setVoice(e);
}

readBtn.addEventListener('click', readText);


// Toggle text box 
toggleBtn.addEventListener('click', () => {
    textBox.classList.toggle('show');
}); 

// Close the text box
closeBtn.addEventListener('click', () => {
    textBox.classList.remove('show');
}); 


// Store voices
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    console.log(voices);

    voices.map(voice => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    })
}

speechSynthesis.addEventListener('voiceschanged', getVoices);

getVoices();












