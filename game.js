const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K']

const suits = {
    spades: ['♠️', 'black'],
    hearts: ['♥️', 'red'],
    clubs: ['♣️', 'black'],
    diamonds: ['♦️', 'red']
}

class card {
    constructor(value, suit) {
        this.element = document.createElement('div')
        this.element.classList.add('card')
        this.element.innerHTML = '<span>' + value + '</span><span class="' + suit[1] + '">' + suit[0] + '</span>'
        this.slot = undefined
    }

    set_slot(slot) {
        this.slot?.removeChild(this.element)
        this.slot = slot
        this.slot.appendChild(this.element)
    }

    set_visibility(visible) {
        if (visible)
            this.element.classList.add('visible')
        else
            this.element.classList.remove('visable')
    }
}

function shuffle(array) {
    let current_index = array.length, random_index
    while (current_index != 0) {
        random_index = Math.floor(Math.random() * current_index)
        current_index--
        [array[current_index], array[random_index]] = [array[random_index], array[current_index]]
    }
    return array
}

let deck = []
for (let suit in suits) {
    for (let v of values) {
        let c = new card(v, suits[suit])
        deck.push(c)
    }
}
shuffle(deck)

const tableau_slots = document.querySelectorAll('.tableau > .card-slot')
const stock_slot = document.querySelector('.stock > .card-slot')

function deal(deck, slots, stock) {
    let current = 0

    for (let i = 0; i < slots.length; i++) {
        deck[current].set_visibility(true)
        for (let j = i; j < slots.length; j++) {
            deck[current++].set_slot(slots[j])
        }
    }

    for (; current < deck.length; current++) {
        deck[current].set_slot(stock)
    }
}

deal(deck, tableau_slots, stock_slot)