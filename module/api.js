import { dateStandart } from './safe.js';

const host = 'https://wedev-api.sky.pro/api/v1/alexye-efremov';
export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((res) => {
            return res.json();
        })
        .then((responseData) => {
            const masComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    time: dateStandart(comment.date),
                    text: comment.text,
                    likeCount: comment.likes,
                    like: false,
                    likeLoad: false,
                };
            });
            return masComments;
        });
};

export const postComments = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
            forceError: true,
        }),
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Ошибка сервера');
            }
            if (response.status === 400) {
                throw new Error('Ошибка ввода');
            }
        })
        .then(() => {
            return fetchComments();
        });
};
