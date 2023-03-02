"use strict";

let inRount = document.getElementById('Round-Div');
let pause_btn = document.querySelector("#Pause-Icon");
let play_btn = document.querySelector("#Play-Icon");
let chake_div = document.querySelector(".chake-div");

let audio_section = document.getElementById("audio-section");

play_btn.addEventListener("click", function() {
	inRount.classList.add("round-in-div");
	play_btn.style.display = "none";
	pause_btn.style.display = "block";
	chake_div.classList.add("play-click");
	audio_section.play();
})

pause_btn.addEventListener("click", function() {
	inRount.classList.remove("round-in-div");
	pause_btn.style.display = "none";
	play_btn.style.display = "block";
	chake_div.classList.remove("play-click");
	audio_section.pause();
})

