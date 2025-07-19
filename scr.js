// ========== Draggable Icons - Rubber Band Effect ==========
document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".draggable-icon");

  icons.forEach(icon => {
    let startX = 0;
    let startY = 0;

    icon.addEventListener("mousedown", e => {
      startX = e.clientX;
      startY = e.clientY;
      icon.style.transition = "none";

      const maxDistance = 40; // المسافة القصوى للتحرك

      const onMouseMove = eMove => {
        const dx = eMove.clientX - startX;
        const dy = eMove.clientY - startY;

        // نحصر الحركة داخل 40 بكسل
        const limitedX = Math.max(Math.min(dx, maxDistance), -maxDistance);
        const limitedY = Math.max(Math.min(dy, maxDistance), -maxDistance);

        icon.style.transform = `translate(${limitedX}px, ${limitedY}px)`;
      };

      const onMouseUp = () => {
        icon.style.transition = "transform 0.3s ease-out";
        icon.style.transform = `translate(0px, 0px)`;

        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  });
});

// ========== JSON Formatter ==========
function formatJSON() {
  const input = document.getElementById("json-input");
  const output = document.getElementById("json-output");

  if (!input || !output) return;

  try {
    const parsed = JSON.parse(input.value);
    const formatted = JSON.stringify(parsed, null, 2);
    output.textContent = formatted;
    output.style.color = "green";
  } catch (e) {
    output.textContent = "Invalid JSON 😢";
    output.style.color = "red";
  }
}

// ========== Password Generator ==========
function generatePassword(length = 16) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  return password;
}

function handlePasswordPage() {
  const passwordBox = document.getElementById("password");
  const generateBtn = document.getElementById("generate-btn");
  const copyBtn = document.getElementById("copy-btn");

  if (passwordBox && generateBtn && copyBtn) {
    generateBtn.onclick = () => {
      const newPassword = generatePassword();
      passwordBox.textContent = newPassword;
    };

    copyBtn.onclick = () => {
      const password = passwordBox.textContent;
      if (password && password !== "Click \"Generate\" to create a password") {
        navigator.clipboard.writeText(password);
        alert("✅ Password copied!");
      }
    };
  }
}

document.addEventListener("DOMContentLoaded", handlePasswordPage);
