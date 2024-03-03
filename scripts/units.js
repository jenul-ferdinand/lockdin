document.addEventListener("DOMContentLoaded", function() {

    // Load the link buttons from chrome storage
    loadMoodleLinks();

    // FUNCTION: Add the moodle link to the chrome storage
    function addMoodleLink(moodleLink, unitName) {
        // Get existing links from Chrome Storage
        chrome.storage.local.get({ moodleLinks: [], unitNames: [] }, function(data) {
            const existingLinks = data.moodleLinks;
            const existingUnitNames = data.unitNames;

            // Check if the link is not already in the array
            if (!existingLinks.includes(moodleLink)) {
                // Add the new link and unit name to their respective arrays
                existingLinks.push(moodleLink);
                existingUnitNames.push(unitName);

                // Save the updated arrays back to Chrome Storage
                chrome.storage.local.set({ moodleLinks: existingLinks, unitNames: existingUnitNames }, function() {
                    // Optionally, can perform additional actions after saving
                    console.log("Moodle link added to Chrome Storage:", moodleLink);
                    console.log("Unit name added to Chrome Storage:", unitName);

                    // Refresh the displayed links from Chrome Storage
                    loadMoodleLinks();
                });
            } else {
                // Optionally, notify the user or handle the case where the link already exists
                console.log("Moodle link already exists in Chrome Storage:", moodleLink)
                alert("This link already exists");
            }
        });
    }

    // FUNCTION: Remove the moodle link from the chrome storage
    function removeMoodleLink(moodleLink) {
        // Remove from Chrome storage
        chrome.storage.local.get({ moodleLinks: [], unitNames: [] }, function (data) {
            const updatedLinks = data.moodleLinks.filter(link => link !== moodleLink);
            const updatedUnitNames = data.unitNames.filter((_, index) => data.moodleLinks[index] !== moodleLink);

            chrome.storage.local.set({ 'moodleLinks': updatedLinks, 'unitNames': updatedUnitNames }, function() {
                // Remove from the DOM
                const buttonToRemove = document.querySelector(`button[data-link="${moodleLink}"]`);
                if (buttonToRemove) {
                    buttonToRemove.remove();
                }

                // Refresh the displayed links from Chrome Storage
                loadMoodleLinks();

                // DEBUG
                console.log("Removed Moodle Link:", moodleLink);
            });
        });
    }

    // FUNCTION: load Moodle links from storage and display them
    function loadMoodleLinks() {
        // Get Moodle links and unit names from Chrome Storage
        chrome.storage.local.get({ moodleLinks: [], unitNames: [] }, function(data) {
            const moodleLinks = data.moodleLinks;
            const unitNames = data.unitNames;

            // Clear the existing buttons in the sidebar
            clearSidebar();

            // Create buttons for each Moodle link
            moodleLinks.forEach(function(moodleLink, index) {
                createMoodleLinkButton(moodleLink, unitNames[index]);
            });

            // DEBUG
            console.log("Loaded Moodle links and buttons:", moodleLinks);
        });
    }

    // FUNCTION: Clear the side bar
    function clearSidebar() {
        // Get the side bar element 
        const sidebar = document.getElementById("sidebar");
    
        // Clear the side bar
        sidebar.innerHTML = "";

        // Create the heading
        const heading = document.createElement('h1');
        heading.innerHTML = "Monash Units 📘";
        heading.style.textAlign = "right"

        // Recreate the "Add Moodle Link" button
        const addMoodleLinkButton = document.createElement("button");
        addMoodleLinkButton.textContent = "Add Moodle Link";
        addMoodleLinkButton.id = "addMoodleLinkButton";

        // Add event listener to the "Add Moodle Link" button
        addMoodleLinkButton.addEventListener('click', function() {
            // Prompt the user to enter a Moodle link and a Unit name
            const moodleLink = prompt('Enter the Moodle link:\n\n(Note: Middle Click the unit button to remove)');
            const unitName = prompt('Enter Unit name:\n\n(Note: Middle Click the unit button to remove)');

            // Add the moodle link if it exists
            if (moodleLink) {
                addMoodleLink(moodleLink, unitName);
            }
        });

        // Append the heading to the sidebar
        sidebar.appendChild(heading)
        // Append the "Add Moodle Link" button to the sidebar
        sidebar.appendChild(addMoodleLinkButton);
    }

    // FUNCTION: Create a button for a Moodle link
    function createMoodleLinkButton(moodleLink, unitName) {
        var button = document.createElement("button");
        button.textContent = unitName || "Unit Link"; // Use unitName if available, otherwise default to "Unit Link"
        button.dataset.link = moodleLink;
        button.classList.add("moodle-link");

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
