function displayArticles(articles) {
    const articleListContainer = document.querySelector('.articles-main');
    const articleList = document.createElement('ul');

    articles.forEach(article => {
        const listItem = createArticleListItem(article);
        articleList.appendChild(listItem);
    });

    articleListContainer.appendChild(articleList);
}

function createArticleListItem(article) {
    const link = document.createElement('a');
    link.href = `https://zenn.dev${article.path}`;
    link.target = "_blank";

    const dateContainer = document.createElement('div');
    dateContainer.classList.add('date-container');

    const zennImage = document.createElement('img');
    zennImage.src = 'img/zenn.svg';
    zennImage.alt = 'Zenn';
    zennImage.classList.add('zenn');

    const publishedAt = document.createElement('p');
    publishedAt.textContent = formatDate(article.published_at);

    const title = document.createElement('p');
    title.textContent = article.title;

    dateContainer.appendChild(zennImage);
    dateContainer.appendChild(publishedAt);

    link.appendChild(dateContainer);
    link.appendChild(title);

    const listItem = document.createElement('li');
    listItem.appendChild(link);

    return listItem;
}

document.addEventListener('DOMContentLoaded', () => {
    axios.get('/api/articles')
        .then(response => {
            displayArticles(response.data.articles);
        })
        .catch(error => {
            console.error('エラー:', error);
            const errorElement = document.createElement('p');
            errorElement.textContent = 'エラー: ' + error;
            document.body.appendChild(errorElement);
        });
});

function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
}
