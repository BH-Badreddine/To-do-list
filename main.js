
let vm = new Vue({
    el: '#app',
    data: {
        //items: [],
        items: [],
        item: '',
        displayMessage: false,
        errorMessage: '',
        displayError: false
    },
    mounted() {
        if(localStorage.items) {
            this.items = JSON.parse(localStorage.items);
        }
    },
    methods: {
        addItemToList() {
            let ItemExist = false;
            if(this.item.length == 0) {
                this.errorMessage = 'Please enter a valid item !';
                this.displayError = true;
            } else {
                for(let i=0; i<this.items.length; i++) {
                    if(this.items[i].name === this.item) {
                        ItemExist = true; 
                        this.errorMessage = 'The item '+this.item+' exists! please enter another item';
                        this.displayError = true;
                    }
                }
                if(ItemExist === false) {
                    this.items.push({name: this.item, quantity: 1});
                    this.errorMessage = '';
                }
                this.item = '';
                //console.log(this.items);
            }
            
        },
        increaseQuantity(item) {
            item.quantity++ ;
        },
        decreaseQuantity(item) {
            if(item.quantity === 1) {
                this.deleteItem(item);
            }
            else {
                item.quantity-- ;
            }
        },
        deleteItem(item) {
            this.items.splice(this.items.indexOf(item),1);
        },
        deleteAllItems() {
            this.items.splice(0, this.items.length); 
        }
    },
    computed: {
        calTotalArticles() {
            let nbArticles = 0;
            for(let i=0; i<this.items.length; i++) {
                nbArticles = nbArticles + this.items[i].quantity;
            }
            return nbArticles;
        }
    },
    watch: {
            items: { 
                handler(newItems) {
                    console.log("update items");
                    localStorage.items = JSON.stringify(newItems);
                },
                deep: true
            },
            item(newValue) {
                
                setTimeout(()=>{
                        this.displayMessage = true;
                    }, 1200);
                
            },
            errorMessage(Value) {
                setTimeout(()=> {
                    this.displayError = false; 
                },2000);
            }
            
            }
        }
    
)