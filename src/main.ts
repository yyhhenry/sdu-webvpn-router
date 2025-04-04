import isURL from "validator/lib/isURL";

function main(ttl: number = 3): void {
  const inputElement = document.querySelector<HTMLInputElement>(
    "div.homepage-search-content input#sdu_search_input.search-input",
  );
  if (!inputElement) {
    if (ttl > 0) {
      setTimeout(() => main(ttl - 1), 1000);
    }
    console.warn("sdu-webvpn-router: Not on the target page.");
    return;
  }

  // Listen for Ctrl+ArrowRight hotkey
  // If the input value is valid absolute URL, open it with click on `< a>` element
  // WebVPN will handle the URL with LAN
  window.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "ArrowRight") {
      const value = inputElement.value;
      if (isURL(value)) {
        const aElement = document.createElement("a");
        aElement.href = value;
        aElement.target = "_blank";
        aElement.click();

        event.preventDefault();
        event.stopPropagation();
      } else {
        console.warn("Invalid URL:", value);
        alert("Please enter a valid URL.");

        inputElement.value = "";
        inputElement.focus();
      }
    }
  });

  inputElement.placeholder = "Ctrl + → to open URL";
  console.log("sdu-webvpn-router: Type a URL and press Ctrl + → to open it.");
}

main();
