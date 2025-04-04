import isURL from "validator/lib/isURL";

function main(ttl: number = 3): void {
  const inputElement = document.querySelector<HTMLInputElement>(
    "div.homepage-search-content input#sdu_search_input.search-input",
  );
  if (!inputElement) {
    if (ttl > 0) {
      setTimeout(() => main(ttl - 1), 1000);
    } else {
      console.warn("sdu-webvpn-router: Not on the target page.");
    }
    return;
  }

  const doOpen = () => {
    const value = inputElement.value;
    if (isURL(value)) {
      const aElement = document.createElement("a");
      aElement.href = value;
      aElement.target = "_blank";
      aElement.click();
      return true;
    } else {
      console.warn("Invalid URL:", value);
      alert("Please enter a valid URL.");

      inputElement.value = "";
      inputElement.focus();
      return false;
    }
  };

  // Listen for Ctrl+ArrowRight hotkey (for PC)
  // If the input value is valid absolute URL, open it with click on `< a>` element
  // WebVPN will handle the URL with LAN
  inputElement.placeholder = "Ctrl + → to open URL";
  console.log("sdu-webvpn-router: Type a URL and press Ctrl + → to open it.");
  window.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "ArrowRight") {
      if (doOpen()) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  });

  // Add a button to the input element for mobile
  // (display when input value is valid URL)
  const buttonElement = document.createElement("button");
  buttonElement.textContent = "Open";
  buttonElement.style.margin = "5px";
  buttonElement.style.cursor = "pointer";
  buttonElement.style.display = "none";
  buttonElement.classList.add("btn", "btn-primary");
  buttonElement.addEventListener("click", () => {
    doOpen();
  });
  inputElement.parentElement?.appendChild(buttonElement);
  inputElement.addEventListener("input", () => {
    if (isURL(inputElement.value)) {
      buttonElement.style.display = "inline-block";
    } else {
      buttonElement.style.display = "none";
    }
  });
  inputElement.addEventListener("focus", () => {
    if (isURL(inputElement.value)) {
      buttonElement.style.display = "inline-block";
    } else {
      buttonElement.style.display = "none";
    }
  });
}

main();
