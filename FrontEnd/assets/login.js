async function userLogin(){
    const responseLogin = await fetch("http://localhost:5678/api/users/login", {
    method: 'POST', 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    email: "sophie.bluel@test.tld",
    password: "S0phie"
    })
    })

    if (responseLogin.ok) {
    const dataLogin = await responseLogin.json()
    console.log(dataLogin)
    } else {
    console.log("Login failed:")
    }
}

userLogin()
  