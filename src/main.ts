import isURL from "validator/lib/isURL";
function getInputElement(): HTMLInputElement | undefined {
  return (
    document.querySelector<HTMLInputElement>(
      "div.homepage-search-content input#sdu_search_input.search-input",
    ) ?? undefined
  );
}

function main(): void {
  const inputElement = getInputElement();
  if (!inputElement) {
    // Not on the target page
    return;
  }

  // Listen for Ctrl+Enter hotkey
  // If the input value is valid absolute URL, open it with click on `< a>` element
  // WebVPN will handle the URL with LAN
  inputElement.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "Enter") {
      const value = inputElement.value;
      if (isURL(value, {})) {
        const aElement = document.createElement("a");
        aElement.href = value;
        aElement.target = "_blank";
        aElement.click();

        event.preventDefault();
        event.stopPropagation();
      }
    }
  });
}

main();
