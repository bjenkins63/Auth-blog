async function editFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // What part of our application will handle this 'put' request?
  // The Controller will handle this 'put' request.

  const response = await fetch(`/api/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      description,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace(`/blog/${id}`);
  } else {
    alert('Failed to edit blog');
  }
}

document.querySelector('.edit-blog-form').addEventListener('submit', editFormHandler);
