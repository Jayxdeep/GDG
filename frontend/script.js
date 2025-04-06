const form = document.getElementById("assignmentForm");
const resultBox = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const studentId = document.getElementById("studentId").value;
  const subject = document.getElementById("subject").value;
  const submittedFile = document.getElementById("submittedFile").value;

  try {
    const res = await fetch("https://gdg-production.up.railway.app/api/assignments/grade", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId, subject, submittedFile }),
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Clear the form
      form.reset();

      // ✅ Show success message with result
      resultBox.style.display = "block";
      resultBox.style.color = "green";
      resultBox.innerHTML = `
        <h3>✅ Assignment Submitted Successfully!</h3>
        <p><strong>Marks:</strong> ${data.assignment.marks}</p>
        <p><strong>Feedback:</strong> ${data.assignment.feedback}</p>
      `;
    } else {
      resultBox.style.display = "block";
      resultBox.style.color = "red";
      resultBox.innerText = data.error || "Something went wrong.";
    }
  } catch (error) {
    resultBox.style.display = "block";
    resultBox.style.color = "red";
    resultBox.innerText = "❌ Server error. Please try again.";
    console.error("Error:", error);
  }
});
