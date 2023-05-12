document.addEventListener('DOMContentLoaded', function() {

  // =======================================================================
  // CONVERT TEXT FUNCTION
  function convertContent(str) {
    const convertSpaces = str.replace(/[ \t]/g, '§');
    const convertLinesBreaks = convertSpaces.replace(/\n/g, '€');
    return convertLinesBreaks;
  };

  // =======================================================================
  // CREATE NEW SNIPPET
  const newPostButton = document.querySelector('#new-post-button');
  const createNewSection = document.querySelector('#createNew');
  const newSnippetForm = document.querySelector('.new-snippet-form');

  const showForm = (event) => {
    event.preventDefault();
    newPostButton.style.display = 'none';
    createNewSection.style.display = 'block';
  };

  const newSnippetHandler = async (event) => {
    event.preventDefault();

    // Collect values from the create new snippet form
    const title = document.querySelector('#snippet-title').value.trim();
    const editor = ace.edit("snippet-content");
    const rawCode = editor.getValue();
    alert(rawCode)

    if (title && rawCode) {

      const code = convertContent(rawCode);
      // Send a POST request to the API endpoint
      const response = await fetch(`/api/snippets`, {
        method: 'POST',
        body: JSON.stringify({ title, code }),
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

    } else {
      alert('Please provide a title and some content.');
    }
  };

  newPostButton.onclick = showForm;
  newSnippetForm.onsubmit = newSnippetHandler;

});