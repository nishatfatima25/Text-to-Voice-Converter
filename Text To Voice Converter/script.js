//this will hold the text 
let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceSelect = document.querySelector("select");


if ('speechSynthesis' in window){
    //sets event handler when available voices change
//This is important because when we first call getVoices(), especially in browser, it might give an empty list since the voices haven't fully loaded yet. The onvoiceschanged event lets us know when the voices are ready.

window.speechSynthesis.onvoiceschanged = ()=>{

    //assigns available voices in browser to this variable
    voices = window.speechSynthesis.getVoices();

    //default voice
    speech.voice = voices[0];

    voiceSelect.innerHTML = '';
    //loop for available options
    voices.forEach((voice,i)=>(voiceSelect.options[i] = new Option(voice.name , i)));

    voiceSelect.selectedIndex = 0;
};
}
else{
    console.error("Speech Synthesis not available in this browser");
}


//to change voices
voiceSelect.addEventListener("change", ()=>{
    speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click",()=>{

    //takes value from textarea and assigns it to speech
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});