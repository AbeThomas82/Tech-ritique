console.log("Connected.")
async function handleLogIn(e) {
    e.preventDefault()
    const username = document.querySelector('#loginUsername').value.trim()
    const password = document.querySelector('#loginPassword').value.trim()
    console.log(username,password)
    const response = await fetch('/api/users/login',{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    })
    if (response.ok) {
        console.log("User login")
        document.location.replace('/api/users/dashboard')
    }else {
        alert("Failed to log in.")
    }
}

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
        console.log("Use signup")
        document.location.replace('/api/users/dashboard');
      } else {
        alert('Failed to register.');
      }
    }
}

document.querySelector('.login').addEventListener('submit', handleLogIn);
document.querySelector('.signup').addEventListener('submit', handleRegister);