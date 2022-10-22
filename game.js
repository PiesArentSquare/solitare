import { card_t, create_deck, shuffle } from './card.js'
import { slot_t, slot_type, get_slots } from './slot.js'

function deal(deck, tableau_slots, stock) {
    let current = 0
    
    for (let i = 0; i < tableau_slots.length; i++) {
        deck[current].visibile = true
        for (let j = i; j < tableau_slots.length; j++) {
            deck[current++].set_slot(tableau_slots[j])
        }
    }
    
    for (; current < deck.length; current++) {
        deck[current].set_slot(stock)
    }
}

const tableau_slots = get_slots(document.querySelectorAll('.tableau > .card-slot'), slot_type.tableau, handle_select)
const foundation_slots = get_slots(document.querySelectorAll('.foundation > .card-slot'), slot_type.foundation, handle_select)

const stock_slot = new slot_t(document.querySelector('.stock > .card-slot'), slot_type.stock, handle_select)
const discard_slot = new slot_t(document.querySelector('.discard > .card-slot'), slot_type.discard, handle_select)

let selected_card = undefined
let deck = create_deck(handle_select)

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