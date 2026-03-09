const signInBtn = document.getElementById("sign-in-btn");
signInBtn.addEventListener("click", function () {
  const nameInput = document.getElementById("input-name");
  const username = nameInput.value;

  const passwordInput = document.getElementById("input-password");
  const password = passwordInput.value;

  if (username === "admin" && password === "admin123") {
    alert("Sign In Successful");
    window.location.assign("./home.html");
  } else {
    alert("Sign In Failed");
  }
});
