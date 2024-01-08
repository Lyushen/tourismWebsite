document.addEventListener('DOMContentLoaded', function () {
    var navholder = document.querySelector('#nav-placeholder');
    var currentVersion = '1.241'; // To update our navbar we implemented version control, to force update the cache variable

    function loadNavbar() {
        var storedVersion = localStorage.getItem('navbarVersion');
        var navbarHtml = localStorage.getItem('navbarHtml');

        if (navbarHtml && storedVersion === currentVersion) {
            navholder.insertAdjacentHTML('afterbegin', navbarHtml);
        } else {
            fetch('navbar.html')
                .then(response => response.text())
                .then(data => {
                    localStorage.setItem('navbarHtml', data);
                    localStorage.setItem('navbarVersion', currentVersion);
                    navholder.insertAdjacentHTML('afterbegin', data);
                })
                .catch(error => console.error('Error loading navbar:', error));
        }
    }

    loadNavbar();
});
