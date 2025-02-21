document.addEventListener('DOMContentLoaded', () => {
  const email = document.getElementById('email');
  const formUi = document.getElementById('form-ui');
  const smallHeader = document.getElementById('verification-form-small-header');
  const codeLink = document.getElementById('request-code-link');
  const sendButton = document.getElementById('submit-button');



  function sendEmailVerification(){
    sendButton.disabled = true;
    email.disabled = true;

    console.log(email.value)
    formUi.style.display = "none";
    codeLink.style.display = "inherit" 
    smallHeader.textContent = "If an account with this email exists, a verification link will now be sent to it."

  }


  const verificationForm = document.getElementById('verification-form');
  verificationForm.addEventListener('submit',(event) => {
    event.preventDefault();
    
    sendEmailVerification();
    
  })
});