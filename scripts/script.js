let quotes = [];
let filteredQuotes = [];
const gridContainer = document.getElementById('gridContainer');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');
const pageNumberInput = document.getElementById('pageNumber');
const goPageBtn = document.getElementById('goPage');
const searchBox = document.getElementById('searchBox');
const searchButton = document.getElementById('searchButton');

let currentPage = 1;
const itemsPerPage = 25;
let totalPages = 1;

async function fetchQuotes() {
    try {
        const response = await fetch('quotes.json');
        quotes = await response.json();
        filteredQuotes = quotes;
        totalPages = Math.ceil(filteredQuotes.length / itemsPerPage);
        displayQuotes(currentPage);
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}

function displayQuotes(page) {
    // まず、現在のコンテンツをクリア
    gridContainer.innerHTML = '';

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredQuotes.length);

    for (let i = startIndex; i < endIndex; i++) {
        const videoId = filteredQuotes[i].url.split('v=')[1];
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        const gridItem = document.createElement('div');
        gridItem.className = 'gridItem';
        gridItem.innerHTML = `
            ${filteredQuotes[i].quote}<br>
            <iframe width="100%" height="200" src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>
            ${filteredQuotes[i].date}
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
        displayQuotes(currentPage);
    }
});

nextPageBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        displayQuotes(currentPage);
    }
});

goPageBtn.addEventListener('click', () => {
    const pageNumber = parseInt(pageNumberInput.value);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        currentPage = pageNumber;
        displayQuotes(currentPage);
    } else {
        alert(`ページ番号は1から${totalPages}の間で入力してください`);
    }
});

searchButton.addEventListener('click', () => {
    const searchText = searchBox.value.toLowerCase();
    filteredQuotes = quotes.filter(quote => quote.quote.toLowerCase().includes(searchText));
    currentPage = 1;
    totalPages = Math.ceil(filteredQuotes.length / itemsPerPage);
    displayQuotes(currentPage);
});

// 初期表示
fetchQuotes();
