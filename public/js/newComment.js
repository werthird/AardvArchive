// REQUIREMENTS
const { convertContent } = require('../utils/convert.js')



// =======================================================================
// CREATE NEW COMMENT

const newCommentHandler = async (event) => {
  event.preventDefault();

  // Collect values from page
  const comment = document.querySelector('#comment').value.trim();

  if (comment) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert('Failed to create comment');
    }
  // if no title or content, send alert
  } else {
    alert('Please provide a comment');
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);



// ==================================================================================
// UPDATE SNIPPET

const updateCommentHandler = async (event) => {
  event.preventDefault();

  // Collect values from page
  const comment = document.querySelector('#comment').value.trim();
  const commentId = document.querySelector("#hidden-comment-id").value;

  if ( comment && commentId)  {
    const response = await fetch(`/api/comments/${commentId}`, {
      // Send a PUT request to the API endpoint
      method: 'PUT',
      body: JSON.stringify({ comment, commentId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace(`/profile`);
    } else {
      alert('Failed to update comment');
    }
  // if no title or content, send alert
  } else {
    alert('Please provide a comment.');
  }
};

document
  .querySelector('.update-comment-button')
  .addEventListener('click', updateCommentHandler);


// =======================================================================
// DELETE SNIPPET

const deleteCommentHandler = async (event) => {
  const commentId = document.querySelector("#hidden-comment-id").value;

  if (commentId) {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
      body: JSON.stringify({ commentId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete comment');
    }
  } else {
    alert('You will need to select a comment to delete.');
  }
};

document
  .querySelector('.delete-comment-button')
  .addEventListener('click', deleteCommentHandler);