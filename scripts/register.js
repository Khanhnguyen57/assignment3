'use strict'
import User from '../models/User.js'
const fnameInput = document.getElementById('input-firstname')
const lnameInput = document.getElementById('input-lastname')
const userInput = document.getElementById('input-username')
const passInput = document.getElementById('input-password')
const passConfirm = document.getElementById('input-password-confirm')
const submitBtn = document.getElementById('btn-submit')

let UserArr = JSON.parse(localStorage.getItem('UserArr') || '[]')
const isValidInput = () => {
    if (fnameInput.value.trim() == "" || lnameInput.value.trim() == "" || userInput.value.trim() == "" || passInput.value == "") {
        alert('Không được để trống thông tin')
        return false
    }
    if (UserArr.some(user => user.username === userInput.value)) {
        alert('Tài khoản đã tồn tại!');
        return false;
    }
    if (passInput.value.length < 8 || passConfirm.value != passInput.value) {
        alert('Mật khẩu không hợp lệ')
        return fal
    }
    return true
}
submitBtn.addEventListener('click', () => {
    if (isValidInput()) {
        alert('Đăng kí thành công')
        const fname = fnameInput.value
        const lname = lnameInput.value
        const username = userInput.value
        const pass = passInput.value
        const newUser = new User(fname, lname, username, pass)
        UserArr.push(newUser)
        localStorage.setItem('UserArr', JSON.stringify(UserArr));
    }
    fnameInput.value = ""
    lnameInput.value = ""
    userInput.value = ""
    passInput.value = ""
    passConfirm.value = ""
    window.location.href = '../pages/login.html'
})