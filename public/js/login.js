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
        document.location.replace('/dashboard')
    }else {
        alert("Failed to log in.")
    }
}
document.querySelector('.login').addEventListener('submit',handleLogIn)
