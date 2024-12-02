// Select all buttons with the 'collapsible' class
const collapsibles = document.querySelectorAll(".show-group button.collapsible");

// Add a click event listener to each collapsible button
collapsibles.forEach(button => {
  button.addEventListener("click", () => {
    const content = button.parentElement.querySelector(".content");
    if (content) {
      // Toggle between block and none to show/hide
      content.style.display = content.style.display === "block" ? "none" : "block";

      // Optional: Log for debugging
      console.log("Toggled content for:", button.innerText, "Current state:", content.style.display);
    } else {
      console.error("Content not found for button:", button.innerText);
    }
  });
});
