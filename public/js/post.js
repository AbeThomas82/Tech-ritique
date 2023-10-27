async function createPost(e) {
    e.preventDefault();
  
    const postTitle = document.querySelector('#Post-Title').value.trim();    
    const postContent = document.querySelector('#Post-Content').value.trim();    
     
    if (postTitle && postContent) {
      const response = await fetch('/api/posts/', {
        method: 'post',
        body: JSON.stringify({
         title: postTitle,          
          content:postContent
        }),
        headers: { 'content-type': 'application/json' } 
      });
  
      if (response.ok) {
        console.log("Post created.")
        document.location.reload();
      } else {
        alert('Failed to create new post.');
      }
    }
}

document.querySelector('#create-post').addEventListener('click', createPost);
