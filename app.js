new Vue({
    el: '#app',
    data: {
        currencies: {},
        amount: 0,
        from: 'EUR',
        to: 'USD',
        result: 0
    },
    mounted() {
        this.getCurrencies();
    },

    computed: {
        formattedCurrencies() {
            return Object.values(this.currencies);
        },

        calculateResult() {
            return (Number(this.amount) * this.result).toFixed(3);
        },

        disabled() {
            return this.amount == 0 || !this.amount;
        }
    },
    methods: {
        getCurrencies() {
            const currencies = localStorage.getItem('currencies')

            if (currencies) {
                this.currencies = JSON.parse(currencies);
                return;
            }

            axios.get('https://free.currconv.com/api/v7/currencies?apiKey=f4d8e8f1c4aff5c63f90')
                .then(response => {
                    this.currencies = response.data.results;
                    localStorage.setItem('currencies', JSON.stringify(response.data.results))
                })
        },

        convertCurrency() {
            const key = `${this.from}_${this.to}`;
            axios.get(`https://free.currconv.com/api/v7/convert?q=${key}&apiKey=f4d8e8f1c4aff5c63f90`)
                .then((response) => {
                    console.log(response)
                    this.result = response.data.results[key].val

                })
        }
    }

})