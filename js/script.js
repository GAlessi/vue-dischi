// Attraverso una chiamata ajax all'API di boolean
// https://flynn.boolean.careers/exercises/api/array/music
// avremo a disposizione una decina di dischi musicali.
// Utilizzando vue, stampiamo a schermo una card per ogni album.
// BONUS: Creare una select con tutti i generi dei dischi. In base a cosa scegliamo nella select, vedremo i corrispondenti cd.
// BONUS 2: Ordinare i dischi per anno di uscita.


function generateBox() {
    new Vue({
        el:"#app",

        data:{
            array: [],
            generi:[],
            selectedGenre: "",
            anno: ""
        },
        methods:{
            filteredGenresArray: function () {
                if (this.selectedGenre == "Tutti i generi") {
                    return this.array;
                }else {
                    return this.array.filter(album => {
                        return album.genre.includes(this.selectedGenre);
                    });
                }
            },
            sort: function () {
                console.log('sort');
            }

        },
        mounted(){
            axios.get('https://flynn.boolean.careers/exercises/api/array/music')
            .then(data =>{
                const array = data.data.response
                this.array = array
                for (let i = 0; i < array.length; i++) {
                    const album = array[i];
                    if (!this.generi.includes(album.genre)) {
                        this.generi.push(album.genre)
                    }
                }
            })
            .catch(() => console.log('error'))
        }

    });
}

function init() {
    generateBox();
}

$(init);
