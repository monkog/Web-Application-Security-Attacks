const userLoginKey = 'user-login';
const anonymousLogin = 'Anonymous';
const loginButton = document.querySelector('.login-button');
const logoutButton = document.querySelector('.logout-button');
const userLogin = document.querySelector('.user-login');

const storedLogin = localStorage.getItem(userLoginKey);
userLogin.textContent = storedLogin || anonymousLogin;

loginButton.addEventListener('click', () => {
    const user = 'New User';
    userLogin.textContent = user;
    localStorage.setItem(userLoginKey, user);
    console.log('New user logged in: ', userLogin.textContent);
})

logoutButton.addEventListener('click', () => {
    localStorage.removeItem(userLoginKey);
    console.log('User logged out: ', userLogin.textContent);
    userLogin.textContent = anonymousLogin;
})