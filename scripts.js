// Dictionary for class colors
const classColors = {
    'Math': '#FFD700',
    'Science': '#ADFF2F',
    'History': '#00CED1',
    'English': '#FF69B4',
    // Add more classes and colors as needed
};

// Load entries from localStorage
function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.forEach(entry => {
        addEntryToDOM(entry);
    });
}

// Save entries to localStorage
function saveEntries(entries) {
    localStorage.setItem('entries', JSON.stringify(entries));
}

// Add an entry to the DOM
function addEntryToDOM(entry) {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');
    entryDiv.dataset.class = entry.className;  // Add class name as data attribute

    // Get color for class name
    const classColor = classColors[entry.className] || '#FFFFFF'; // Default to white if not found
    
    // Create document and video file URLs if available
    const docUrl = entry.docUrl ? entry.docUrl : '';
    const videoUrl = entry.videoUrl ? entry.videoUrl : '';

    // Add content to entry
    entryDiv.innerHTML = `
        <h3 style="color: ${classColor}">${entry.className} - ${entry.date}</h3>
        <p>${entry.notes}</p>
        ${entry.docUrl ? `<p>Document: <a href="${docUrl}" target="_blank">${entry.docName}</a></p>` : ''}
        ${entry.videoUrl ? `<p>Video: <a href="${videoUrl}" target="_blank">${entry.videoName}</a></p>` : ''}
        <button class="delete-btn">Delete Entry</button>
    `;

    // Add event listener for delete button
    entryDiv.querySelector('.delete-btn').addEventListener('click', function() {
        removeEntryFromLocalStorage(entry.id);
        entryDiv.remove();
    });

    // Add entry to entries section
    document.getElementById('entries').appendChild(entryDiv);
}

// Remove an entry from localStorage
function removeEntryFromLocalStorage(id) {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const updatedEntries = entries.filter(entry => entry.id !== id);
    saveEntries(updatedEntries);
}

// Handle form submission
document.getElementById('log-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const date = document.getElementById('date').value;
    const className = document.getElementById('class-name').value;
    const notes = document.getElementById('notes').value;
    const docFile = document.getElementById('upload-doc').files[0];
    const videoFile = document.getElementById('upload-video').files[0];

    // Generate unique ID for the entry
    const id = Date.now();

    // Create document and video file URLs if available
    const docUrl = docFile ? URL.createObjectURL(docFile) : '';
    const videoUrl = videoFile ? URL.createObjectURL(videoFile) : '';

    // Create entry object
    const entry = {
        id,
        date,
        className,
        notes,
        docUrl,
        videoUrl,
        docName: docFile ? docFile.name : '',
        videoName: videoFile ? videoFile.name : ''
    };

    // Add entry to DOM
    addEntryToDOM(entry);

    // Save entry to localStorage
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    saveEntries(entries);

    // Clear form fields
    document.getElementById('log-form').reset();
});

// Filter entries by class
document.querySelectorAll('#class-list a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const className = this.dataset.class;
        filterEntriesByClass(className);
    });
});

function filterEntriesByClass(className) {
    const entries = document.querySelectorAll('.entry');
    entries.forEach(entry => {
        if (entry.dataset.class === className || className === 'all') {
            entry.style.display = 'block';
        } else {
            entry.style.display = 'none';
        }
    });
}

// Initial load of entries
loadEntries();
