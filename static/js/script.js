document.getElementById('qrForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const url = document.getElementById('urlInput').value;

    // Generate QR Code
    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {
        if (data.png && data.svg) {
            const qrCodeContainer = document.getElementById('qrCodeContainer');
            qrCodeContainer.innerHTML = `<img src="data:image/png;base64,${data.png}" alt="QR Code"><br><img src="data:image/svg+xml;base64,${data.svg}" alt="QR Code" style="display:none;">`;

            // Show download buttons
            const downloadButtons = document.getElementById('downloadButtons');
            downloadButtons.style.display = 'block';

            // Set up download buttons
            document.getElementById('downloadPng').addEventListener('click', function() {
                const link = document.createElement('a');
                link.href = `data:image/png;base64,${data.png}`;
                link.download = 'qrcode.png';
                link.click();
            });

            document.getElementById('downloadSvg').addEventListener('click', function() {
                const link = document.createElement('a');
                link.href = `data:image/svg+xml;base64,${data.svg}`;
                link.download = 'qrcode.svg';
                link.click();
            });
        } else {
            console.error('QR code data is missing');
        }
    })
    .catch(error => console.error('Error:', error));
});
