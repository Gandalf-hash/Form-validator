const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password-2');

// Error Message
function showError(input, message){
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}
// Success message
function showSuccess(input){
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}
// Checking if the email provided is valid
function validateEmail(input) {
  const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if(re.test(input.value))
    showSuccess(input);
  else
    showError(input, 'Email is not valid');
}

// Validating the correct inputs
let checkRequired = (inputArr) =>{
  inputArr.forEach((input) =>{
    if(input.value.trim() === '')
      showError(input, `${getFieldName(input)} is required`)
    else  
      showSuccess(input)
    
});
}

// check if the password match
let checkPassword = (input1, input2) =>{
  return input1.value !== input2.value ? showError(input2, 'Password do not match') : null
}
// Check the length of the inputs
let checkLength = (input, min, max) => {
  if(input.value.length < min)
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  else if(input.value.length > max) 
    showError(input, `${getFieldName(input)} must be  lesss than ${max} characters`);
  else
    showSuccess(input);
}

function getFieldName(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function(e){
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  validateEmail(email);
  checkPassword(password, password2);
  
});
