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
    }

    add(card) {
        this.element.appendChild(card.element)
        // console.log(card.debug_name())
    }

    remove(card) {
        this.element.removeChild(card.element)
    }
}

export function get_slots(elements, type) {
    let slots = []
    // console.log(elements.length)
    elements.forEach((element, i) => {
        slots[i] = new slot_t(element, type)
    })
    return slots
}