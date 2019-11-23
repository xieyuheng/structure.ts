import assert from "assert"

import { set_t, the_eqv } from "./set"
import { category_t } from "./category"

export
class groupoid_t <O, M> extends category_t <O, M> {
  inv: (f: M) => M

  constructor (the: {
    objects: set_t <O>,
    morphisms: set_t <M>,
    dom: (f: M) => O,
    cod: (f: M) => O,
    id: (x: O) => M,
    compose: (f: M, g: M) => M,
    inv: (f: M) => M,
  }) {
    super (the)
    this.inv = the.inv
  }

  // `dom` and `cod` of composition are only checked at runtime
  //   if the `the_eqv` can report report instead of throw error
  //   maybe we can use it as semantics of type system
  morphism_iso (f: M) {
    the_eqv (
      this.morphisms,
      this.compose (f, this.inv (f)),
      this.id (this.dom (f)),
    )

    the_eqv (
      this.morphisms,
      this.compose (this.inv (f), f),
      this.id (this.cod (f)),
    )
  }
}
