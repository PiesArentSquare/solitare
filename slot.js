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
        this.cards.filter(v => v !== card)
    }
}

export function get_slots(elements, type, on_click) {
    let slots = []
    elements.forEach((element, i) => {
        slots[i] = new slot_t(element, type, on_click)
    })
    return slots
}