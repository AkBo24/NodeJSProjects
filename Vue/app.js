const app = Vue.createApp({
    data() {
        return {
            title: 'Library',
            books: [
                {
                    id: 0,
                    title: 'Your Mom',
                    author: 'Me',
                    img: 'assets/1.jpg',
                    isFav: true,
                },
                {
                    id: 1,
                    title: 'Nerd',
                    author: 'Your Dad',
                    img: 'assets/2.jpg',
                    isFav: true,
                },
                {
                    id: 2,
                    title: 'The Infinite Game',
                    author: 'Simon Sinek',
                    img: 'assets/3.jpg',
                    isFav: false,
                },
            ],
        };
    },
    methods: {
        toggleIsFav(bookId) {
            this.books[bookId].isFav = !this.books[bookId].isFav;
        },
    },
});
app.mount('#app');
