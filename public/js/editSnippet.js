// REQUIREMENTS
const { convertContent } = require('../../utils/convert.js')



// =======================================================================
// CREATE NEW SNIPPET

const newSnippetHandler = async (event) => {
  event.preventDefault();

  // Collect values from the create new snippet form
  const title = document.querySelector('#snippet-title').value.trim();
  const content = document.querySelector('#snippet-content').value.trim();
  const category = document.querySelector('#snippet-category').value.trim();

  if (title && content && category) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/snippets`, {
      method: 'POST',
      body: JSON.stringify({ title, content, category }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert('Failed to create snippet.');
    }
  // if no title or content, send alert
  } else {
    alert('Please provide a title and some content.');
  }
};

document
  .querySelector('.new-snippet-form')
  .addEventListener('submit', newSnippetHandler);



// ==================================================================================
// UPDATE SNIPPET

const updateSnippetHandler = async (event) => {
  event.preventDefault();

  // Collect values from page
  const title = document.querySelector('#snippet-title').value.trim();
  const rawContent = document.querySelector('#snippet-content').value;
  const snippetId = document.querySelector("#hidden-snippet-id").value;

  if (title && rawContent && snippetId) {

    // Convert content to remove spaces and line breaks
    const content = convertContent(rawContent);

    const response = await fetch(`/api/snippet/${snippetId}`, {
      // Send a PUT request to the API endpoint
      method: 'PUT',
      body: JSON.stringify({ title, content, snippetId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace(`/profile`);
    } else {
      alert('Failed to update snippet');
    }
  // if no title or content, send alert
  } else {
    alert('Please provide a title and some content.');
  }
};

document
  .querySelector('.update-snippet-button')
  .addEventListener('click', updateSnippetHandler);

  

// =======================================================================
// DELETE SNIPPET

const deleteSnippetHandler = async (event) => {
  const snippetId = document.querySelector("#hidden-snippet-id").value;

  if (snippetId) {
    const response = await fetch(`/api/snippets/${snippetId}`, {
      method: 'DELETE',
      body: JSON.stringify({ snippetId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete snippet');
    }
  } else {
    alert('You will need to select a snippet to delete.');
  }
};

document
  .querySelector('.delete-snippet-button')
  .addEventListener('click', deleteSnippetHandler);
