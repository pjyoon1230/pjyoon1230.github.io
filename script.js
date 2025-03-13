const torch = document.querySelector(".torch-overlay");
const textElements = document.querySelectorAll("h1, p");

// Variables for torch movement
let torchX = window.innerWidth / 2;
let torchY = window.innerHeight / 2;
let targetX = torchX;
let targetY = torchY;

function updateTorchPosition() {
    const speed = 0.1;
    torchX += (targetX - torchX) * speed;
    torchY += (targetY - torchY) * speed;

    // Update the torchlight position
    torch.style.background = `radial-gradient(circle at ${torchX}px ${torchY}px, 
        rgba(255, 140, 0, 0.8) 20%, 
        rgba(0, 0, 0, 0.95) 30%)`;

    // Check if the torch is close to text and reveal it
    textElements.forEach(text => {
        const rect = text.getBoundingClientRect();
        const textCenterX = rect.left + rect.width / 2;
        const textCenterY = rect.top + rect.height / 2;
        const distance = Math.hypot(textCenterX - torchX, textCenterY - torchY);

        // Reveal text if within the torchlight radius
        if (distance < 150) {
            text.style.textShadow = "0 0 15px rgba(255, 255, 255, 1)";
        } else {
            text.style.textShadow = "0 0 15px rgba(255, 255, 255, 0)";
        }
    });

    requestAnimationFrame(updateTorchPosition);
}

// Track cursor movement
document.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
});

document.addEventListener("scroll", () => {
    targetY += window.scrollY - torchY; // Adjust torch position while scrolling
});

// Start the animation loop
updateTorchPosition();

