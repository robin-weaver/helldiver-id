const canvas = document.getElementById('idCanvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  console.log('Click coordinates:', `X: ${x}, Y: ${y}`);
});

const baseImageUrl = '/docs/assets/id-template.jpg';

const baseImage = new Image();
baseImage.src = baseImageUrl;
baseImage.onload = function() {
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
}

const defaultPhotoUrl = '/docs/assets/default-helldiver.png'


function generateID() {
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

    ctx.font = "16px Waiting Summer";
    ctx.fillText(rank, 165, 87);
    ctx.font = "12px Waiting Summer";
    ctx.fillText(name, 165, 57);

    ctx.fillText(title, 165, 113);
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0'); // Pad with leading zero if necessary
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const yyyy = today.getFullYear();
    const formattedDate = dd + '/' + mm + '/' + yyyy;
    ctx.fillText(formattedDate, 88, 238)

    ctx.font = "10px Waiting Summer";
    ctx.fillText(unit, 157, 142);
    ctx.fillText(ship, 157, 170);
    ctx.fillText(steam, 223, 238)
    ctx.fillText(psn, 325, 238)

    processPhoto();
}

function processPhoto() {
    const photoUpload = document.getElementById('photoUpload');
    if (photoUpload.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const userPhoto = new Image();
            userPhoto.onload = function() {
                drawCroppedImage(userPhoto, 18, 6);
            }
            userPhoto.src = e.target.result;
        }
        reader.readAsDataURL(photoUpload.files[0]);
    } else {
        const userPhoto = new Image();
        userPhoto.onload = function() {
            drawCroppedImage(userPhoto, 18, 6);
        }
        userPhoto.src = defaultPhotoUrl;
    }
    const shipImage = new Image();
    shipImage.onload = function() {
        drawCroppedImage(shipImage, 28, 145, 'ship')
    }
    shipImage.src = '/docs/assets/default-ship.png'
}


function drawCroppedImage(image, dx, dy, type = 'diver') {
    let desiredWidth, desiredHeight;
    if (type === 'diver') {
        desiredWidth = 93;
        desiredHeight = 120;
    } else if (type === 'ship') {
        desiredWidth = 55;
        desiredHeight = 63;
    }

    let dWidth, dHeight;
    const imageAspectRatio = image.width / image.height;
    const desiredAspectRatio = desiredWidth / desiredHeight;
    if (imageAspectRatio > desiredAspectRatio) {
        dHeight = desiredHeight;
        dWidth = image.width / (image.height / desiredHeight);
    } else {
        dWidth = desiredWidth;
        dHeight = image.height / (image.width / desiredWidth);
    }

    const srcX = (image.width - (image.height * desiredAspectRatio)) / 2;
    const srcY = (image.height - (image.width / desiredAspectRatio)) / 2;
    const srcWidth = dWidth < image.width ? image.width : dWidth;
    const srcHeight = dHeight < image.height ? image.height : dHeight;
    if(srcX < 0) {
        ctx.drawImage(image, 0, srcY, image.width, srcHeight - srcY, dx, dy, desiredWidth, desiredHeight);
    } else {
        ctx.drawImage(image, srcX, 0, srcWidth - srcX, image.height, dx, dy, desiredWidth, desiredHeight);
    }
}
setTimeout(generateID, 10)
