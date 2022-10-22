import { card_t, create_deck, shuffle } from "./card.js"

const tableau_slots = document.querySelectorAll('.tableau > .card-slot')
const stock_slot = document.querySelector('.stock > .card-slot')

function deal(deck, slots, stock) {
    let current = 0
    
    for (let i = 0; i < slots.length; i++) {
        deck[current].visibile = true
        for (let j = i; j < slots.length; j++) {
            deck[current++].set_slot(slots[j])
        }
    }

    for (; current < deck.length; current++) {
        deck[current].set_slot(stock)
    }
}

let selected_card = undefined
let deck = create_deck(handle_select)

for (let slot of document.querySelectorAll('.card-slot')) {
    slot.addEventListener('click', e => {
        if (e.target === slot)
            handle_select(slot)
    })
}

function start() {
    shuffle(deck)
    deal(deck, tableau_slots, stock_slot)
}

function handle_select(card_or_slot) {
    if (card_or_slot instanceof card_t)
        if (selected_card)
            set_card_in_slot(card_or_slot.slot)
        else
            select_card(card_or_slot)
    else if (selected_card)
        set_card_in_slot(card_or_slot)
}

function select_card(card) {
    if (!card.visible)
        return
    
    console.log(`selected ${card.debug_name()}`)
    selected_card = card
}

function set_card_in_slot(slot) {
    console.log(`set ${selected_card.debug_name()} in slot ${slot}`)
    selected_card = undefined
}

start()