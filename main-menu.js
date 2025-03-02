document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.menu-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim().toLowerCase();
            // Navigate to corresponding page or execute function based on button clicked
            switch(buttonText) {
                case 'games':
                    window.location.href = 'games.html';
                    break;
                case 'study tools':
                    window.location.href = 'study-tools.html';
                    break;
                case 'journal':
                    window.location.href = 'journal.html';
                    break;
                case 'water tracker':
                    window.location.href = 'water-tracker.html';
                    break;
                case 'star':
                    window.location.href = 'star.html';
                    break;
                case 'notes':
                    window.location.href = 'notes.html';
                    break;
                case 'achievements':
                    window.location.href = 'achievements.html';
                    break;
                case 'credits':
                    window.location.href = 'credits.html';
                    break;
            }
        });
    });
});