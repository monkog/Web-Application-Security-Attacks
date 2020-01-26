async function navigate(page) {
    const fileUrl = './pages/' + page;
    const response = await fetch(fileUrl);
    const pageContent = document.querySelector("#page");
    pageContent.innerHTML = await response.text();
    console.log(pageContent.innerHTML); 
}

window.addEventListener('DOMContentLoaded', (event) => {
    navigate('home.html');
});

window.addEventListener('hashchange', () => {
    const page = location.hash.substring(2);
    navigate(page);
});