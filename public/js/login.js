// LOGIN FETCH

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const userData = {
    username: document.querySelector('#username-login').value.trim(),
    password: document.querySelector('#password-login').value.trim(),
  };
  

  if (userData.username && userData.password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify( userData ),
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
    console.log('Please provide a username and password.');
  }
};


// Event listener
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);


