import { card_t, create_deck, shuffle } from './card.js'
import { slot_t, slot_type, setup_slots } from './slot.js'

function deal(deck, tableau_slots, stock) {
    let current = 0
    
    for (let i = 0; i < tableau_slots.length; i++) {
        deck[current].visible = true
        for (let j = i; j < tableau_slots.length; j++) {
            deck[current++].set_slot(tableau_slots[j])
        }
    }
    
    for (; current < deck.length; current++) {
        deck[current].set_slot(stock)
    }
}

const tableau_slots = setup_slots(document.querySelectorAll('.tableau > .card-slot'), slot_type.tableau, handle_select)
const foundation_slots = setup_slots(document.querySelectorAll('.foundation > .card-slot'), slot_type.foundation, handle_select)

const stock_slot = new slot_t(document.querySelector('.stock > .card-slot'), slot_type.stock, refill_stock)
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

function refill_stock(_card) {
    for (let i = discard_slot.cards.length - 1; i >= 0; i--) {
        discard_slot.cards[i].visible = false
        discard_slot.cards[i].set_slot(stock_slot)
    }
}

function select_card(card) {
    if (card.slot.type === slot_type.stock) {
        card.set_slot(discard_slot)
        card.visible = true
        return
    }

    if (!card.visible)
        return
    selected_card = card
}

function can_place_in_slot(card, slot) {
    return true
}

function set_card_in_slot(slot) {
    if (!can_place_in_slot(selected_card, slot))
        return
        
    let old_slot = selected_card.slot
    for (let card of selected_card.slot.get_card_stack(selected_card)) {
        card.set_slot(slot)
    }

    if (old_slot.type === slot_type.tableau && old_slot.top())
        old_slot.top().visible = true
    
    selected_card = undefined
}

start()