/*
		Designed by: Emil Ismailov
		Original image: https://dribbble.com/shots/5089813-90-s-Music-Player
*/

(function() {
    'use strict';

    // Cache DOM elements
    const radio = document.getElementById("radio");
    const audio = document.getElementById("audio");
    const son = document.getElementById("son");
    const soff = document.getElementById("soff");

    // Cache speaker elements
    const speakers = {
        front: document.querySelectorAll(".speaker__front"),
        top: document.querySelectorAll(".speaker__top"),
        back: document.querySelectorAll(".speaker__back"),
        left: document.querySelectorAll(".speaker__left"),
        right: document.querySelectorAll(".speaker__right")
    };

    // Preload audio for better performance
    audio.preload = 'auto';
    audio.loop = true;

    // Toggle function with optimized class manipulation
    const toggleSpeakers = (className) => {
        speakers.front.forEach(el => el.classList.toggle(className));
        speakers.top.forEach(el => el.classList.toggle(className));
        speakers.back.forEach(el => el.classList.toggle(className));
        speakers.left.forEach(el => el.classList.toggle(className));
        speakers.right.forEach(el => el.classList.toggle(className));
    };

    // Play/Pause handler
    const handleAudio = (e) => {
        // Only trigger on direct clicks, not bubbles from interactive elements
        if (e.target.closest('.svg-icon')) return;

        e.stopPropagation();
        
        if (audio.paused) {
            audio.play().catch(err => console.log('Audio play failed:', err));
        } else {
            audio.pause();
            audio.currentTime = 0;
        }

        toggleSpeakers('sfa');
        toggleSpeakers('sta');
        toggleSpeakers('sba');
        toggleSpeakers('sla');
        toggleSpeakers('sra');

        radio.classList.toggle("radio-a");
        son.classList.toggle("s");
        soff.classList.toggle("s");
    };

    // Use event delegation with specific target
    document.addEventListener("click", handleAudio);

    // Expose audio controls globally if needed
    window.audioPlayer = {
        play: () => audio.play(),
        pause: () => audio.pause(),
        toggle: handleAudio
    };
})();