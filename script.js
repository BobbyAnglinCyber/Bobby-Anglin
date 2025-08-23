const terminal = document.getElementById("terminal");

// Terminal filesystem structure
const fs = {
  home: {
    about: "Hello! I'm Bobby Anglin. Welcome to my portfolio terminal!",
    Projects: ["Project1", "Project2"],
    Skills: ["HTML", "CSS", "JS"],
    Experience: ["Job1", "Job2"],
    Education: ["Degree1", "Degree2"],
    Contacts: ["Email", "LinkedIn"]
  }
};

// Current directory pointer
let currentDir = fs.home;

// Initialize terminal
function initTerminal() {
  printPrompt();
}

function printPrompt() {
  const line = document.createElement("div");
  const prompt = document.createElement("span");
  prompt.classList.add("prompt");
  prompt.textContent = "BobbyAnglin@Portfolio:~$ ";
  line.appendChild(prompt);

  const input = document.createElement("input");
  input.classList.add("input");
  input.autofocus = true;

  input.addEventListener("keydown", handleCommand);

  line.appendChild(input);
  terminal.appendChild(line);
  input.focus();
}

function handleCommand(e) {
  if (e.key === "Enter") {
    const input = e.target;
    const command = input.value.trim();
    const output = document.createElement("div");

    executeCommand(command, output);

    input.disabled = true;
    terminal.appendChild(output);
    printPrompt();
    terminal.scrollTop = terminal.scrollHeight;
  }
}

function executeCommand(cmd, output) {
  if (cmd === "help") {
    output.innerHTML = "Available commands: <span class='dir'>ls</span>, <span class='dir'>cd [directory]</span>, <span class='dir'>about</span>, <span class='dir'>clear</span>";
  } else if (cmd === "ls") {
    output.innerHTML = Object.keys(currentDir).map(item => {
      if (Array.isArray(currentDir[item])) return `<span class='dir'>${item}</span>`;
      return `<span class='file'>${item}</span>`;
    }).join("  ");
  } else if (cmd.startsWith("cd ")) {
    const dir = cmd.split(" ")[1];
    if (currentDir[dir] && Array.isArray(currentDir[dir])) {
      currentDir = { [dir]: currentDir[dir] }; // Simplified directory navigation
      output.textContent = "";
    } else {
      output.textContent = `bash: cd: ${dir}: No such directory`;
    }
  } else if (cmd === "about") {
    output.textContent = fs.home.about;
  } else if (cmd === "clear") {
    terminal.innerHTML = "";
  } else {
    output.textContent = `bash: ${cmd}: command not found`;
  }
}

initTerminal();


