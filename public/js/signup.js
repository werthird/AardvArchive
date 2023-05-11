// LOGIN FETCH
document.addEventListener('DOMContentLoaded', () => {
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const firstName = document.querySelector('#first-name-signup').value.trim();
  const lastName = document.querySelector('#last-name-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
    // if username or password is not entered, send alert
  } else {
    alert('Please provide a username, email, and password.');
  }
};


// Event listener
document
  .querySelector('.signupForms')
  .addEventListener('submit', signupFormHandler)
});