document.addEventListener('DOMContentLoaded', function() {

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

  
