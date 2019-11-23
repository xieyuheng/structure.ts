import assert from "assert"

export
class set_t <T> {
  eq: (x: T, y: T) => boolean

  constructor (the: {
    eq: (x: T, y: T) => boolean
  }) {
    this.eq = the.eq
  }
}

export
function the_eqv <T> (s: set_t <T>, x: T, y: T): void {
  assert (s.eq (x, y))
}
