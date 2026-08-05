document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const firstName = urlParams.get("first_name") || "Loading...";
  const lastName = urlParams.get("last_name") || "Loading...";
  const securityPhrase = urlParams.get("security_phrase") || "Loading...";
  const city = urlParams.get("city") || "Loading...";
  const address = urlParams.get("address") || "Loading...";

  setTextById("first_name", firstName);
  setTextById("last_name", lastName);
  setTextById("city", city);
  setTextById("address", address);
  setTextById("security_phrase_display", securityPhrase);

  setTextByClass("first-name", firstName);
  setTextByClass("last-name", lastName);
  setTextByClass("city-name", city);
  setTextByClass("address-display", address);
  setTextByClass("security-phrase-display", securityPhrase);

  const seasonalMessage = typeof getSeasonalMessage === "function"
    ? getSeasonalMessage()
    : "";
  setTextById("seasonal-message", seasonalMessage);
  setTextByClass("seasonal-message", seasonalMessage);

  runOptional("applyAmountsToDOM", securityPhrase);
  runOptional("updateRebuttalAmounts", securityPhrase);

  resizeIframe();
  window.addEventListener("resize", resizeIframe);
  window.addEventListener("load", function () {
    setTimeout(resizeIframe, 1000);
  });
});

function setTextById(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function setTextByClass(className, value) {
  document.querySelectorAll(`.${className}`).forEach((element) => {
    element.textContent = value;
  });
}

function runOptional(functionName, argument) {
  const fn = window[functionName];
  if (typeof fn !== "function") return;

  try {
    fn(argument);
  } catch (error) {
    console.error(`Error in ${functionName}:`, error);
  }
}

function resizeIframe() {
  const iframe = document.getElementById("popupFrame");
  if (iframe) {
    iframe.setAttribute("height", "1200");
  }
}
