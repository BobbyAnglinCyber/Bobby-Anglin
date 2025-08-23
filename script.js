const terminal = document.getElementById("terminal");

let username = "BobbyAnglin";
let hostname = "portfolio";
let currentPath = "/home/BobbyAnglin";

// Portfolio filesystem
const fakeFS = {
  "/": ["home"],
  "/home": ["BobbyAnglin"],
  "/home/BobbyAnglin": ["Projects", "Skills", "Experience", "Education", "Contacts", "about.txt"],
  "/home/BobbyAnglin/Projects": ["Project1", "Project2", "Project3"],
  "/home/BobbyAnglin/Skills": ["JavaScript", "Python", "Cybersecurity", "Linux"],
  "/home/BobbyAnglin/Experience": ["Company1", "Company2"],
  "/home/BobbyAnglin/Education": ["Bachelors", "Certifications"],
  "/home/BobbyAnglin/Contacts": ["email.txt", "linkedin.txt"]
};

// File contents
const fileContents = {
  "about.txt": "Hello! I'm Bobby Anglin, a cybersecurity enthusiast building interactive portfolios.",
  "email.txt": "bobby@example.com",
  "linkedin.txt": "https://www.linkedin.com/in/bobbyanglin"
};

// Create new prompt line
function newPrompt() {
  const line = document.createElement("div");
  line.classList.add("line");

  const prompt = document.createElement("span");
  prompt.classList.add("prompt");
  prompt.textContent = `${username}@${hostname}:${currentPath}$`;

  const input = document.createElement("input");
  input.classList.add("input");
  input.type = "text";

  line.appendChild(prompt);
  line.appendChild(input);
  terminal.appendChild(line);

  input.focus();

  input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      handleCommand(input.value);
      input.disabled = true;
      newPrompt();
      terminal.scrollTop = terminal.scrollHeight;
    }
  });
}

// Handle commands
function handleCommand(cmd) {
  const output = document.createElement("div");
  output.classList.add("output");

  let parts = cmd.trim().split(" ");
  let base = parts[0];
  let args = parts.slice(1);

  switch(base) {
    case "help":
      output.innerHTML = "Available commands: <br>help, ls, cd, pwd, whoami, cat, clear";
      break;
    case "whoami":
      output.textContent = username;
      break;
    case "pwd":
      output.textContent = currentPath;
      break;
    case "ls":
      let items = fakeFS[currentPath] || [];
      output.innerHTML = items.map(item =>
        fakeFS[`${currentPath}/${item}`] 
          ? `<span class="dir">${item}</span>` 
          : `<span class="file">${item}</span>`
      ).join("  ");
      break;
    case "cd":
      if (!args[0]) break;
      let target = args[0];
      if (target === "..") {
        if (currentPath !== "/") {
          currentPath = currentPath.split("/").slice(0, -1).join("/") || "/";
        }
      } else {
        let newPath = currentPath === "/" ? `/${target}` : `${currentPath}/${target}`;
        if (fakeFS[newPath]) {
          currentPath = newPath;
        } else {
          output.innerHTML = `<span class="error">cd: ${target}: No such file or directory</span>`;
        }
      }
      break;
    case "cat":
      if (!args[0]) break;
      let filename = args[0];
      if (fileContents[filename]) {
        output.textContent = fileContents[filename];
      } else {
        output.innerHTML = `<span class="error">cat: ${filename}: No such file</span>`;
      }
      break;
    case "clear":
      terminal.innerHTML = "";
      return;
    case "":
      output.textContent = "";
      break;
    default:
      output.innerHTML = `<span class="error">${base}: command not found</span>`;
  }

  terminal.appendChild(output);
}

newPrompt();

