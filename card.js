const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K']

const suits = {
    spades: ['♠️', 'black'],
    hearts: ['♥️', 'red'],
    clubs: ['♣️', 'black'],
    diamonds: ['♦️', 'red']
}

export class card {
    constructor(value, suit, on_select) {
        this.element = document.createElement('div')
        this.element.classList.add('card')
        this.element.innerHTML = '<span>' + value + '</span><span class="' + suit[1] + '">' + suit[0] + '</span>'
        this.element.addEventListener('click', () => on_select(this))
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

export function create_deck(handle_select) {
    let deck = []
    for (let suit in suits) {
        for (let v of values) {
            let c = new card(v, suits[suit], handle_select)
            deck.push(c)
        }
    }
    return deck
}

export function shuffle(array) {
    let current_index = array.length, random_index
    while (current_index != 0) {
        random_index = Math.floor(Math.random() * current_index)
        current_index--
        [array[current_index], array[random_index]] = [array[random_index], array[current_index]]
    }
    return array
}
