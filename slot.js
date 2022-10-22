export const slot_type = {
    foundation: 'foundation',
    stock: 'stock',
    discard: 'discard',
    tableau: 'tableau'
}

export class slot_t {
    constructor(element, type, on_click) {
        this.element = element
        this.element.addEventListener('click', e => {
            if (e.target === this.element)
                on_click(this)
        })
        this.type = type
        this.cards = []
    }

    add(card) {
        this.element.appendChild(card.element)
        this.cards.push(card)
    }

    remove(card) {
        this.element.removeChild(card.element)
        for (let i = 0; i < this.cards.length; i++)
            if (this.cards[i] === card)
                this.cards.splice(i, 1)
    }

    get_card_stack(base_card) {
        let card_stack = []
        for (let card of this.cards) {
            if (base_card === card || card_stack.length > 0) // get the pased card and every subsequent
                card_stack.push(card)
        }
        return card_stack
    }

    top() {
        if (this.cards.length > 0)
            return this.cards[this.cards.length - 1]
    }
}

export function setup_slots(elements, type, on_click) {
    let slots = []
    elements.forEach((element, i) => {
        slots[i] = new slot_t(element, type, on_click)
    })
    return slots
}