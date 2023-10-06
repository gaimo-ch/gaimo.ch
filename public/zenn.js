document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/articles')
        .then(response => response.json())
        .then(data => {
            const articleListContainer = document.querySelector('.articles-main');

            const articles = data.articles;
            const articleList = document.createElement('ul');

            articles.forEach(article => {
                const listItem = document.createElement('li');
                const publishedAt = document.createElement('p');
                const path = document.createElement('a');

                const date = new Date(article.published_at);
                const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;

                publishedAt.textContent = `${formattedDate}`;
                path.textContent = article.title;
                path.href = `https://zenn.dev${article.path}`;
                path.target = "_blank";

                listItem.appendChild(publishedAt);
                listItem.appendChild(path);

                articleList.appendChild(listItem);
            });

            articleListContainer.appendChild(articleList);
        })
        .catch(error => {
            console.error('エラー:', error);
        });
});
