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
        },
        methods:{

            //filtra l'array in base a genere
            filteredGenresArray: function () {
                    return this.array.filter(album => {
                        return album.genre.includes(this.selectedGenre);
                    });
            },

            //ordina l'array in base all'anno di uscita del pezzo
           //  orderedMusic: function () {
           //     const ordered = this.filteredGenresArray().sort(
           //          function (a, b) {
           //             if (a.year < b.year) {
           //                 return -1;
           //             } else if (a.year > b.year) {
           //                 return 1;
           //             }
           //             return 0;
           //         }
           //     );
           //     return ordered;
           // }

        },

        computed: {
            //ordina l'array in base all'anno di uscita del pezzo
            orderedMusic: function () {
                console.log('hello');
               const ordered = this.filteredGenresArray().sort(
                    function (a, b) {
                       if (a.year < b.year) {
                           return -1;
                       } else if (a.year > b.year) {
                           return 1;
                       }
                       return 0;
                   }
               );
               return ordered;
           }
        },

        //prelevo l'api, lo pusho in un data e creo le option per il select
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
