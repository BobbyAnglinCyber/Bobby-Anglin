const terminal = document.getElementById("terminal");

function newLine() {
  const line = document.createElement("div");
  line.classList.add("line");

  const prompt = document.createElement("span");
  prompt.classList.add("prompt");
  prompt.textContent = "BobbyAnglin@portfolio:~$ ";

  const input = document.createElement("span");
  input.classList.add("input");
  input.contentEditable = true;

  line.appendChild(prompt);
  line.appendChild(input);
  terminal.appendChild(line);

  input.focus();

  // keep cursor inside input
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(input.textContent.trim());
      input.contentEditable = false;
    }
  });
}

function handleCommand(cmd) {
  let output = document.createElement("div");
  output.classList.add("output");

  if (cmd === "help") {
    output.textContent = "Available commands: help, ls, pwd, clear";
  } else if (cmd === "ls") {
    output.textContent = "Desktop  Documents  Downloads  Music  Pictures  Videos";
  } else if (cmd === "pwd") {
    output.textContent = "/home/user";
  } else if (cmd === "clear") {
    terminal.innerHTML = "";
    newLine();
    return;
  } else if (cmd.length === 0) {
    output.textContent = "";
  } else {
    output.textContent = `Command not found: ${cmd}`;
  }

  terminal.appendChild(output);
  newLine();
}

// Start terminal
newLine();
