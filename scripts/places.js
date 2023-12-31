document.addEventListener('DOMContentLoaded', function () {
    fetch('./historicalPlaces/placesList.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('elements-container');
        data.forEach((item, index) => {
            Object.values(item).forEach((path, pathIndex) => {
                fetchHtmlContent(path, index, pathIndex, container);
            });
        });
    })
    .catch(error => console.error('Error loading data:', error));
});

function fetchHtmlContent(path, index, pathIndex, container) {
    fetch(path)
        .then(response => response.text())
        .then(htmlContent => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');
            const imgSrc = doc.querySelector('img') ? doc.querySelector('img').src : '';
            const title = doc.querySelector('h1') ? doc.querySelector('h1').innerText : '';
            displayInGrid(imgSrc, title, index, pathIndex, container, path);
        })
        .catch(error => console.error('Error loading HTML content:', error));
}

function displayInGrid(imgSrc, title, index, pathIndex, container, path) {
    const columnHtml = `
        <div class="column" data-index="${index}" data-path-index="${pathIndex}">
            <img src="${imgSrc}" alt="${title}">
            <h3>${title}</h3>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', columnHtml);

    // Add click event listener to the newly added column
    container.querySelector(`.column[data-index="${index}"][data-path-index="${pathIndex}"]`).addEventListener('click', function () {
        loadDetails(path);
    });
}

function loadDetails(detailPath) {
    fetch(detailPath)
        .then(response => response.text())
        .then(htmlContent => {
            showOverlay(htmlContent);
        })
        .catch(error => console.error('Error loading details:', error));
}

function showOverlay(htmlContent) {
    const overlay = document.createElement('div');
    overlay.innerHTML = `
        <div class="overlay-content">${htmlContent}</div>
        <div class="close">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <svg viewBox="0 0 36 36" class="circle">
          <path
            stroke-dasharray="100, 100"
            d="M18 2
              a 16 16 0 0 1 0 32
              a 16 16 0 0 1 0 -32"
          />
        </svg>
      </div>
    `;
    overlay.classList.add('overlay');

    // Close button event listener
    overlay.querySelector('.close').addEventListener('click', function() {
        overlay.remove();
    });

    // Event listener for clicking outside the overlay content
    overlay.addEventListener('click', function(event) {
        // Check if the clicked area is not the content
        if (event.target === overlay) {
            overlay.remove();
        }
    });

    document.body.appendChild(overlay);
}
