import { API_URL, animeAside, mangaAside } from './index.js';

export const displaySingleAnime = async (id, type) => {
	try {
		const response = await fetch(`${API_URL}/${type}/${id}`);
		if (response.status === 200) {
			const DATA = await response.json();
			display(DATA.data, type);
		}
	} catch (error) {
		console.log('Something went wrong: ', error);
	}
};

const display = (data, type) => {
    const main = document.querySelector('#main');
    let HTML = '';
    if (type === 'anime') {
        const { title, trailer, synopsis, score, episodes, rating, status, images } = data;
	    HTML = `
    <section class="single">
        <section class="left">
            <div class="title-container">
                <h1 class="title">${title}</h1>
                <span class="score">${score}</span>
            </div>
            <div class="synopsis">
                <p>${synopsis}</p>
            </div>
            <div class="img-card">
                <img src="${images.jpg.image_url}" alt="${title}">
            </div>
            <section class="details">
            <div class="detail-card">
                <span class="title">Episodes</span>
                <span class="tag">${episodes}</span>
            </div>
            <div class="detail-card">
                <span class="title">Status</span>
                <span class="tag">${status}</span>
            </div>
            <div class="detail-card">
                <span class="title">Rating</span>
                <span class="tag">${rating}</span>
            </div>
            <div class="detail-card">
                <span class="title">Score</span>
                <span class="tag">${score}/10</span>
            </div>
            </section>
        </section>
        <section class="right">
            <iframe class="trailer" type="text/html" src="${trailer.embed_url}" frameborder="0"></iframe>
            <a href="${trailer.url}" target="_blank" class="title-trailer">Watch the trailer</a>
        </section>
    </section>

        `;
	    main.innerHTML = HTML;
        animeAside.addEventListener('click', () => location.reload());
        mangaAside.addEventListener('click', () => location.reload());
    }
    else {
        const { title, synopsis, score, episodes, rating, status, images } = data;
        HTML = `
        <section class="single no-grid">
            <section class="left">
                <div class="title-container">
                    <h1 class="title">${title}</h1>
                    <span class="score">${score}</span>
                </div>
                <div class="synopsis">
                    <p>${synopsis}</p>
                </div>
                <div class="img-card">
                    <img src="${images.jpg.image_url}" alt="${title}">
                </div>
                <section class="details">
                <div class="detail-card">
                    <span class="title">Episodes</span>
                    <span class="tag">${episodes}</span>
                </div>
                <div class="detail-card">
                    <span class="title">Status</span>
                    <span class="tag">${status}</span>
                </div>
                <div class="detail-card">
                    <span class="title">Rating</span>
                    <span class="tag">${rating}</span>
                </div>
                <div class="detail-card">
                    <span class="title">Score</span>
                    <span class="tag">${score}/10</span>
                </div>
                </section>
            </section>
        </section>

        `; 
        main.innerHTML = HTML;
        mangaAside.addEventListener('click', () => location.reload());
        animeAside.addEventListener('click', () => location.reload());
    }
	
};


