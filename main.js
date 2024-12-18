// GSAP animations for page load
gsap.from('.logo', { duration: 1, opacity: 0, x: -50 });
gsap.from('.menu-div', { duration: 1, opacity: 0, x: 50 });
gsap.from('.title', { duration: 1, opacity: 0, y: -50 });
gsap.from('.description, .form-group', { duration: 1, opacity: 0, y: 20, stagger: 0.2 });

// DOM elements for menu functionality
const menuBtn = document.querySelector(".menu-div");
const exitBtn = document.querySelector(".exit");

let t1 = gsap.timeline({ paused: true });
t1.to(".menu", { opacity: 1, duration: 1, top: 0, ease: Power2.easeInOut });
t1.to(
    ".nav",
    {
        opacity: 1,
        marginBottom: 0,
        duration: 1,
        ease: Power2.easeInOut,
        stagger: 0.3,
    },
    ">-0.5"
);

menuBtn.addEventListener("click", () => {
    t1.play().timeScale(1);
});

exitBtn.addEventListener("click", () => {
    t1.timeScale(2.5);
    t1.reverse();
});

// DOM elements for ID Card generation
const nameInput = document.getElementById('name');
const branchInput = document.getElementById('branch');
const batchInput = document.getElementById('batch-year');
const dobInput = document.getElementById('dob');
const pictureInput = document.getElementById('profile-picture');
const previewImage = document.getElementById('card-image');
const cardName = document.getElementById('card-name');
const cardBranch = document.getElementById('card-branch');
const cardBatch = document.getElementById('card-batch');
const cardDob = document.getElementById('card-dob');
const previewCard = document.getElementById('id-card-container');
const downloadButton = document.getElementById('download-btn');

// Generate ID card preview
document.getElementById('generate-btn').addEventListener('click', () => {
    if (nameInput.value && branchInput.value && batchInput.value && dobInput.value && pictureInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (event) {
            previewImage.src = event.target.result;

            // Set card details
            cardName.textContent = `Name: ${nameInput.value}`;
            cardBranch.textContent = `Branch: ${branchInput.value}`;
            cardBatch.textContent = `Batch Year: ${batchInput.value}`;
            cardDob.textContent = `D.O.B: ${dobInput.value}`;
            
            // Show preview card
            previewCard.classList.remove('hidden');
            gsap.fromTo(previewCard, { opacity: 0, scale: 0.8 }, { duration: 0.5, opacity: 1, scale: 1 });
        };
        reader.readAsDataURL(pictureInput.files[0]);
    } else {
        alert('Please fill out all fields!');
    }
});


// Download ID card as PNG
downloadButton.addEventListener('click', () => {
    htmlToImage.toPng(previewCard)
        .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = `ID-Card-${nameInput.value}.png`;
            link.href = dataUrl;
            link.click();
        })
        .catch((error) => {
            console.error('Error generating the PNG:', error);
            alert('Failed to download the ID card. Please try again.');
        });
});
