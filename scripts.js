document.getElementById('log-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const date = document.getElementById('date').value;
    const className = document.getElementById('class-name').value;
    const notes = document.getElementById('notes').value;
    const docFile = document.getElementById('upload-doc').files[0];
    const videoFile = document.getElementById('upload-video').files[0];

    // Create entry element
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');
    
    // Create document and video file URLs if available
    const docUrl = docFile ? URL.createObjectURL(docFile) : '';
    const videoUrl = videoFile ? URL.createObjectURL(videoFile) : '';

    // Add content to entry
    entryDiv.innerHTML = `
        <h3>${className} - ${date}</h3>
        <p>${notes}</p>
        ${docFile ? `<p>Document: <a href="${docUrl}" target="_blank">${docFile.name}</a></p>` : ''}
        ${videoFile ? `<p>Video: <a href="${videoUrl}" target="_blank">${videoFile.name}</a></p>` : ''}
    `;

    // Add entry to entries section
    document.getElementById('entries').appendChild(entryDiv);

    // Clear form fields
    document.getElementById('log-form').reset();
});
