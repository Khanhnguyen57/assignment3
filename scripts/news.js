'use strict'
const curUserJSON = sessionStorage.getItem('currentUser');
const curUser = JSON.parse(curUserJSON);
const container = document.getElementById('news-container')
let UserArr = JSON.parse(localStorage.getItem('UserArr') || '[]')

const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const pageNum = document.getElementById('page-num');


if (curUser == null) {
    window.location.href = '../pages/login.html'
}
let currentPage = 1;
let pageSize = curUser.pageSize ? curUser.pageSize : 5;
let totalResults = 0;
let category = curUser.category ? curUser.category : 'general';
let apiKey = '4b5bf8acf86e46f8bfba3e51b7adffd6'

const displayNews = (baiBao) => {
    container.innerHTML = ''
    baiBao.forEach(article => {
        const articleElement = document.createElement('div')
        articleElement.classList.add('card', 'flex-row', 'flex-wrap')
        const imageUrl = article.urlToImage

        articleElement.innerHTML = `
        <div class="card flex-row flex-wrap">
					<div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4">
								<img src="${imageUrl}"
									class="card-img"
								    alt="${article.title}">
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${article.title}</h5>
									<p class="card-text">${article.description || ''}</p>
									<a href="${article.url}"
										class="btn btn-primary">View</a>
								</div>
							</div>
						</div>
					</div>
				</div>
        `
        container.appendChild(articleElement)
    });
}

const chuyenTrang = () => {
    pageNum.textContent = currentPage
    const totalPages = Math.max(1, Math.ceil(totalResults / pageSize))
    if (currentPage === 1) {
        btnPrev.style.display = 'none'
    } else {
        btnPrev.style.display = 'block'
    }
    if (currentPage >= totalPages) {
        btnNext.style.display = 'none'
    } else {
        btnNext.style.display = 'block'
    }
}

btnNext.addEventListener('click', () => {
    fetchNews(currentPage + 1);
});

btnPrev.addEventListener('click', () => {
    fetchNews(currentPage - 1);
});

const fetchNews = async(page) => {
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`)
        const data = await response.json()

        totalResults = data.totalResults
        currentPage = page
        console.log(`API:`, data.articles)
        displayNews(data.articles)

        chuyenTrang()
    } catch (error) {
        console.log(`error!!`)
    }
}
fetchNews(1)