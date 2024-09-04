/** Session Storage for email
 Email input is going to transfer to userProfile.html */  

 /** NEED TO WORK ON TYING TO USER LOGIN */

var emailStorage = document.getElementById('userLoginEmail');

form.addEventListener('submit', function(event){
event.preventDefault();

var temp = emailStorage.value;
sessionStorage.setItem('userLoginEmail',temp);
console.log(temp);
window.location.href = "userProfile.html";
})