import { card_t, create_deck, shuffle, values } from './card.js'
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
let locked_from_card_moving = false;

function start() {
    shuffle(deck)
    deal(deck, tableau_slots, stock_slot)
}

function handle_select(card_or_slot) {
    if (locked_from_card_moving)
        return

    if (card_or_slot instanceof card_t)
        if (selected_card)
            set_card_in_slot(card_or_slot.slot, card_or_slot)
        else
            select_card(card_or_slot)
    else if (selected_card)
        set_card_in_slot(card_or_slot)
}

function refill_stock(_card) {
    if (locked_from_card_moving)
        return

    for (let i = discard_slot.cards.length - 1; i >= 1; i--) {
        discard_slot.cards[i].visible = false
        discard_slot.cards[i].set_slot(stock_slot)
    }

    discard_slot.cards[0].visible = false
    move_cards(stock_slot, [discard_slot.cards[0]])
}

function set_selected(card) {
    if (selected_card) {
        for (let card of selected_card.slot.get_card_stack(selected_card)) {
            card.selected = false
        }
    }

    selected_card = card

    if (card) {
        for (let card of selected_card.slot.get_card_stack(selected_card)) {
            card.selected = true
        }
    }
}

function select_card(card) {
    if (!card) {
        set_selected(undefined)
        return
    }

    if (card.slot.type === slot_type.stock) {
        move_cards(discard_slot, [card])
        card.visible = true
        set_selected(undefined)
        return
    }

    if (!card.visible)
        return

    if (selected_card === card)
        set_selected(undefined)
    else
        set_selected(card)
}

function can_place_in_slot(card, slot) {
    if (slot.type === slot_type.foundation && card.slot.top() === card) {
        if (slot.top()) {
            return slot.top().suit === card.suit
                && values.findIndex(v => v === slot.top().value) + 1 === values.findIndex(v => v === card.value)
        } else {
            return card.value === 'A'
        }

    } else if (slot.type === slot_type.tableau) {
        if (slot.top()) {
            return slot.top().is_red() !== card.is_red()
                && values.findIndex(v => v === slot.top().value) === values.findIndex(v => v === card.value) + 1
        } else
            return card.value === 'K'
    }
    return false
}

async function set_card_in_slot(slot, card) {
    if (!can_place_in_slot(selected_card, slot)) {
        select_card(card)
        return
    }

    let old_slot = selected_card.slot
    await move_cards(slot, selected_card.slot.get_card_stack(selected_card))

    if (old_slot.type === slot_type.tableau && old_slot.top())
        old_slot.top().visible = true

    set_selected(undefined)
}

const move_slot = new slot_t(document.querySelector('.move-slot > .card-slot'), slot_type.discard, () => { })

async function move_cards(slot, cards) {
    const base_card = cards[0]
    const initial_rect = base_card.element.getBoundingClientRect();
    const initial_x = initial_rect.left
    const initial_y = initial_rect.top
    move_slot.element.style.left = `${initial_x}px`
    move_slot.element.style.top = `${initial_y}px`
    move_slot.element.classList.add('transition')

    for (let card of cards)
        card.set_slot(slot)

    const target_rect = base_card.element.getBoundingClientRect();
    const target_x = target_rect.left
    const target_y = target_rect.top
    move_slot.element.style.left = `${target_x}px`
    move_slot.element.style.top = `${target_y}px`

    locked_from_card_moving = true
    for (let card of cards)
        card.set_slot(move_slot)

    await new Promise(r => setTimeout(r, 150))
    move_slot.element.classList.remove('transition')

    for (let card of cards)
        card.set_slot(slot)
    locked_from_card_moving = false

}

start()