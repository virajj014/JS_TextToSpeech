const textInput = document.getElementById("text-input");
const voiceSelect = document.getElementById("voice-select");
const pitchRange = document.getElementById("pitch-range");
const rateRange = document.getElementById("rate-range");
const speakButton = document.getElementById("speak-button");

let voices = [];


function getVoicesinhtml() {
    voices = window.speechSynthesis.getVoices()

    voices.forEach(voice => {
        const option = document.createElement("option");
        option.textContent = voice.name + "(" + voice.lang + ")";
        option.setAttribute("data-lang", voice.lang)
        option.setAttribute("data-name", voice.name)
        voiceSelect.appendChild(option);
    })
}

getVoicesinhtml()

// some condition

if (typeof speechSynthesis !== "undefined" && speechSynthesis.onvoiceschanged !== "undefined") {
    speechSynthesis.onvoiceschanged = getVoicesinhtml;
}


speakButton.addEventListener("click", () => {
    const speech = new SpeechSynthesisUtterance(textInput.value);
    speech.pitch = pitchRange.value;
    speech.rate = rateRange.value;
    // console.log(voices)
    // console.log(voices.find(voice => {
    //     return (
    //         voice.name == voiceSelect.selectedOptions[0].getAttribute("data-name")
    //     );
    // }))

    speech.voice = voices.find(voice => {
        return (
            voice.name == voiceSelect.selectedOptions[0].getAttribute("data-name")
        );
    })


    // console.log(speech)
    window.speechSynthesis.speak(speech);
})
