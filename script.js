const darkModeSwitch = document.getElementById('dark-mode-switch');
const htmlTag = document.querySelector('html');

darkModeSwitch.addEventListener('change', function () {
  if (this.checked) {
    htmlTag.setAttribute('data-bs-theme', 'dark');
  } else {
    htmlTag.setAttribute('data-bs-theme', 'light');
  }
});

// Sample function for tracking button clicks or other events
// function trackSampleButtonClick() {
//   // Send an event to Google Analytics
//   gtag('event', 'button_click', {
//     'event_category': 'Button Clicks',
//     'event_label': 'Sample Button'
//   });
// }

document.addEventListener("DOMContentLoaded", function () {
  var content = document.getElementById("content");
  content.classList.add("startup-animation");
});


// Check if there's a cookie for the switch state and update switch accordingly
document.addEventListener("DOMContentLoaded", function () {
  const switchElement = document.getElementById("dark-mode-switch");
  const switchState = getCookie("darkModeState");

  if (switchState === "on") {
    switchElement.checked = true;
    htmlTag.setAttribute('data-bs-theme', 'dark');
  } else {
    switchElement.checked = false;
    htmlTag.setAttribute('data-bs-theme', 'light');
  }

  switchElement.addEventListener("change", function () {
    if (this.checked) {
      setCookie("darkModeState", "on", 7); // Set cookie for 7 days
      enableDarkMode();
    } else {
      setCookie("darkModeState", "off", 7);
      disableDarkMode();
    }
  });

  // Function to set cookie
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  // Function to get cookie
  function getCookie(name) {
    const cookieName = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  }

  // Function to enable dark mode
  function enableDarkMode() {
    document.body.classList.add('dark-mode');
  }

  // Function to disable dark mode
  function disableDarkMode() {
    document.body.classList.remove('dark-mode');
  }
});
