async function fetchComments() {
    const response = await fetch('/comments');
    return await response.json();
}

async function renderComments(comments) {
    const ul = document.querySelector('ul');

    comments.forEach(comment => {
        ul.innerHTML += '<li>' + comment + '</li>';
    });
}

function saveComment(comment) {
    fetch('/comments', {
        method: 'POST',
        body: JSON.stringify({ comment }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

window.addEventListener('DOMContentLoaded', () => {
    fetchComments().then((comments) => { renderComments(comments) });
});

const addCommentForm = document.querySelector('form');
addCommentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const comment = document.querySelector('textarea').value;
    saveComment(comment);
    renderComments([comment]);
})