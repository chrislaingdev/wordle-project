document.addEventListener('DOMContentLoaded', () => {

  const loginForm = document.getElementById('login-form');
  const loginWarning = document.getElementById('login-warning');
  const loginButton = document.getElementById('login');
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const testEmail = "test@fakemail.com";
  const testPw = "tacos1";

  function loginFailed(){
    loginWarning.style.display = "inherit";
    loginWarning.textContent = 'incorrect email and or password';
  }

  function loginSuccess(){
    console.log("login successful");
  }

  function attemptLogin(){
    loginButton.disabled = true;
    email.disabled = true;
    password.disabled = true;
    


    if (email.value === testEmail && password.value === testPw){
      loginSuccess();
    } else{
      loginFailed();
      loginButton.disabled = false;
      email.disabled = false;
      password.disabled = false;
      
    }
    
  }

  document.getElementById("email").addEventListener("input", () => {
    loginWarning.style.display = "none";

  })
  document.getElementById("password").addEventListener("input", () => {
    loginWarning.style.display = "none";
  })


  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    
    attemptLogin();
  })
})
