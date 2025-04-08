let notes_list = JSON.parse(localStorage.getItem("notes")) || [];

// Merged DOMContentLoaded logic
document.addEventListener("DOMContentLoaded", () => {
  // Hide popup initially
  document.getElementById("popup").classList.add("hidden");

  // Render notes from localStorage
  renderNotes();

  // Attach click listener to close popup when clicking outside the content
  document.getElementById("popup").addEventListener("click", function (event) {
    if (event.target === this) {
      closePopup();
    }
  });

  // Load saved dark mode preference
  const isDarkSaved = localStorage.getItem("darkMode") === "true";
  if (isDarkSaved) {
    document.body.classList.add("dark-mode");
  }

  // Add event listener to toggle button
  document.querySelector(".toggle-btn").addEventListener("click", toggleLightDarkMode);
});

function renderNotes() {
  let noteItem = "";

  for (let i = 0; i < notes_list.length; i++) {
    noteItem += `
      <div class="note-btn-del note" onClick="showNote(${i})">
        <li style="color: ${notes_list[i].color};">${notes_list[i].title}</li>
        <button class="delete-btn" onClick="delNote(event, ${i})">x</button>
      </div>`;
  }

  document.getElementById("output").innerHTML = noteItem;
}

function saveNotesToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes_list));
}

function addNote() {
  const title = document.getElementById("notes-title").value.trim();
  const content = document.getElementById("notes-id").value.trim();
  const color = document.getElementById("note-color").value;

  if (!title || !content) return;

  notes_list.push({ title, content, color });
  document.getElementById("notes-title").value = "";
  document.getElementById("notes-id").value = "";
  saveNotesToLocalStorage();
  renderNotes();
}

function showNote(index) {
  const note = notes_list[index];
  document.getElementById("popup-title").textContent = note.title;
  document.getElementById("popup-text").textContent = note.content;
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

function delNote(event, index) {
  event.stopPropagation(); // Prevent triggering showNote
  notes_list.splice(index, 1);
  saveNotesToLocalStorage();
  renderNotes();
}

function clearAll() {
  notes_list = [];
  saveNotesToLocalStorage();
  renderNotes();
}

function toggleLightDarkMode() {
  document.body.classList.toggle("dark-mode");

  // Save the preference to localStorage
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark);
}
