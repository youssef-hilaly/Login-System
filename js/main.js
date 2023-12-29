// login variables
var loginEmail = document.getElementById('loginEmail');
var loginPassword = document.getElementById('loginPassword');
var loginButton = document.getElementById('loginBtn');

// signup variables
var registerName = document.getElementById('registerName');
var registerEmail = document.getElementById('registerEmail');
var registerPassword = document.getElementById('registerPassword');
var registerButton = document.getElementById('registerBtn');

var message = document.getElementById('message');


// Home variables
var homeName = document.getElementById('homeName');

var users = [];

if (localStorage.getItem('users')) {
    users = JSON.parse(localStorage.getItem('users'));
}

//  Sign up function
function validateEmail(email){
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

function isEmailExist(email){
    for(var i = 0; i < users.length; i++){
        if(users[i].email == email){
            return true;
        }
    }
    return false;
}

function validateUserName(name){
    return name.length >= 3;
}

function isStrongPassword(password){
    var re = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g
    return re.test(password);
}

function clearRegister(){
    registerName.value = '';
    registerEmail.value = '';
    registerPassword.value = '';
}

function register(){
    var name = registerName.value;
    var email = registerEmail.value;
    var password = registerPassword.value;

    if(name == '' || email == '' || password == ''){
        message.classList.remove('d-none');
        message.classList.add('d-block');
        message.style.color = 'red'
        message.innerHTML = 'All inputs is required'

        return;
    }

    if(!validateEmail(email)){
        message.classList.remove('d-none');
        message.classList.add('d-block');
        message.style.color = 'red'
        message.innerHTML = 'email is not valid'

        return;
    }

    if(!validateUserName(name)){
        message.classList.remove('d-none');
        message.classList.add('d-block');
        message.style.color = 'red'
        message.innerHTML = 'name must be at least 3 characters'

        return;
    }

    if(!isStrongPassword(password)){
        message.classList.remove('d-none');
        message.classList.add('d-block');
        message.style.color = 'red'
        message.style.textAlign = 'left'
        message.innerHTML = 'Password must be at least 6 characters contains at least<br>. one number<br>. one Uppercase letter<br>. one Lowercase letter<br>. one special character'

        return;
    }

    if (isEmailExist(email)){
        message.classList.remove('d-none');
        message.classList.add('d-block');
        message.style.color = 'red'
        message.innerHTML = 'email already exists'

        return;
    }

    var user = {
        name: name,
        email: email,
        password: password
    }

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));

        // message.classList.remove('d-none');
    // message.classList.add('d-block');
    // message.style.color = 'green'
    // message.innerHTML = 'Success'
    
    // clearRegister();

    window.location.href = 'index.html';
}

// Login function

function searchEmail(email){
    for(var i = 0; i < users.length; i++){
        if(users[i].email == email){
            return i;
        }
    }
    return -1;
}

function login(){
    var email = loginEmail.value;
    var password = loginPassword.value;

    if(email == '' || password == ''){
        message.classList.remove('d-none');
        message.classList.add('d-block');
        message.style.color = 'red'
        message.innerHTML = 'All inputs is required'

        return;
    }

    var idx = searchEmail(email,password)

    if (idx == -1){
        message.classList.remove('d-none');
        message.classList.add('d-block');
        message.style.color = 'red'
        message.innerHTML = 'email is incorrect'

        return;
    }

    if (users[idx].password != password){
        message.classList.remove('d-none');
        message.classList.add('d-block');
        message.style.color = 'red'
        message.innerHTML = 'password is incorrect'

        return;
    }

    var user = {
        name: users[idx].name,
        email: users[idx].email,
        password: users[idx].password
    }

    localStorage.setItem('activeUser', JSON.stringify(user));

    window.location.href = 'home.html';
}

// Home function

if (localStorage.getItem('activeUser')) {
    var activeUser = JSON.parse(localStorage.getItem('activeUser'));
    homeName.innerHTML = 'Welcome ' + activeUser.name;
}
else if(window.location.href.includes('home.html')){
    window.location.href = 'index.html';
}

function logout(){
    localStorage.removeItem('activeUser');
    window.location.href = 'index.html';
}