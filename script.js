let sentence = document.getElementById("sentence").innerText;
let inputBox = document.getElementById("inputBox");
let result = document.getElementById("result");
let restartBtn = document.getElementById("restartBtn");

let startTime, interval;

// Function to update speed in real-time
function updateSpeed() {
    if (startTime) {
        let currentTime = new Date().getTime();
        let timeTaken = (currentTime - startTime) / 1000; // Convert to seconds
        let wordsTyped = inputBox.value.split(" ").length;
        let speed = Math.round((wordsTyped / timeTaken) * 60); // WPM

        // Display real-time speed
        result.innerHTML = `Speed: ${speed} WPM`;
    }
}

// Start timing when user starts typing
inputBox.addEventListener("input", function() {
    if (!startTime) {
        startTime = new Date().getTime(); // Capture start time
        interval = setInterval(updateSpeed, 500); // Update speed every 0.5 sec
    }

    let typedText = inputBox.value;

    // When user completes typing
    if (typedText === sentence) {
        clearInterval(interval); // Stop updating speed
        let endTime = new Date().getTime();
        let totalTime = (endTime - startTime) / 1000;
        let words = sentence.split(" ").length;
        let finalSpeed = Math.round((words / totalTime) * 60);

        result.innerHTML = `Final Speed: ${finalSpeed} WPM 🎉`;
        inputBox.disabled = true; // Disable input after completion
    }
});

// Restart button
restartBtn.addEventListener("click", function() {
    inputBox.value = "";
    inputBox.disabled = false;
    startTime = null;
    clearInterval(interval);
    result.innerHTML = "Start typing to see your speed...";
});
