'use strict'
const UserArr = JSON.parse(localStorage.getItem('UserArr') || '[]')
const curUser = JSON.parse(localStorage.getItem('Curuser') || '[]')
const userInput = document.getElementById('input-username')
const passInput = document.getElementById('input-password')
const loginBtn = document.getElementById('btn-submit')

loginBtn.addEventListener('click', () => {

    const username = userInput.value.trim();
    const password = passInput.value;

    if (username === "" || password === "") {
        alert('Vui lòng nhập đầy đủ username và password!');
        return;
    }

    const user = UserArr.find(element => element.username === username);

    if (user) {

        if (user.passwork === password) {
            alert('Đăng nhập thành công!!')

            localStorage.setItem('currentUser', JSON.stringify(user))

            window.location.href = '../index.html'
            curUser.push(user)

        } else {
            alert('Sai mật khẩu!');
        }
    } else {
        alert('Tài khoản không tồn tại!');
    }
})