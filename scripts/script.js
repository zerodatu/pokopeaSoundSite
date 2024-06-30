const quotes = [
    { quote: '名言1', url: 'https://www.youtube.com/watch?v=1j-cgb7c3Q4', date: '2024-01-01' },
    { quote: '名言2', url: 'https://www.youtube.com/watch?v=2j-cgb7c3Q4', date: '2024-01-02' },
    { quote: '名言3', url: 'https://www.youtube.com/watch?v=3j-cgb7c3Q4', date: '2024-01-03' },
    { quote: '名言4', url: 'https://www.youtube.com/watch?v=4j-cgb7c3Q4', date: '2024-01-04' },
    { quote: '名言5', url: 'https://www.youtube.com/watch?v=5j-cgb7c3Q4', date: '2024-01-05' },
    { quote: '名言6', url: 'https://www.youtube.com/watch?v=6j-cgb7c3Q4', date: '2024-01-06' },
    { quote: '名言7', url: 'https://www.youtube.com/watch?v=7j-cgb7c3Q4', date: '2024-01-07' },
    { quote: '名言8', url: 'https://www.youtube.com/watch?v=8j-cgb7c3Q4', date: '2024-01-08' },
    { quote: '名言9', url: 'https://www.youtube.com/watch?v=9j-cgb7c3Q4', date: '2024-01-09' },
    { quote: '名言10', url: 'https://www.youtube.com/watch?v=10j-cgb7c3Q4', date: '2024-01-10' },
    { quote: '名言11', url: 'https://www.youtube.com/watch?v=11j-cgb7c3Q4', date: '2024-01-11' },
    { quote: '名言12', url: 'https://www.youtube.com/watch?v=12j-cgb7c3Q4', date: '2024-01-12' },
    { quote: '名言13', url: 'https://www.youtube.com/watch?v=13j-cgb7c3Q4', date: '2024-01-13' },
    { quote: '名言14', url: 'https://www.youtube.com/watch?v=14j-cgb7c3Q4', date: '2024-01-14' },
    { quote: '名言15', url: 'https://www.youtube.com/watch?v=15j-cgb7c3Q4', date: '2024-01-15' },
    { quote: '名言16', url: 'https://www.youtube.com/watch?v=16j-cgb7c3Q4', date: '2024-01-16' },
    { quote: '名言17', url: 'https://www.youtube.com/watch?v=17j-cgb7c3Q4', date: '2024-01-17' },
    { quote: '名言18', url: 'https://www.youtube.com/watch?v=18j-cgb7c3Q4', date: '2024-01-18' },
    { quote: '名言19', url: 'https://www.youtube.com/watch?v=19j-cgb7c3Q4', date: '2024-01-19' },
    { quote: '名言20', url: 'https://www.youtube.com/watch?v=20j-cgb7c3Q4', date: '2024-01-20' },
    { quote: '名言21', url: 'https://www.youtube.com/watch?v=21j-cgb7c3Q4', date: '2024-01-21' },
    { quote: '名言22', url: 'https://www.youtube.com/watch?v=22j-cgb7c3Q4', date: '2024-01-22' },
    { quote: '名言23', url: 'https://www.youtube.com/watch?v=23j-cgb7c3Q4', date: '2024-01-23' },
    { quote: '名言24', url: 'https://www.youtube.com/watch?v=24j-cgb7c3Q4', date: '2024-01-24' },
    { quote: '名言25', url: 'https://www.youtube.com/watch?v=25j-cgb7c3Q4', date: '2024-01-25' },
    { quote: '名言26', url: 'https://www.youtube.com/watch?v=26j-cgb7c3Q4', date: '2024-01-26' },
    { quote: '名言27', url: 'https://www.youtube.com/watch?v=27j-cgb7c3Q4', date: '2024-01-27' },
    { quote: '名言28', url: 'https://www.youtube.com/watch?v=28j-cgb7c3Q4', date: '2024-01-28' },
    { quote: '名言29', url: 'https://www.youtube.com/watch?v=29j-cgb7c3Q4', date: '2024-01-29' },
    { quote: '名言30', url: 'https://www.youtube.com/watch?v=30j-cgb7c3Q4', date: '2024-01-30' },
];

const gridContainer = document.getElementById('gridContainer');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');

let currentPage = 1;
const itemsPerPage = 25;

function displayQuotes(page) {
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

    // ページングボタンの状態を更新
    prevPageBtn.disabled = page === 1;
    nextPageBtn.disabled = endIndex >= quotes.length;
}

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayQuotes(currentPage);
    }
});

nextPageBtn.addEventListener('click', () => {
    if ((currentPage * itemsPerPage) < quotes.length) {
        currentPage++;
        displayQuotes(currentPage);
    }
});

// 初期表示
displayQuotes(currentPage);
