// scripts/sticky-notes.js
document.addEventListener("DOMContentLoaded", () => {
    const addNoteButton = document.getElementById("add-note");
    const newNoteTextArea = document.getElementById("new-note");
    const notesContainer = document.getElementById("notes-container");
  
    let notes = [];
  
    // Load existing notes
    chrome.storage.local.get(["notes"], (result) => {
      if (result.notes) {
        notes = result.notes;
        renderNotes();
      }
    });
  
    // Add a new note
    addNoteButton.addEventListener("click", () => {
      const noteContent = newNoteTextArea.value.trim();
      if (!noteContent) {
        alert("Please enter some text for your note.");
        return;
      }
      const note = {
        id: Date.now(),
        content: noteContent
      };
      notes.push(note);
      newNoteTextArea.value = "";
      saveNotes();
    });
  
    // Rerender all notes
    function renderNotes() {
      notesContainer.innerHTML = "";
      notes.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.className = "sticky-note";
        noteElement.innerHTML = `
          <p contenteditable="true" class="note-content">${note.content}</p>
          <button class="delete-note">✖</button>
        `;
        // On content edit
        noteElement.querySelector(".note-content").addEventListener("input", (e) => {
          note.content = e.target.innerText;
          saveNotes();
        });
        // On delete
        noteElement.querySelector(".delete-note").addEventListener("click", () => {
          notes = notes.filter(n => n.id !== note.id);
          saveNotes();
        });
        notesContainer.appendChild(noteElement);
      });
    }
  
    // Save notes to chrome.storage and re-render
    function saveNotes() {
      chrome.storage.local.set({ notes }, () => {
        renderNotes();
      });
    }
  });
  