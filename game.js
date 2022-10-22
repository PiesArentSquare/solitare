import { create_deck, shuffle } from "./card.js"

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

let selected_card
let deck

function start() {
    deck = shuffle(create_deck(handle_select))
    deal(deck, tableau_slots, stock_slot)
}

function handle_select(card) {
    console.log("selected " + card.element.children[0].innerText + card.element.children[1].innerText)
}

start()