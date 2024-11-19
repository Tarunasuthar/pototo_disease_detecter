const uploadForm = document.getElementById("uploadForm");
const imageInput = document.getElementById("imageInput");
const resultDiv = document.getElementById("result");
const uploadedImage = document.getElementById("uploadedImage");
const predictedClassSpan = document.getElementById("predictedClass");
const confidenceSpan = document.getElementById("confidence");

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            uploadedImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = imageInput.files[0];
    if (!file) {
        alert("Please select an image!");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("http://localhost:8000/predict", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to get a response from the server.");
        }

        const data = await response.json();
        predictedClassSpan.textContent = data.class;
        confidenceSpan.textContent = (data.confidence * 100).toFixed(2) + "%";
        resultDiv.classList.remove("hidden");
    } catch (error) {
        alert("An error occurred: " + error.message);
    }
});
