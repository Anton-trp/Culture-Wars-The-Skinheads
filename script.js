document.addEventListener('DOMContentLoaded', () => {
    const zonesSection = document.getElementById('zones');
    const mainElement = document.querySelector('main');
    let currentAudio = null; // Variable to store the current audio instance

    zonesSection.addEventListener('click', (event) => {
        if (event.target.classList.contains('listen-button')) {
            event.preventDefault(); // Prevent default button behavior (form submission)
            const audioUrl = event.target.dataset.audioUrl; // Get the audio URL
            const startTime = parseTime(event.target.dataset.audioStart); // Get and convert the start time
            const endTime = parseTime(event.target.dataset.audioEnd); // Get and convert the end time
            const zoneTitle = event.target.dataset.zoneTitle; // Get the zone title

            // Remove the previous audio player if it exists
            const existingPlayer = document.getElementById('audio-player-container');
            if (existingPlayer) {
                existingPlayer.remove();
                if (currentAudio) {
                    currentAudio.pause(); // Pause the previous audio
                    currentAudio.currentTime = 0; // Reset the playback position
                }
            }

            // Create the container for the audio player
            const audioPlayerContainer = document.createElement('div');
            audioPlayerContainer.id = 'audio-player-container';

            const titleElement = document.createElement('h3');
            titleElement.textContent = zoneTitle; // Display the zone title

            const audioElement = document.createElement('audio');
            audioElement.controls = true; // Display default browser controls
            const sourceElement = document.createElement('source');
            sourceElement.src = audioUrl; // Set the audio file source
            sourceElement.type = 'audio/mpeg'; // Set the audio file type (adjust if necessary)

            audioElement.appendChild(sourceElement);
            audioPlayerContainer.appendChild(titleElement);
            audioPlayerContainer.appendChild(audioElement);

            const backButton = document.createElement('a');
            backButton.href = '#zones';
            backButton.classList.add('back-button');
            backButton.textContent = 'Back to Zones'; // Text for the back button
            audioPlayerContainer.appendChild(backButton);

            mainElement.appendChild(audioPlayerContainer); // Add the audio player to the main section
            currentAudio = audioElement; // Update the current audio instance

            // Set the start time and play the audio
            currentAudio.currentTime = startTime;
            currentAudio.play();

            // Stop playback at the end of the excerpt
            currentAudio.addEventListener('timeupdate', () => {
                if (currentAudio.currentTime >= endTime) {
                    currentAudio.pause(); // Pause at the end
                    currentAudio.currentTime = startTime; // Reset to the start for the next listen
                }
            });

            // Scroll to the audio player
            audioPlayerContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // Function to convert a time string (MM:SS) to seconds
    function parseTime(timeString) {
        const parts = timeString.split(':');
        return parseInt(parts[0]) * 60 + parseFloat(parts[1]);
    }
});