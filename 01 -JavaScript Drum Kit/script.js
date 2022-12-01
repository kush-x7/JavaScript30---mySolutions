"use strict";

// Background animation
window.onload = function () {
  Particles.init({
    selector: ".background",
    color: "#f9c4d2",
    connectParticles: true,
  });
};
const selectAllKeys = document.getElementsByClassName("key");

// On keyboard press
window.addEventListener("keydown", (e) => {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;

  key.classList.add("clicked");
  audio.currentTime = 0;
  //   Current time -> 0 means (if we click the same button multiple time and the previous sound is not finished than this property will help us)
  // It will set the sound time to 0 every time we press the button.
  audio.play();
});

// On click

for (let i = 0; i < selectAllKeys.length; i++) {
  selectAllKeys[i].addEventListener("click", (e) => {
    const getValueOfButton = e.target.getAttribute("data-key");
    const getParentElementDataValue =
      e.target.parentNode.getAttribute("data-key");

    const weHaveValue = getValueOfButton
      ? getValueOfButton
      : getParentElementDataValue;

    const audio = document.querySelector(`audio[data-key="${weHaveValue}"]`);
    audio.currentTime = 0;
    audio.play();
  });
}

for (let i = 0; i < selectAllKeys.length; i++) {
  selectAllKeys[i].addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;
    e.target.classList.remove("clicked");
  });
}
