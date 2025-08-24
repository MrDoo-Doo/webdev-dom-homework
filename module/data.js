//---------------Существующие записи
export let comments = [
    // {
    //     name: 'Глеб Фокин',
    //     text: 'Это будет первый комментарий на этой странице',
    //     time: '12.02.22 12:18',
    //     like: false,
    //     likeCount: 3,
    // },
    // {
    //     name: 'Варвара Н.',
    //     text: 'Мне нравится как оформлена эта страница! ❤',
    //     time: '13.02.22 19:22',
    //     like: true,
    //     likeCount: 70,
    // },
];
export const updateComments = (newComents) => {
    comments = newComents;
};
