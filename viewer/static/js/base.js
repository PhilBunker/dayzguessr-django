
document.addEventListener('DOMContentLoaded', function() {
    const gameImages = document.querySelectorAll('.game-image');
    const topBar = document.querySelector('.top-bar');

    let selectedGame = null; // Keep track of the currently selected game

    gameImages.forEach(image => {
        image.addEventListener('click', function() {
            // Remove 'selected-game' class from any previously selected game
            if (selectedGame) {
                selectedGame.classList.remove('selected-game');
                // Hide previously shown map selection
                const prevMapSelection = document.querySelector(`.map-selection.visible`);
                if (prevMapSelection) {
                    prevMapSelection.classList.remove('visible');
                }
            }

            // Toggle 'selected-game' class on the clicked game image
            this.classList.add('selected-game');
            selectedGame = this; // Update the currently selected game

            // Show the map selection for the clicked game
            const game = this.dataset.game;
            const mapSelection = document.querySelector(`.map-selection[data-game="${game}"]`);
            if (mapSelection) {
                mapSelection.classList.add('visible');
            }

             // Expand the top bar if it's not already hovered
            if (!topBar.matches(':hover')) {
                topBar.classList.add('force-hover'); //temporary class
                //use a small delay to set style so transition occurs
                setTimeout(() => {
                    topBar.style.height = '150px'; // Or any other expanded height
                     // Remove the temporary class after the transition
                    setTimeout(() => {
                        topBar.classList.remove('force-hover');
                    }, 300); // This should match your CSS transition time
                }, 10);

            }

        });

        //Mouse enter and leave events to correctly size images
        image.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected-game')) {
                this.style.height = '140px'; // Enlarge on hover
            }
        });

        image.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected-game')) {
                this.style.height = '120px'; // Revert to normal size
            }
        });
    });

     // Add a listener to the top bar to reset sizes when it collapses
    topBar.addEventListener('transitionend', function() {
        if (parseFloat(topBar.style.height) <= 21 ) {  //topbar is small
            // Remove 'selected-game' class and reset image size
            if (selectedGame) {
                selectedGame.classList.remove('selected-game');
                selectedGame.style.height = '120px'; // Normal size
                selectedGame = null;
            }
             // Hide any visible map selection
            const mapSelection = document.querySelector('.map-selection.visible');
            if (mapSelection) {
                mapSelection.classList.remove('visible');
            }
        }
    });
});
