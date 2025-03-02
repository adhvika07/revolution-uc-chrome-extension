document.addEventListener("DOMContentLoaded", function () {
    const addNoteButton = document.getElementById('add-note');
    const newNoteTextArea = document.getElementById('new-note');
    const noteColorPicker = document.getElementById('note-color');

    // Load sticky notes from localStorage and display them at saved positions
    loadNotes();

    // Add new note
    addNoteButton.addEventListener('click', function () {
        const noteContent = newNoteTextArea.value.trim();
        const noteColor = noteColorPicker.value; // Get selected color from the color picker
        if (noteContent.length === 0) {
            alert("Please type something to create a note!");
            return;
        }

        // Create the note object with a unique id
        const note = { 
            id: generateNoteId(), // Generate a unique ID for the note
            content: noteContent, 
            top: 100, 
            left: 100, 
            color: noteColor // Store the selected color
        };
        createStickyNote(note);

        // Store the new note in localStorage
        saveNoteToStorage(note);

        // Clear the textarea after adding the note
        newNoteTextArea.value = '';
    });

    // Function to create and display a sticky note with stored positioning and color
    function createStickyNote(note) {
        const noteElement = document.createElement('div');
        noteElement.classList.add('sticky-note');
        noteElement.innerHTML = `
            <p contenteditable="true">${note.content}</p>
            <button class="delete-note">X</button>
        `;

        // Apply saved position or random position if not available
        noteElement.style.position = 'absolute';
        noteElement.style.top = `${note.top}px`;
        noteElement.style.left = `${note.left}px`;

        // Set the note's background color
        noteElement.style.backgroundColor = note.color;

        // Add delete functionality
        const deleteButton = noteElement.querySelector('.delete-note');
        deleteButton.addEventListener('click', function () {
            document.body.removeChild(noteElement); // Remove note from the page

            // Remove the note from localStorage
            removeNoteFromStorage(note);
        });

        // Add edit functionality (contenteditable)
        const noteText = noteElement.querySelector('p');
        noteText.addEventListener('input', function () {
            const updatedContent = noteText.innerText.trim();
            if (updatedContent !== note.content) {
                note.content = updatedContent;  // Update the note's content

                // Update localStorage with the new content
                updateNoteInStorage(note);
            }
        });

        // Add drag-and-drop functionality
        makeDraggable(noteElement, note);

        // Append note to the body (instead of a specific container)
        document.body.appendChild(noteElement);
    }

    // Function to load notes from localStorage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => {
            createStickyNote(note);
        });
    }

    // Function to save note to localStorage
    function saveNoteToStorage(note) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Function to remove note from localStorage
    function removeNoteFromStorage(note) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const updatedNotes = notes.filter(n => n.id !== note.id); // Use `id` to match notes
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }

    // Function to update note in localStorage
    function updateNoteInStorage(note) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const updatedNotes = notes.map(n => {
            if (n.id === note.id) { // Compare by `id`
                n.content = note.content;
                n.top = note.top;  // Store updated position
                n.left = note.left; // Store updated position
                n.color = note.color; // Store updated color
            }
            return n;
        });
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }

    // Function to make sticky note draggable
    function makeDraggable(noteElement, note) {
        let offsetX, offsetY, isDragging = false;

        noteElement.addEventListener('mousedown', function (e) {
            isDragging = true;

            // Get the initial offset of the mouse relative to the note's top-left corner
            offsetX = e.clientX - noteElement.getBoundingClientRect().left;
            offsetY = e.clientY - noteElement.getBoundingClientRect().top;

            // Add a "dragging" class for visual feedback (optional)
            noteElement.classList.add('dragging');
        });

        document.addEventListener('mousemove', function (e) {
            if (!isDragging) return;

            // Update the note's position as the mouse moves
            noteElement.style.left = `${e.clientX - offsetX}px`;
            noteElement.style.top = `${e.clientY - offsetY}px`;

            // Update note's position in the note object
            note.left = e.clientX - offsetX;
            note.top = e.clientY - offsetY;
        });

        document.addEventListener('mouseup', function () {
            isDragging = false;
            noteElement.classList.remove('dragging'); // Remove "dragging" class when the mouse is released

            // Update position in localStorage when dragging ends
            updateNoteInStorage(note);
        });
    }

    // Function to generate a unique note ID (based on timestamp)
    function generateNoteId() {
        return 'note-' + new Date().getTime(); // Ensure uniqueness by using the current timestamp
    }
});
