document.addEventListener('DOMContentLoaded', () => {
  const verificationCode = document.getElementById('verification-code');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const submitButton = document.getElementById('submit-button');
  const verificationForm = document.getElementById('verification-form');
  const passwordMessage = document.getElementById('password-message');
  const formWarning = document.getElementById('form-warning');

  const fakeCode = "1234"

  function attemptAccountCreation(){
    verificationCode.disabled = true;
    submitButton.disabled = true;
    passwordInput.disabled = true;
    confirmPasswordInput.disabled = true;

    if (verificationCode.value === fakeCode){

      console.log("account successfully verified");
    }else{
      formWarning.style.display = 'inherit';
      formWarning.textContent = 'Incorrect/expired code'
      console.log('validation failed');
      verificationCode.disabled = false;
      submitButton.disabled = false;
      passwordInput.disabled = false;
      confirmPasswordInput.disabled = false;
    }
  }

  function checkPasswords(){
    if (passwordInput.value !== confirmPasswordInput.value){
      passwordMessage.textContent = "Passwords do not match!";
      passwordMessage.style.color = "red";
      submitButton.disabled = true;
      
    }else if (passwordInput.value === '' && confirmPasswordInput.value === ''){
      passwordMessage.textContent = ''
      submitButton.disabled = true;
    }else{
      passwordMessage.textContent = "Passwords match!";
      passwordMessage.style.color = 'rgb(108,169,101)';
      submitButton.disabled = false;
 
    }
  }

  passwordInput.addEventListener('input', checkPasswords);
  confirmPasswordInput.addEventListener('input', checkPasswords);
  verificationCode.addEventListener('input', () =>{
    formWarning.style.display = 'none';
    formWarning.textContent = '';
  });

  verificationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if(passwordInput.value !== confirmPasswordInput.value){
      alert("Passwords do not match!");
    }else{
      attemptAccountCreation();
    }
  });


});