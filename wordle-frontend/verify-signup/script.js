document.addEventListener('DOMContentLoaded', () => {
  const code = document.getElementById('code');
  const verificationForm = document.getElementById('verification-form');
  const verificationButton = document.getElementById('verification-button');
  const testCode = '1234'
  const formWarning = document.getElementById('form-warning');

  function attemptVerification(){
    verificationButton.disabled = true;
    code.disabled = true;
    if (code.value === testCode){
      console.log("verification successful");
    }else{
      console.log('verification failed')
      
      verificationButton.disabled = false;
      code.disabled = false;
      formWarning.textContent = "Invalid verification code provided, please try again."
    }
  }

  code.addEventListener('input',() =>{
    formWarning.textContent = '';
  });

  verificationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    attemptVerification();
  });

});