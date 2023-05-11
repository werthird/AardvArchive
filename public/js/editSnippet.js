document.addEventListener('DOMContentLoaded', function() {

// =======================================================================
// CONVERT TEXT FUNCTION
function convertContent(str) {
  const convertSpaces = str.replace(/[ \t]/g, '§');
  const convertLinesBreaks = convertSpaces.replace(/\n/g, '€');
  return convertLinesBreaks;
};

// ==================================================================================
// UPDATE SNIPPET
  // async function updateSnippetHandler(event) {
  //   event.preventDefault();

  //   // Collect values from page
  //   const title = document.querySelector('#snippet-title').value.trim();
  //   const rawContent = document.querySelector('#snippet-content').value;
  //   const snippetId = document.querySelector("#hidden-snippet-id").value;

  //   if (title && rawContent && snippetId) {

  //     // Convert content to remove spaces and line breaks
  //     const content = convertContent(rawContent);

  //     const response = await fetch(`/api/snippet/${snippetId}`, {
  //       // Send a PUT request to the API endpoint
  //       method: 'PUT',
  //       body: JSON.stringify({ title, content, snippetId }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.ok) {
  //       // If successful, redirect the browser to the profile page
  //       document.location.replace(`/profile`);
  //     } else {
  //       alert('Failed to update snippet');
  //     }
  //     // if no title or content, send alert
  //   } else {
  //     alert('Please provide a title and some content.');
  //   }
  // }

  // document.querySelector('.update-snippet-button').onclick = updateSnippetHandler;



// =======================================================================
// DELETE SNIPPET
  const deleteSnippetHandler = async (event) => {
    event.preventDefault();
    console.log('Clickity click');
    
    const deleteButton = event.target.closest('.delete-snippet-button');
    const snippetId = deleteButton.dataset.snippetId;

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
   // Event listener setup after the HTML button is rendered
   const deleteButton = document.querySelector('.delete-snippet-button');
   deleteButton.onclick = deleteSnippetHandler;

});

  
