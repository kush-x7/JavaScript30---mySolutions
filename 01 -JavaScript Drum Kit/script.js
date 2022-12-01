"use strict";

// Background animation
window.onload = function () {
  Particles.init({
    selector: ".background",
    color: "#f9c4d2",
    connectParticles: true,
  });
};

// ---------------------------------------------------------------------

const selectAllKeys = document.getElementsByClassName("key");

// On keyboard press
window.addEventListener("keydown", (e) => {
  // 1. Selecting audio file [keycode will give the key value when clicked]
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

  if (!audio) return; //On pressing the key we are getting key code number and now we will see whether we have that number audio or not. In case we don't have then just don't continue forward

  key.classList.add("pressed"); //Adding transition on pressing keyboard keys.
  audio.currentTime = 0;
  //   Current time -> 0 means (if we click the same button multiple time and the previous sound is not finished than this property will help us)
  // It will set the sound time to 0 every time we press the button.
  audio.play();
});

// Removing the class when transition end
for (let i = 0; i < selectAllKeys.length; i++) {
  selectAllKeys[i].addEventListener("transitionend", (e) => {
    console.log(e);
    if (e.propertyName !== "transform") return; // if we don't have property names as transformed than no need to continue. We want to work only on transform
    e.target.classList.remove("pressed");
  });
}

// ---------------------------------------------------------------------

// ON CLICK
for (let i = 0; i < selectAllKeys.length; i++) {
  selectAllKeys[i].addEventListener("click", (e) => {
    e.preventDefault();
    const getValueOfButton = e.target.getAttribute("data-key"); //Value of key when div is clicked
    const getParentElementDataValue =
      e.target.parentNode.getAttribute("data-key"); // Value of div when inner child is clicked

    const weHaveValue = getValueOfButton
      ? getValueOfButton
      : getParentElementDataValue;

    const audio = document.querySelector(`audio[data-key="${weHaveValue}"]`);
    audio.currentTime = 0;
    audio.play();
  });
}
