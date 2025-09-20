import { fetchComments, token, name } from './api.js';
import { renderLogin } from './renderLogin.js';
import { comments, updateComments } from './data.js';
import { addLike, addComment, reply, delay } from './userFunc.js';

//---------------Функция обновления комментариев
export function renderComments() {
    const container = document.querySelector('.container');

    const commentsArray = comments
        .map((comment, index) => {
            return `<li data-index="${index}" class="comment">
      <div class="comment-header">
        <div class="comment-header_name">${comment.name}</div>
        <div>${comment.time}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likeCount}</span>
          <button data-index="${index}" class="like-button ${
              comment.like ? '-active-like' : ''
          } ${comment.likeLoad ? '-loading-like' : ''}"></button>
        </div>
      </div>
    </li>`;
        })
        .join('');

    const addCommentForm = `
    <div class="add-form">
      <input type="text" class="add-form-name add-form-name-com" placeholder="Введите ваше имя" readonly value="${name}" />
      <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
      <div class="add-form-row">
        <button class="add-form-button">Написать</button>
      </div>
    </div>
    <div class="loading-com" style="display: none; margin-top: 30px;">Отправка комментария...</div>
    `;

    const linkToLogin = `<p>Чтобы написать комментарий, нужно <span class="link-login">Авторизоваться</span></p>`;

    const pageComments = `
    <ul class="comments">${commentsArray}</ul>
    ${token ? addCommentForm : linkToLogin}
    `;

    container.innerHTML = pageComments;
    if (token) {
        addLike();
        // delay(2000).then(() => {
        //     addLike();
        // });
        reply();
        addComment();
    } else {
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin();
        });
    }
}

document.querySelector('.container').innerHTML = 'Загрузка комментариев...';
export function checkRenderComments(firstLoad) {
    if (firstLoad) {
        document.querySelector('.container').innerHTML =
            `<p>Загрузка комментариев...</p>`;
    }
    fetchComments().then((data) => {
        updateComments(data);
        renderComments();
    });
}
checkRenderComments(true);
// renderComments();
// fetchComments().then((data) => {
//     updateComments(data);
//     renderComments();
// });
