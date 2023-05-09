// CREATE NEW SNIPPET

const newSnippetHandler = async (event) => {
  event.preventDefault();

  // Collect values from the create new snippet form
  const title = document.querySelector('#snippet-title').value.trim();
  const content = document.querySelector('#snippet-content').value.trim();

  if (title && content) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/snippets`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
    // if no title or content, send alert
  } else {
    alert('Please provide a title and some content.');
  }
};

document
  .querySelector('.new-snippet-form')
  .addEventListener('submit', newSnippetHandler);