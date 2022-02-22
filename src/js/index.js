import { displaySingleAnime } from './single.js';
export { API_URL, mangaAside, animeAside };
const API_URL = 'https://api.jikan.moe/v4';
let currentPage = 1;
let lastPage = 700;
const animesContainer = document.querySelector('.anime_elements_container');
const mangaAside = document.querySelector('#mangaTitle');
const animeAside = document.querySelector('#animeTitle');
let whichEndpoint = 'anime';

const loadCode = () => {
	try {
		const loadMain = async (endpoint) => {
			const response = await fetch(
				`${API_URL}/${endpoint}?page=${pagination(currentPage, lastPage)}`
			);
			if (response.status === 200) {
				const data = await response.json();
				displayAnimes(data.data);
			}
		};
		loadMain(`top/${whichEndpoint}`);

		const loadAside = (endpoint) => {
			//only work in lower case
			whichEndpoint = endpoint;
			loadMain(`top/${endpoint}`);
		};

		mangaAside.addEventListener('click', () => {
			mangaAside.classList.toggle('active');
			animeAside.classList.remove('active');
			loadAside('manga');
		});
		animeAside.addEventListener('click', () => {
			animeAside.classList.toggle('active');
			mangaAside.classList.remove('active');
			loadAside('anime');
		});
	} catch (error) {
		console.log('Ups! Something went wrong: ', error);
	}
};

const displayAnimes = (animeData) => {
	let elementsID = 0;
	let animesHTML = animeData
		.map((anime) => {
			// Allow only 25 elements
			if (elementsID < 25) {
				elementsID++;
				let genresArray = anime.genres.map((genre) => {
					return genre.name;
				});

				if (whichEndpoint === 'manga') {
					return `
                <article class="anime_element manga_element" data-id="${anime.mal_id}">
                    <div class="imgContainer">
                        <img  class="img" src="${anime.images.jpg.image_url}" alt="${anime.title}">
                        <h2 class="title">${anime.title}</h2>
                    </div>
                    <div class="tags_container">
                        <span class="tag">${genresArray[0]}</span>
                        <span class="tag">${genresArray[1]}</span>
                    </div>
                </article> `;
				} else if (whichEndpoint === 'anime') {
					return `
                <article class="anime_element" data-id="${anime.mal_id}">
                    <span class="score">${anime.score.toFixed(2)}</span>
                    <div class="imgContainer">
                        <img  class="img" src="${
													anime.images.jpg.image_url
												}" alt="${anime.title}">
                        <h2 class="title">${anime.title}</h2>
                    </div>
                    <div class="tags_container">
                        <span class="tag">${genresArray[0]}</span>
                        <span class="tag">${genresArray[1]}</span>
                    </div>
                </article> `;
				}
			}
		})
		.join('');
	animeAside.ad;

	// Showing on the DOM
	animesContainer.innerHTML = animesHTML;

	// Changing tags
	let animeScoreTag = document.getElementsByClassName('score');
	for (let i = 0; i < animeScoreTag.length; i++) {
		const tag = animeScoreTag[i];
		if (tag.textContent > 4 && tag.textContent <= 7) {
			tag.style.background = '#FF7E24';
		} else if (tag.textContent <= 4) {
			tag.style.background = '#FF2424';
		}
	}

	const animeClicked = document.querySelectorAll('.anime_element');
	animeClicked.forEach((element) => {
		element.addEventListener('click', (e) => {
			const animeId = e.currentTarget.getAttribute('data-id');
			displaySingleAnime(animeId, 'anime');
		});
	});

	const mangaClicked = document.querySelectorAll('.manga_element');
	mangaClicked.forEach((element) => {
		element.addEventListener('click', (e) => {
			const animeId = e.currentTarget.getAttribute('data-id');
			displaySingleAnime(animeId, 'manga');
		});
	});
};

const pagination = () => {
	let paginationHTML = '';
	let previusPage = currentPage - 1;
	let nextPage = currentPage + 1;
	//Creating pagination
	if (currentPage === 1) {
		paginationHTML = `
            <span class="pagination_element pagination_number active">${currentPage}</span>
            <span class="pagination_element pagination_number">${nextPage}</span>
            <span class="pagination_element pagination_number">...</span>
            <span class="pagination_element pagination_number">${
							nextPage + 4
						}</span>
            <span class="pagination_element pagination_number">${
							nextPage + 5
						}</span>
            <span class="pagination_element pagination_number">10</span>
            <span class="pagination_element" id="nextPageBtn">&#8594;</span>`;
	} else if (currentPage > 1) {
		paginationHTML = `
            <span class="pagination_element btn" id="previusPageBtn">&#8592;</span>
            <span class="pagination_element pagination_number">${previusPage}</span>
            <span class="pagination_element pagination_number active">${currentPage}</span>
            <span class="pagination_element pagination_number">${nextPage}</span>
            <span class="pagination_element pagination_number">...</span>
            <span class="pagination_element pagination_number">${
							nextPage + 4
						}</span>
            <span class="pagination_element pagination_number">${
							nextPage + 5
						}</span>
            <span class="pagination_element btn" id="nextPageBtn">&#8594;</span>`;
	} else if (currentPage === lastPage) {
		paginationHTML = `
            <span class="pagination_element btn"id="previusPageBtn">&#8592;</span>
            <span class="pagination_element pagination_number">${
							previusPage - 4
						}</span>
            <span class="pagination_element pagination_number">${
							previusPage - 3
						}</span>
            <span class="pagination_element pagination_number">...</span>
            <span class="pagination_element pagination_number">${previusPage}</span>
            <span class="pagination_element pagination_number active">${currentPage}</span>`;
	} else {
		console.log('a');
	}
	document.querySelector('.pagination').innerHTML = paginationHTML;

	//Changing page
	if (currentPage != lastPage) {
		let nextPageBtn = document.querySelector('#nextPageBtn');
		nextPageBtn.addEventListener('click', () => {
			currentPage++;
			loadCode();
		});
	}

	if (currentPage > 1) {
		let previusPageBtn = document.querySelector('#previusPageBtn');
		previusPageBtn.addEventListener('click', () => {
			currentPage--;
			loadCode();
		});
	}
	//Changing page by numbers
	let paginationNumber = document.querySelectorAll('.pagination_number');
	paginationNumber.forEach((element) => {
		element.addEventListener('click', () => {
			currentPage = Number(element.textContent);
			loadCode();
		});
	});

	return currentPage;
};

const darkMode = (() => {
	const btn = document.querySelector('.switch_theme_btn');
	btn.addEventListener('click', () => {
		document.body.classList.toggle('dark');
	});
})();

window.onload = () => {
	const loader = document.querySelector('#loaderContainer');
	loader.style.visibility = 'hidden';
	loader.style.opacity = '0';
	loadCode();
};
