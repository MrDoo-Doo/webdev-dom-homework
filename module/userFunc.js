import { postComments } from './api.js';
import { comments, updateComments } from './data.js';
import { renderComments } from './load.js';
import { safeFunc } from './safe.js';

//---------------Функция добавления комментария
export function addComment() {
    const userName = document.querySelector('.add-form-name');
    const userComment = document.querySelector('.add-form-text');
    const button = document.querySelector('.add-form-button');
    button.addEventListener('click', () => {
        let day, month, year, hour, minute;
        let currentDate;
        let nowDate;

        currentDate = new Date();

        year = String(currentDate.getFullYear()).slice(-2);
        month = String(currentDate.getMonth() + 1).padStart(2, '0');
        day = String(currentDate.getDate()).padStart(2, '0');
        hour = String(currentDate.getHours()).padStart(2, '0');
        minute = String(currentDate.getMinutes()).padStart(2, '0');

        nowDate = `${day}.${month}.${year} ${hour}:${minute}`;

        // let newComment = {
        //     name: safeFunc(userName.value),
        //     text: safeFunc(userComment.value),
        //     time: nowDate,
        //     like: false,
        //     likeCount: 0,
        // };

        document.querySelector('.loading-com').style.display = 'block';
        document.querySelector('.add-form').style.display = 'none';

        postComments(
            safeFunc(userComment.value),
            safeFunc(userName.value),
        ).then((data) => {
            document.querySelector('.loading-com').style.display = 'none';
            document.querySelector('.add-form').style.display = 'flex';
            updateComments(data);
            renderComments();
            userName.value = '';
            userComment.value = '';
        });
        // comments.push(newComment);
    });
}

//---------------Функция изменения лайка
export function addLike() {
    const arrayLike = document.querySelectorAll('.like-button');
    for (const like of arrayLike) {
        like.addEventListener('click', (e) => {
            e.stopPropagation();
            const currentComment = comments[like.dataset.index];
            if (currentComment.like === false) {
                currentComment.like = true;
                currentComment.likeCount++;
            } else {
                currentComment.like = false;
                currentComment.likeCount--;
            }
            renderComments();
        });
    }
}
// вфывыф

//---------------Функция ответа на комментарий
export function reply() {
    const arrayInitialComment = document.querySelectorAll('.comment');
    const userComment = document.querySelector('.add-form-text');
    for (const initialComment of arrayInitialComment) {
        initialComment.addEventListener('click', () => {
            const selectedComment = comments[initialComment.dataset.index];
            console.log(initialComment.dataset.index);
            userComment.value = `«${selectedComment.text}», - ${selectedComment.name}, `;
            userComment.focus();
        });
    }
}
