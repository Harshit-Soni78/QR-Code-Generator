// Include qrcode.js library in your HTML file before using this script.
// Example: <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('qrForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const url = document.getElementById('urlInput').value;
        generateQRCode(url);
    });
});

function generateQRCode(url) {
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    qrCodeContainer.innerHTML = ''; // Clear previous QR codes
    
    // Create new QR code with margin
    const qrCode = new QRCode(qrCodeContainer, {
        text: url,
        width: 500,
        height: 500,
        correctLevel: QRCode.CorrectLevel.H // Higher error correction for margin
    });

    // Center QR code and add white border
    qrCodeContainer.style.display = 'flex';
    qrCodeContainer.style.justifyContent = 'center';
    qrCodeContainer.style.alignItems = 'center';
    qrCodeContainer.style.backgroundColor = 'white';
    qrCodeContainer.style.padding = '20px';
    qrCodeContainer.style.borderRadius = '10px';

    // Show download buttons
    document.getElementById('downloadButtons').style.display = 'block';
    
    // Delay download button setup to ensure QR code is generated
    setTimeout(() => setupDownloadButtons(), 500);
}

function setupDownloadButtons() {
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const imgElement = qrCodeContainer.querySelector('img');
    
    if (imgElement) {
        document.getElementById('downloadPng').addEventListener('click', function () {
            const pixelSize = prompt("Enter the pixel size for the QR code (default is 500):", "500");
            const size = pixelSize ? parseInt(pixelSize) : 500;
            downloadImage(imgElement.src, 'qrcode.png', size);
        });
    }
}

function downloadImage(dataUrl, filename, size) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = dataUrl;
    img.onload = function () {
        canvas.width = size + 40;
        canvas.height = size + 40;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20, size, size); // Center QR with padding
        const newDataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = newDataUrl;
        link.download = filename;
        link.click();
    };
}