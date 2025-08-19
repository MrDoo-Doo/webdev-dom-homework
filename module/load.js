import { fetchComments } from './api.js';
import { comments, updateComments } from './data.js';
import { addLike, addComment, reply } from './userFunc.js';

//---------------Функция обновления комментариев
export function renderComments() {
    const arrayComments = document.querySelector('.comments');
    arrayComments.innerHTML = comments
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
          }"></button>
        </div>
      </div>
    </li>`;
        })
        .join('');
    addLike();
    reply();
}

fetchComments().then((data) => {
  updateComments(data);
  renderComments();
});
// renderComments();
addComment();
