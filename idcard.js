// GSAP animations
gsap.from('.logo', { duration: 1, opacity: 0, x: -50 });
gsap.from('.menu-div', { duration: 1, opacity: 0, x: 50 });
gsap.from('.title', { duration: 1, opacity: 0, y: -50 });
gsap.from('.description, .form-group', { duration: 1, opacity: 0, y: 20, stagger: 0.2 });

// DOM elements
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
    // Check if all fields are filled
    if (nameInput.value && branchInput.value && batchInput.value && dobInput.value && pictureInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (event) {
            previewImage.src = event.target.result;
        };
        reader.readAsDataURL(pictureInput.files[0]);

        cardName.textContent = `Name: ${nameInput.value}`;
        cardBranch.textContent = `Branch: ${branchInput.value}`;
        cardBatch.textContent = `Batch Year: ${batchInput.value}`;
        cardDob.textContent = `D.O.B: ${dobInput.value}`;

        // Show the ID card container
        previewCard.classList.remove('hidden');
        previewCard.style.display = 'block';

        // Add animation using GSAP
        gsap.fromTo(previewCard, { opacity: 0, scale: 0.8 }, { duration: 0.5, opacity: 1, scale: 1 });
    } else {
        alert('Please fill out all fields!');
    }
});


// Download ID card
downloadButton.addEventListener('click', () => {
    // Temporarily hide the download button
    downloadButton.style.display = 'none';

    // Adjust the container to fit its content and center it
    previewCard.style.display = 'flex';
    previewCard.style.justifyContent = 'center';
    previewCard.style.alignItems = 'center';

    // Generate the ID card image
    htmlToImage.toPng(previewCard)
        .then((dataUrl) => {
            // Create a link and trigger download
            const link = document.createElement('a');
            link.download = `ID-Card-${nameInput.value}.png`;
            link.href = dataUrl;
            link.click();
        })
        .catch((error) => {
            console.error('Error generating the PNG:', error);
            alert('Failed to download the ID card. Please try again.');
        })
        .finally(() => {
            // Restore the button's visibility
            downloadButton.style.display = 'block';

            // Reset the container size to original
            previewCard.style.display = '';
            previewCard.style.justifyContent = '';
            previewCard.style.alignItems = '';
        });
});
