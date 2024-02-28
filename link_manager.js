document.addEventListener("DOMContentLoaded", function() {

    // Load the link buttons from chrome storage
    loadMoodleLinks();

    // Get and listen for click for the moodle link button
    document.getElementById('addMoodleLinkButton').addEventListener('click', function() {
        
        // Prompt the user to enter a Moodle link
        const moodleLink = prompt('Enter the Moodle link:');

        // Add the moodle link if it exists
        if (moodleLink) {
            // Add the moodle links to chrome storage
            addMoodleLink(moodleLink);

            // Refresh the displayed links from chrome storage
            loadMoodleLinks();
        }
    });

    // Add the moodle link to the chrome storage
    function addMoodleLink(moodleLink) {
        // Get existing links from Chrome Storage
        chrome.storage.local.get({ moodleLinks: [] }, function(data) {
            const existingLinks = data.moodleLinks;

            // Check if the link is not already in the array
            if (!existingLinks.includes(moodleLink)) {
                // Add the new link to the array
                existingLinks.push(moodleLink);

                // Save the updated array back to Chrome Storage
                chrome.storage.local.set({ moodleLinks: existingLinks }, function() {
                    // Optionally, can perform additional actions after saving
                    console.log("Moodle link added to Chrome Storage:", moodleLink);

                    // Refresh the displayed links from Chrome Storage
                    loadMoodleLinks();
                });
            } else {
                // Optionally, notify the user or handle the case where the link already exists
                console.log("Moodle link already exists in Chrome Storage:", moodleLink)
            }
        });
    }

    // Remove the moodle link from the chrome storage
    function removeMoodleLink(moodleLink) {
        // Remove from Chrome storage
        chrome.storage.local.get("moodleLinks", function (data) {
            const updatedLinks = data.moodleLinks.filter(link => link !== moodleLink);
            chrome.storage.local.set({ 'moodleLinks': updatedLinks });

            // Remove from the DOM
            const buttonToRemove = document.querySelector(`button[data-link="${moodleLink}"]`);
            if (buttonToRemove) {
                buttonToRemove.remove();
            }

            // Refresh the displayed links from chrome storage
            loadMoodleLinks();

            // DEBUG
            console.log("Removed Moodle Link:", moodleLink);
        });

        
    }

    // Function to load Moodle links from storage and display them
    function loadMoodleLinks() {
        // Get Moodle links from Chrome Storage
        chrome.storage.local.get({ moodleLinks: [] }, function(data) {
            const moodleLinks = data.moodleLinks;

            // Clear the existing buttons in the sidebar
            clearSidebar();

            // Create buttons for each Moodle link
            moodleLinks.forEach(function(moodleLink) {
                createMoodleLinkButton(moodleLink);
            });

            // DEBUG
            console.log("Loaded Moodle links and buttons:", moodleLinks);
        });
    }

    // Function to clear the sidebar
    function clearSidebar() {
        const sidebar = document.getElementById("sidebar");
        sidebar.innerHTML = "";

        // Recreate the "Add Moodle Link" button
        const addMoodleLinkButton = document.createElement("button");
        addMoodleLinkButton.textContent = "Add Moodle Link";
        addMoodleLinkButton.id = "addMoodleLinkButton";

        // Add event listener to the "Add Moodle Link" button
        addMoodleLinkButton.addEventListener('click', function() {
            // Prompt the user to enter a Moodle link
            const moodleLink = prompt('Enter the Moodle link:');

            // Add the moodle link if it exists
            if (moodleLink) {
                addMoodleLink(moodleLink);
            }
        });

        // Append the "Add Moodle Link" button to the sidebar
        sidebar.appendChild(addMoodleLinkButton);
    }

    // Function to create a button for a Moodle link
    function createMoodleLinkButton(moodleLink) {
        var button = document.createElement("button");
        button.textContent = "Unit Link";
        button.dataset.link = moodleLink;

        button.addEventListener("mousedown", function (event) {
            // Check if the middle mouse button is clicked (button value 1)
            if (event.button === 1) {
                // Remove the corresponding Moodle link
                removeMoodleLink(moodleLink);
            } else {
                // Open the link in a new tab for left and right clicks
                window.open(moodleLink, "_blank");
            }
        });

        // Append the button to the sidebar
        const sidebar = document.getElementById("sidebar");
        sidebar.appendChild(button);
    }

});