'use strict'

const loginZone = document.getElementById('login-modal')
const logoutZone = document.getElementById('main-content')
const welcomeMessage = document.getElementById('xinChao')
const logoutBtn = document.getElementById('btn-logout');

const curUserJSON = sessionStorage.getItem('currentUser');
const curUser = JSON.parse(curUserJSON);

if (curUser === null) {
    logoutZone.style.display = 'none';
    loginZone.style.display = 'block';

} else {
    loginZone.style.display = 'none';
    logoutZone.style.display = 'block';
    welcomeMessage.innerHTML = `Welcome back, ${curUser.fname}`;
}
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if (confirm('Bạn có chắc muốn đăng xuất?')) {
            sessionStorage.removeItem('currentUser');
            window.location.reload();
        }
    });
}