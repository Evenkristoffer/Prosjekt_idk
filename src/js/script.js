
  const fileInput = document.getElementById("fileInput");
  const uploadBtn = document.getElementById("uploadBtn");
  const statusBox = document.getElementById("status");

  uploadBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
      statusBox.textContent = "Please choose a file first.";
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // "file" is the field name your backend expects

    try {
      statusBox.textContent = "Uploading...";

      const res = await fetch("/upload", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json().catch(() => ({})); // in case server returns JSON
      statusBox.textContent = "Upload successful!";
      console.log("Server response:", data);
    } catch (err) {
      console.error(err);
      statusBox.textContent = "Error uploading file.";
    }
  });