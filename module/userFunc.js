import { postComments } from './api.js';
import { comments, updateComments } from './data.js';
import { renderComments } from './load.js';
import { safeFunc } from './safe.js';

//---------------Функция добавления комментария
export function addComment() {
    const userName = document.querySelector('.add-form-name');
    const userComment = document.querySelector('.add-form-text');
    const button = document.querySelector('.add-form-button');
    let key = 0;
    button.addEventListener('click', () => {
        console.log(key);
        // let currentDate;

        // currentDate = new Date();
        // currentDate = dateStandart(currentDate);

        // let newComment = {
        //     name: safeFunc(userName.value),
        //     text: safeFunc(userComment.value),
        //     time: nowDate,
        //     like: false,
        //     likeCount: 0,
        // };

        document.querySelector('.loading-com').style.display = 'block';
        document.querySelector('.add-form').style.display = 'none';
        // console.log(currentDate);
        // let key = 0;
        // adBtn(safeFunc(userComment.value), safeFunc(userName.value), key);
        postComments(safeFunc(userComment.value), safeFunc(userName.value))
            .then((data) => {
                document.querySelector('.loading-com').style.display = 'none';
                document.querySelector('.add-form').style.display = 'flex';
                // console.log(data);
                updateComments(data);
                renderComments();
                userName.value = '';
                userComment.value = '';
                key = 0;
            })
            .catch((error) => {
                document.querySelector('.loading-com').style.display = 'none';
                document.querySelector('.add-form').style.display = 'flex';

                if (error.message === 'Ошибка сервера') {
                    // if (key < 3) {
                    //     key++;
                    //     debugger;
                    //     button.click();
                    // }
                    // if (key == 3) {
                    //     key = 0;
                    // }
                    alert('Что-то не то с сервером');
                }
                if (error.message === 'Ошибка ввода') {
                    alert('Текст имени или комментария слишком короткий');
                }
                if (error.message === 'Failed to fetch') {
                    alert('Проверьте интернет-соединение');
                }
            });
        // comments.push(newComment);
    });
}

// function adBtn(userComment, userName, key) {
//     postComments(userComment, userName)
//         .then((data) => {
//             document.querySelector('.loading-com').style.display = 'none';
//             document.querySelector('.add-form').style.display = 'flex';
//             console.log(data);
//             updateComments(data);
//             renderComments();
//             userName.value = '';
//             userComment.value = '';
//         })
//         .catch((error) => {
//             document.querySelector('.loading-com').style.display = 'none';
//             document.querySelector('.add-form').style.display = 'flex';

//             if (error.message === 'Ошибка сервера') {
//                 if (key < 3) {
//                     key++;
//                     adBtn(userComment, userName, key);
//                 }
//                 if (key == 3) {
//                     alert('Что-то не то с сервером');
//                 }
//             }
//             if (error.message === 'Ошибка ввода') {
//                 alert('Текст имени или комментария слишком короткий');
//             }
//             if (error.message === 'Failed to fetch') {
//                 alert('Проверьте интернет-соединение');
//             }
//         });
// }

//---------------Функция изменения лайка
export function addLike() {
    const arrayLike = document.querySelectorAll('.like-button');
    for (const like of arrayLike) {
        like.addEventListener('click', (e) => {
            e.stopPropagation();
            const currentComment = comments[like.dataset.index];
            currentComment.likeLoad = true;
            delay(2000).then(() => {
                if (currentComment.like === false) {
                    currentComment.like = true;
                    currentComment.likeCount++;
                } else {
                    currentComment.like = false;
                    currentComment.likeCount--;
                }
                currentComment.likeLoad = false;
                renderComments();
            });
            renderComments();
        });
    }
}

export function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}
// comment.likeCount = comment.like ? comment.likeCount - 1 : comment.likeCount + 1;
// comment.like = !comment.like;
// comment.isLikeLoading = false;
// renderComments();
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
