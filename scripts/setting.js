'use strict'
const curUserJSON = sessionStorage.getItem('currentUser');
const curUser = JSON.parse(curUserJSON);
if (curUser == null) {
    window.location.href = '../pages/login.html'
}

const pageSizeInput = document.getElementById('input-page-size')
const categoryInput = document.getElementById('input-category')
const saveBtn = document.getElementById('btn-submit')

const isValidInput = () => {
    const pageSize = parseInt(pageSizeInput.value);

    if (!pageSize || pageSize <= 0) {
        alert('Phải có nhiều hơn 0 trang');
        return false;
    }
    return true;
}

saveBtn.addEventListener('click', function() {

    if (isValidInput()) {
        curUser.pageSize = parseInt(pageSizeInput.value)
        curUser.category = categoryInput.value

        sessionStorage.setItem('currentUser', JSON.stringify(curUser))
        alert('Lưu thành công')
        window.location.href = './news.html'
    }

})