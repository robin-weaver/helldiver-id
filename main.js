const canvas = document.getElementById('idCanvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  console.log('Click coordinates:', `X: ${x}, Y: ${y}`);
});

// Base image URL
const baseImageUrl = '/assets/id-template.jpg';

// Load and draw the base image
const baseImage = new Image();
baseImage.src = baseImageUrl;
baseImage.onload = function() {
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
}


function generateID() {
    // Clear canvas and redraw base image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    
    // Draw text inputs
    const name = document.getElementById('nameInput').value;
    const rank = document.getElementById('rankInput').value;
    const title = document.getElementById('titleInput').value;
    const unit = document.getElementById('unitInput').value;
    const ship = document.getElementById('shipInput').value;
    const steam = document.getElementById('steamInput').value;
    const psn = document.getElementById('psnInput').value;
    ctx.font = "12px Waiting Summer";
    ctx.fillText(name, 165, 57);
    ctx.fillText(rank, 165, 87);
    ctx.fillText(title, 165, 113);
    ctx.font = "10px Waiting Summer";
    ctx.fillText(unit, 157, 142);
    ctx.fillText(ship, 157, 170);

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0'); // Pad with leading zero if necessary
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed

    const yyyy = today.getFullYear();

    const formattedDate = dd + '/' + mm + '/' + yyyy;

    // Handle and draw the ID photo
    const photoUpload = document.getElementById('photoUpload');
    const reader = new FileReader();
    reader.onload = function(e) {
        const userPhoto = new Image();
        userPhoto.onload = function() {
            ctx.drawImage(userPhoto, 50, 100, 100, 100); // Adjust size and position as needed
        }
        userPhoto.src = e.target.result;
    }
    if (photoUpload.files[0]) {
        reader.readAsDataURL(photoUpload.files[0]);
    }
}

// Optionally call generateID() here to initialize with default/base image
generateID();