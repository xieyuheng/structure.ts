import assert from "assert"

import { set_t, the_eqv } from "./set"

// TODO
// the following definition is not useful.
// because we can not define the category_t of all group_t
// because the objects should be
//   the set of all `group_t`
//   instead of the set of `group_t <G>` for some the `G`

export class category_t<O, M> {
  objects: set_t<O>
  morphisms: set_t<M>
  dom: (f: M) => O
  cod: (f: M) => O
  id: (x: O) => M
  compose: (f: M, g: M) => M

  constructor(the: {
    objects: set_t<O>
    morphisms: set_t<M>
    dom: (f: M) => O
    cod: (f: M) => O
    id: (x: O) => M
    compose: (f: M, g: M) => M
  }) {
    this.objects = the.objects
    this.morphisms = the.morphisms
    this.dom = the.dom
    this.cod = the.cod
    this.id = the.id
    this.compose = (f, g) => {
      the_eqv(this.objects, this.cod(f), this.dom(g))
      return the.compose(f, g)
    }
  }

  id_left(f: M) {
    the_eqv(this.morphisms, this.compose(this.id(this.dom(f)), f), f)
  }

  id_right(f: M) {
    the_eqv(this.morphisms, this.compose(f, this.id(this.cod(f))), f)
  }

  compose_associative(f: M, g: M, h: M) {
    the_eqv(
      this.morphisms,
      this.compose(this.compose(f, g), h),
      this.compose(f, this.compose(g, h))
    )
  }
}
