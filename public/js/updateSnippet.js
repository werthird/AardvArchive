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
  async function updateSnippetHandler(event) {
    event.preventDefault();

    // Collect values from page
    const title = document.querySelector('#update-snippet-title').value.trim();
    const rawContent = document.querySelector('#update-snippet-content').value;
    const snippetId = document.querySelector("#hidden-snippet-id").value;

    if (title && rawContent && snippetId) {

      // Convert content to remove spaces and line breaks
      const code = convertContent(rawContent);

      const response = await fetch(`/api/snippets/${snippetId}`, {
        // Send a PUT request to the API endpoint
        method: 'PUT',
        body: JSON.stringify({ title, code }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace(`/api/snippets/${snippetId}`);
      } else {
        alert('Failed to update snippet');
      }
      // if no title or content, send alert
    } else {
      alert('Please provide a title and some content.');
    }
  }

  document.querySelector('#snippet-button').onclick = updateSnippetHandler;

});