const canvas = document.getElementById('idCanvas');
const ctx = canvas.getContext('2d');

const baseImageUrl = 'id-template.jpg';

const baseImage = new Image();
baseImage.src = baseImageUrl;
baseImage.onload = function() {
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    setTimeout(generateID, 10);
}

const defaultPhotoUrl = 'default-helldiver.png'


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

    ctx.font = "32px Waiting Summer";
    ctx.fillText(name, 396, 125, 290);
    ctx.fillText(rank, 396, 188);
    ctx.fillText(title, 396, 249, 290);
    ctx.fillText(unit, 375, 310, 310);
    ctx.fillText(ship, 375, 370, 310);
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0'); // Pad with leading zero if necessary
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const yyyy = today.getFullYear();
    const formattedDate = dd + '/' + mm + '/' + yyyy;
    ctx.fillText(formattedDate, 208, 514, 155)
    ctx.fillText(steam, 534, 514, 160)
    ctx.fillText(psn, 780, 514, 160)

    processPhoto();
}

function processPhoto() {
    const photoUpload = document.getElementById('photoUpload');
    if (photoUpload.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const userPhoto = new Image();
            userPhoto.onload = function() {
                drawCroppedImage(userPhoto, 45, 14);
            }
            userPhoto.src = e.target.result;
        }
        reader.readAsDataURL(photoUpload.files[0]);
    } else {
        const userPhoto = new Image();
        userPhoto.onload = function() {
            drawCroppedImage(userPhoto, 45, 14);
        }
        userPhoto.src = defaultPhotoUrl;
    }
    const patchImage = new Image();
    patchImage.onload = function() {
        drawCroppedImage(patchImage, 65, 314, 'patch')
    }
    patchImage.src = 'default-patch.jpg'
}


function drawCroppedImage(image, dx, dy, type = 'diver') {
    let desiredWidth, desiredHeight;
    if (type === 'diver') {
        desiredWidth = 222;
        desiredHeight = 258;
    } else if (type === 'patch') {
        desiredWidth = 134;
        desiredHeight = 133;
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
