document.addEventListener("DOMContentLoaded", function () {
    const addNoteButton = document.getElementById("add-note");
    const newNoteTextArea = document.getElementById("new-note");
    const notesContainer = document.getElementById("notes-container");

    let notes = [];

    chrome.storage.local.get(["notes"], function (result) {
        if (result.notes) {
            notes = result.notes;
            renderNotes();
        }
    });

    addNoteButton.addEventListener("click", function () {
        const noteContent = newNoteTextArea.value.trim();
        if (!noteContent) {
            alert("⚠️ Please type something to create a note!");
            return;
        }

        const note = { id: new Date().getTime(), content: noteContent, position: { top: 100, left: 50 } };
        notes.push(note);
        saveNotes();
        newNoteTextArea.value = "";
    });

    function renderNotes() {
        notesContainer.innerHTML = "";
        notes.forEach(note => {
            const noteElement = document.createElement("div");
            noteElement.classList.add("sticky-note");
            noteElement.innerHTML = `<p contenteditable="true">${note.content}</p><button class="delete-note">❌</button>`;

            noteElement.style.position = "absolute";
            noteElement.style.top = `${note.position.top}px`;
            noteElement.style.left = `${note.position.left}px`;

            noteElement.querySelector("p").addEventListener("input", function () {
                note.content = this.innerText.trim();
                saveNotes();
            });

            noteElement.querySelector(".delete-note").addEventListener("click", function () {
                notes = notes.filter(n => n.id !== note.id);
                saveNotes();
            });

            makeDraggable(noteElement, note);
            notesContainer.appendChild(noteElement);
        });
    }

    function saveNotes() {
        chrome.storage.local.set({ notes: notes }, function () {
            renderNotes();
        });
    }

    function makeDraggable(noteElement, note) {
        let offsetX, offsetY, isDragging = false;

        noteElement.addEventListener("mousedown", function (e) {
            isDragging = true;
            offsetX = e.clientX - noteElement.getBoundingClientRect().left;
            offsetY = e.clientY - noteElement.getBoundingClientRect().top;
            noteElement.style.zIndex = "1000";
        });

        document.addEventListener("mousemove", function (e) {
            if (!isDragging) return;
            noteElement.style.left = `${e.clientX - offsetX}px`;
            noteElement.style.top = `${e.clientY - offsetY}px`;
        });

        document.addEventListener("mouseup", function () {
            isDragging = false;
            note.position = { top: parseInt(noteElement.style.top), left: parseInt(noteElement.style.left) };
            saveNotes();
        });
    }
});
