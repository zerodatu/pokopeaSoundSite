let quotes = [];
const gridContainer = document.getElementById('gridContainer');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');
const pageNumberInput = document.getElementById('pageNumber');
const goPageBtn = document.getElementById('goPage');

let currentPage = 1;
const itemsPerPage = 25;

async function fetchQuotes() {
    try {
        const response = await fetch('quotes.json');
        quotes = await response.json();
        const totalPages = Math.ceil(quotes.length / itemsPerPage);
        displayQuotes(currentPage, totalPages);
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}

function displayQuotes(page, totalPages) {
    // まず、現在のコンテンツをクリア
    gridContainer.innerHTML = '';

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, quotes.length);

    for (let i = startIndex; i < endIndex; i++) {
        const videoId = quotes[i].url.split('v=')[1];
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        const gridItem = document.createElement('div');
        gridItem.className = 'gridItem';
        gridItem.innerHTML = `
            ${quotes[i].quote}<br>
            <iframe width="100%" height="200" src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>
            ${quotes[i].date}
        `;
        gridContainer.appendChild(gridItem);
    }

    // ページ情報の更新
    pageInfo.textContent = `ページ ${page} / ${totalPages}`;

    // ページングボタンの状態を更新
    prevPageBtn.disabled = page === 1;
    nextPageBtn.disabled = page === totalPages;
}

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayQuotes(currentPage, Math.ceil(quotes.length / itemsPerPage));
    }
});

nextPageBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(quotes.length / itemsPerPage)) {
        currentPage++;
        displayQuotes(currentPage, Math.ceil(quotes.length / itemsPerPage));
    }
});

goPageBtn.addEventListener('click', () => {
    const pageNumber = parseInt(pageNumberInput.value);
    const totalPages = Math.ceil(quotes.length / itemsPerPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        currentPage = pageNumber;
        displayQuotes(currentPage, totalPages);
    } else {
        alert(`ページ番号は1から${totalPages}の間で入力してください`);
    }
});

// 初期表示
fetchQuotes();
