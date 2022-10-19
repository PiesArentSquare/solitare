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
        this.element.innerHTML = value
        const suit_element = document.createElement('span')
        suit_element.innerHTML = suit[0]
        suit_element.classList.add(suit[1])
        this.element.appendChild(suit_element)
        this.slot = undefined;
    }

    set_slot(slot) {
        this.slot?.removeChild(this.element)
        this.slot = slot
        this.slot.appendChild(this.element)
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

// const slot1 = document.querySelector('.card-slot')

let deck = []
for (let suit in suits) {
    for (let v of values) {
        let c = new card(v, suits[suit])
        deck.push(c)
    }
}
shuffle(deck)
for (let c of deck) {
    // c.set_slot(slot1)
}

const tableau = document.querySelector('.tableau')