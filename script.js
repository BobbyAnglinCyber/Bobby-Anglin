const terminal = document.getElementById("terminal");
const input = document.getElementById("input");

input.focus();

document.addEventListener("click", () => input.focus());

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const command = input.innerText.trim();
    runCommand(command);
    input.innerText = "";
  }
});

function runCommand(cmd) {
  let output = "";

  if (cmd === "ls") {
    output = "Documents  Downloads  Music  Pictures  Projects";
  } else if (cmd === "whoami") {
    output = "user";
  } else if (cmd === "pwd") {
    output = "/home/user";
  } else if (cmd === "echo hello") {
    output = "hello";
  } else if (cmd === "help") {
    output = "Available commands: ls, whoami, pwd, echo hello, help";
  } else if (cmd.length === 0) {
    output = "";
  } else {
    output = `bash: ${cmd}: command not found`;
  }

  const newLine = document.createElement("div");
  newLine.classList.add("line");
  newLine.innerHTML = `<span class="prompt">user@jammy:/home/user$</span> ${cmd}`;
  terminal.appendChild(newLine);

  if (output) {
    const outLine = document.createElement("div");
    outLine.textContent = output;
    terminal.appendChild(outLine);
  }

  const newPrompt = document.createElement("div");
  newPrompt.classList.add("line");
  newPrompt.innerHTML = `<span class="prompt">user@jammy:/home/user$</span> <span class="input" id="input" contenteditable="true"></span>`;
  terminal.appendChild(newPrompt);

  input.removeAttribute("id");
  const newInput = newPrompt.querySelector(".input");
  newInput.focus();

  document.addEventListener("click", () => newInput.focus());
}

