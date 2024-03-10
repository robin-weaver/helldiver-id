const canvas = document.getElementById('idCanvas');
canvas.width = 960;
canvas.height = 540
const ctx = canvas.getContext('2d');


canvas.addEventListener("click", function(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  console.log("Click coordinates:", x, y);
});

const type1TempUrl = 'id-template.jpg'
const type2TempUrl = 'id-template-2.webp'
let baseImageUrl = type1TempUrl


const defaultPhotoUrl = 'default-helldiver.png'
const defaultPatchUrl = 'default-patch.jpg'
let baseImage;
let idType = '1';

const type1Measurements = {
    font: "32px Waiting Summer",
    fillStyle: 'black',
    name: {
        x: 396,
        y: 125,
        maxWidth: 290
    },
    rank: {
        x: 396,
        y: 188,
        maxWidth: 290
    },
    title: {
        x: 396,
        y: 249,
        maxWidth: 290
    },
    unit: {
        x: 375,
        y: 310,
        maxWidth: 310
    },
    ship: {
        x: 375,
        y: 370,
        maxWidth: 310
    },
    hdImage: {
        x: 45,
        y: 14,
        width: 222,
        height: 258
    },
    patchImage: {
        x: 65,
        y: 314,
        width: 134,
        height: 133
    }
}

const type2Measurements = {
    font: "32px Timeless",
    fillStyle: 'white',
    name: {
        x: 292,
        y: 270,
        maxWidth: 250
    },
    rank: {
        x: 430,
        y: 205,
        maxWidth: 100
    },
    unit: {
        x: 292,
        y: 420,
        maxWidth: 250
    },
    ship: {
        x: 292,
        y: 485,
        maxWidth: 250
    },
    hdImage: {
        x: 48,
        y: 43,
        width: 216,
        height: 238
    },
    patchImage: {
        x: 48,
        y: 325,
        width: 216,
        height: 172
    }
}

const types = {
    1: type1Measurements,
    2: type2Measurements
}

let type = type1Measurements


function generateID() {
    type = types[idType]
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
    const seaf = document.getElementById('seafIDInput').value;
    const pay = document.getElementById('payInput').value;

    ctx.font = type.font
    ctx.fillStyle = type.fillStyle
    ctx.fillText(name, type.name.x, type.name.y, type.name.maxWidth);
    ctx.fillText(rank, type.rank.x, type.rank.y, type.rank.maxWidth);

    ctx.fillText(unit, type.unit.x, type.unit.y, type.unit.maxWidth);
    ctx.fillText(ship, type.ship.x, type.ship.y, type.ship.maxWidth);
    if (idType === '1') {
        ctx.fillText(title, type.title.x, type.title.y, type.title.maxWidth);
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0'); // Pad with leading zero if necessary
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const yyyy = today.getFullYear();
        const formattedDate = dd + '/' + mm + '/' + yyyy;
        ctx.fillText(formattedDate, 208, 514, 155)
        ctx.fillText(steam, 534, 514, 160)
        ctx.fillText(psn, 780, 514, 160)
    } else if (idType === '2') {
        ctx.fillText(seaf, 607, 485, 300)
        ctx.fillText(pay, 292, 205, 100)
        ctx.fillStyle = 'black'
        ctx.font = '24px Timeless'
        ctx.fillText('template by TurtleDump', 700, 527, 300)
    }


    processPhoto();
}

function processPhoto() {
    type = types[idType]
    const photoUpload = document.getElementById('photoUpload');
    if (photoUpload.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const userPhoto = new Image();
            userPhoto.onload = function() {
                drawCroppedImage(userPhoto, type.hdImage.x, type.hdImage.y);
            }
            userPhoto.src = e.target.result;
        }
        reader.readAsDataURL(photoUpload.files[0]);
    } else {
        const userPhoto = new Image();
        userPhoto.onload = function() {
            drawCroppedImage(userPhoto, type.hdImage.x, type.hdImage.y);
        }
        userPhoto.src = defaultPhotoUrl;
    }
    const patchUpload = document.getElementById('patchUpload');
    if (patchUpload.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const patchPhoto = new Image();
            patchPhoto.onload = function() {
                drawCroppedImage(patchPhoto, type.patchImage.x, type.patchImage.y, 'patch');
            }
            patchPhoto.src = e.target.result;
        }
        reader.readAsDataURL(patchUpload.files[0]);
    } else {
        const patchPhoto = new Image();
        patchPhoto.onload = function() {
            drawCroppedImage(patchPhoto, type.patchImage.x, type.patchImage.y, 'patch');
        }
        patchPhoto.src = defaultPatchUrl;
    }
}


function drawCroppedImage(image, dx, dy, imgtype = 'diver') {
    type = types[idType]
    let desiredWidth, desiredHeight;
    if (imgtype === 'diver') {
        desiredWidth = type.hdImage.width;
        desiredHeight = type.hdImage.height;
    } else if (imgtype === 'patch') {
        desiredWidth = type.patchImage.width;
        desiredHeight = type.patchImage.height;
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

    // change these to crop from center or top left
    const srcX = 0 //(image.width - (image.height * desiredAspectRatio)) / 2;
    const srcY = 0 //(image.height - (image.width / desiredAspectRatio)) / 2;
    const srcWidth = dWidth < image.width ? image.width : dWidth;
    const srcHeight = dHeight < image.height ? image.height : dHeight;
    if(srcX < 0) {
        ctx.drawImage(image, 0, srcY, image.width, srcHeight - srcY, dx, dy, desiredWidth, desiredHeight);
    } else {
        ctx.drawImage(image, srcX, 0, srcWidth - srcX, image.height, dx, dy, desiredWidth, desiredHeight);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    resetCanvas()
    const radios = document.querySelectorAll('input[type="radio"][name="idType"]');
    radios.forEach(radio => {
        radio.addEventListener('change', event => {
            idType = event.target.value;
            if (idType === "1") {
                baseImageUrl = type1TempUrl
                document.querySelectorAll('.type1').forEach(el => {
                    el.style.display = 'flex'
                    el.style.flexDirection = 'column'
                })
                document.querySelectorAll('.type2').forEach(el => {
                    el.style.display = 'none'
                })
            } else if (idType === "2") {
                baseImageUrl = type2TempUrl
                document.querySelectorAll('.type2').forEach(el => {
                    el.style.display = 'flex'
                    el.style.flexDirection = 'column'
                })
                document.querySelectorAll('.type1').forEach(el => {
                    el.style.display = 'none'
                })
            }
            resetCanvas()
        });
    });
});

function resetCanvas() {
    baseImage = new Image();
    baseImage.src = baseImageUrl;
    baseImage.onload = function() {
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
        setTimeout(generateID, 10);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
}
