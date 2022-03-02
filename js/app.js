const app = new Vue({

    el : '#app',

    data : {
        myAccount : {
            userImage : 'img/R.jpg',
            userName : 'Alessandro',
        },

        activeIndex : 0,

        toAdd : '',

        clearReply : undefined,

        searchName : '',

        searchNameUpp : '',

        namePart : undefined,

        activeMessage : null,

        darkMode : false,

        contacts: [
            {
            name: 'Michele',
            avatar: 'img/user_1.jpg',
            visible: true,
            messages: [
                {
                date: '10/01/2020 15:30:55',
                text: 'Hai portato a spasso il cane?',
                status: 'sent'
                },
                {
                date: '10/01/2020 15:50:00',
                text: 'Ricordati di dargli da mangiare',
                status: 'sent'
                },
                {
                date: '10/01/2020 16:15:22',
                text: 'Tutto fatto!',
                status: 'received'
                }
            ],
            },
            {
            name: 'Fabio',
            avatar: 'img/user_2.jpg',
            visible: true,
            messages: [
                {
                date: '20/03/2020 16:30:00',
                text: 'Ciao come stai?',
                status: 'sent'
                },
                {
                date: '20/03/2020 16:30:55',
                text: 'Bene grazie! Stasera ci vediamo?',
                status: 'received'
                },
                {
                date: '20/03/2020 16:35:00',
                text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'sent'
                }
            ],
            },
            {
            name: 'Samuele',
            avatar: 'img/user_3.jpg',
            visible: true,
            messages: [
                {
                date: '28/03/2020 10:10:40',
                text: 'La Marianna va in campagna',
                status: 'received'
                },
                {
                date: '28/03/2020 10:20:10',
                text: 'Sicuro di non aver sbagliato chat?',
                status: 'sent'
                },
                {
                date: '28/03/2020 16:15:22',
                text: 'Ah scusa!',
                status: 'received'
                }
            ],
            },
            {
            name: 'Luisa',
            avatar: 'img/user_4.jpg',
            visible: true,
            messages: [
                {
                date: '10/01/2020 15:30:55',
                text: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
                },
                {
                date: '10/01/2020 15:50:00',
                text: 'Si, ma preferirei andare al cinema',
                status: 'received'
                }
            ],
            },
            {
            name: 'Michela',
            avatar: 'img/user_5.png',
            visible: true,
            messages: [
                {
                date: '10/01/2020 15:30:55',
                text: 'ciao',
                status: 'sent'
                },
                {
                date: '10/01/2020 15:30:56',
                text: 'come stai?',
                status: 'sent'
                },
                {
                date: '10/01/2020 15:50:00',
                text: 'tutto bene 😊',
                status: 'received'
                }
            ],
            },
            {
            name: 'Luigi',
            avatar: 'img/user_6.jpg',
            visible: true,
            messages: [
                {
                date: '28/03/2020 10:10:40',
                text: 'Ciao Luigi, come va?',
                status: 'received'
                },
                {
                date: '28/03/2020 10:20:10',
                text: 'Ei, tutto bene.',
                status: 'sent'
                },
                {
                date: '28/03/2020 16:15:22',
                text: 'Domani sera ci sei  per andare a mangiare il sushi?',
                status: 'received'
                },
                {
                date : '28/03/2020 16:30:22',
                text : 'Siiii certo che ci sono 🍣💖',
                status : 'sent'
                }
            ],
            }
        ], 
    },

    methods : {
        //Questa funzione pusha dentro l'array messages quello che viene scritto nell'input 
        //viene invocata premendo invio, una volta premuto invia il messaggio
        messageToAdd : function(i){
            const d = new Date();
            if( this.toAdd !== ''){
                this.contacts[i].messages.push( {
                                                    date: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${ d.getMinutes() } ${d.getSeconds()}`,
                                                    text : this.toAdd,
                                                    status : 'sent'
                                                }
                );
            };
            this.toAdd = '';
        },
        //questa funzione viene invocata quando si preme il tasto invio e manda una risposta automaticamente
        messageReply : function(i){
            const d = new Date();
            this.clearReply = setTimeout(() => {
                this.contacts[i].messages.push( {
                                                    date: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${ d.getMinutes() } ${d.getSeconds()}`,
                                                    text : 'ok',
                                                    status : 'received'
                                                }
                );
            }, 1000);
        },

        messageToRemove : function(i, n){
            const removed = this.contacts[i].messages.slice(n,n+1);
            removed[0].status = 'removed';
            console.log(removed);
        },

        stopReply : function(){
            clearTimeout(this.clearReply);
        },

        onlyHours : function(date){
            const hour = date.split(' ')[1];
            return hour.substring(0,5);
        },
        //faccio una funzione che compara ciò che scrivo nell'input con i nomi delle chat
        //se non coincidono da alla proprietà visible false, così tramite il 
        //v-if fatti sui contatto (<li>) mostrerà solo quelli con visible == true
        stringCompare : function(){

            this.searchNameUpp = this.searchName.charAt(0).toUpperCase()+this.searchName.slice(1);

            for(let i = 0; i < this.contacts.length; i++){
                this.namePart = this.contacts[i].name.slice(0,this.searchName.length);
                if( this.namePart !== ( this.searchNameUpp ) &&
                    this.searchName !== ''){
                    this.contacts[i].visible = false;
                }else if(this.searchName == ''){
                    this.contacts[i].visible = true;
                }
            }   
        }
    }
});