async function handleRegister(e) {
    e.preventDefault();
  
    const username = document.querySelector('#createUsername').value.trim();    
    const password = document.querySelector('#createPassword').value.trim();    
     
    if (username && password) {
      const response = await fetch('/api/users/', {
        method: 'post',
        body: JSON.stringify({
          username,          
          password
        }),
        headers: { 'content-type': 'application/json' } 
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to register.');
      }
    }
}
  
document.querySelector('.signup').addEventListener('submit', handleRegister);