function uploadFiles() {
    const input = document.getElementById('fileInput');
    const status = document.getElementById('uploadStatus');
    const summaries = document.getElementById('summaries');
    
    if (input.files.length === 0) {
        status.innerText = 'No files selected.';
        return;
    }

    status.innerText = 'Uploading...';
    
    const formData = new FormData();
    for (let i = 0; i < input.files.length; i++) {
        formData.append('files', input.files[i]);
    }
    
    fetch('/upload', {
        method: 'POST',
        body: formData
    }).then(response => response.json()).then(data => {
        status.innerText = 'Upload successful!';
        summaries.innerHTML = '';
        data.summaries.forEach(summary => {
            const summaryDiv = document.createElement('div');
            summaryDiv.innerText = summary;
            summaries.appendChild(summaryDiv);
        });
    }).catch(error => {
        console.error('Error:', error);
        status.innerText = 'Upload failed.';
    });
}

function askQuestion() {
    const query = document.getElementById('userQuery').value;
    const chatOutput = document.getElementById('chatOutput');

    if (!query) {
        chatOutput.innerHTML = 'Please enter a question.';
        return;
    }

    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: query })
    }).then(response => response.json()).then(data => {
        const answerDiv = document.createElement('div');
        answerDiv.innerText = data.answer;
        chatOutput.appendChild(answerDiv);
    }).catch(error => {
        console.error('Error:', error);
        chatOutput.innerHTML = 'Failed to get an answer.';
    });
}
