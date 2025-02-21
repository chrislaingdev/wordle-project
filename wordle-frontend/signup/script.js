document.addEventListener('DOMContentLoaded', () => {

  const email = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const passwordMessage = document.getElementById('password-message');
  const signUpButton = document.getElementById('sign-up');
  const signUpForm = document.getElementById('sign-up-form');

  const creationSuccessful = true;
  
  function checkPasswords(){
    if (passwordInput.value !== confirmPasswordInput.value){
      passwordMessage.textContent = "Passwords do not match!";
      passwordMessage.style.color = "red";
      signUpButton.disabled = true;
      
    }else{
      passwordMessage.textContent = "Passwords match!";
      passwordMessage.style.color = 'green';
      signUpButton.disabled = false;
    }
  }
  
  function signUpNewUser(){
    signUpButton.disabled = true;
    email.disabled = true;
    passwordInput.disabled = true;
    confirmPasswordInput.disabled = true;


    if (creationSuccessful){
      console.log("creation successful")
      console.log("new user email: " , email.value);
      console.log("new user passwordInput: " , passwordInput.value);
    } else{
      console.log("creation failed")
      signUpButton.disabled = false;
      email.disabled = false;
      passwordInput.disabled = false;
      confirmPasswordInput.disabled = false;

    }
    
  }
  
  passwordInput.addEventListener('input', checkPasswords);
  confirmPasswordInput.addEventListener('input', checkPasswords);
  
  signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    if(passwordInput.value !== confirmPasswordInput.value){
      alert("Passwords do not match!")
    }else{
      signUpNewUser();
    }
  })

});