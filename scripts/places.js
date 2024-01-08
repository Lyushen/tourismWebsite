document.addEventListener('DOMContentLoaded', async function () {
    const container = document.getElementById('elements-container');
    const jsonPath = container.getAttribute('path'); // Retrieve the path from the attribute

    try {
        const response = await fetch(jsonPath);
        const data = await response.json();

        for (const item of data) {
            for (const path of Object.values(item)) {
                await fetchHtmlContent(path, container);
            }
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
});

async function fetchHtmlContent(path, container) {
    try {
        const response = await fetch(path);
        const htmlContent = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const imgSrc = doc.querySelector('img') ? doc.querySelector('img').src : '';
        const title = doc.querySelector('h1') ? doc.querySelector('h1').innerText : '';
        displayInGrid(imgSrc, title, container, path);
    } catch (error) {
        console.error('Error loading HTML content:', error);
    }
}

function displayInGrid(imgSrc, title, container, path) {
    const columnHtml = `
        <div class="column">
            <img src="${imgSrc}" alt="${title}">
            <h3>${title}</h3>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', columnHtml);

    // Add click event listener to the newly added column
    const latestColumn = container.lastElementChild;
    latestColumn.addEventListener('click', function () {
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
