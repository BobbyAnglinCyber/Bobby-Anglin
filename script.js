const terminal = document.getElementById("terminal");

// Define initial prompt
const PROMPT_TEXT = "BobbyAnglin@Portfolio:~$ ";

// Function to create a new input line
function createInputLine() {
  const line = document.createElement("div");
  line.classList.add("input-line");

  const prompt = document.createElement("span");
  prompt.classList.add("prompt");
  prompt.textContent = PROMPT_TEXT;

  const input = document.createElement("input");
  input.autofocus = true;

  line.appendChild(prompt);
  line.appendChild(input);
  terminal.appendChild(line);

  input.focus();

  // Handle enter key
  input.addEventListener("keydown", function(event) {
    if(event.key === "Enter") {
      handleCommand(input.value);
      input.disabled = true; // Disable the current line
      createInputLine(); // Create new input line
      terminal.scrollTop = terminal.scrollHeight; // Scroll down
    }
  });
}

// Basic command handler
function handleCommand(command) {
  const output = document.createElement("div");
  command = command.trim().toLowerCase();

  if(command === "help") {
    output.textContent = "Available commands: help, about, clear";
  } else if(command === "about") {
    output.textContent = "Hi! I'm Bobby Anglin, a cybersecurity enthusiast and portfolio creator.";
  } else if(command === "clear") {
    terminal.innerHTML = "";
    return;
  } else if(command === "") {
    output.textContent = "";
  } else {
    output.textContent = `${command}: command not found`;
  }

  terminal.appendChild(output);
}

// Initialize terminal
createInputLine();

