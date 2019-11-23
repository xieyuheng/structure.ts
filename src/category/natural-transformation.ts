import assert from "assert"

import { set_t } from "../set"
import { category_t } from "../category"

import { functor_t } from "./functor"

export
class natural_transformation_t <D, DM, C, CM> {
  dom: category_t <D, DM>
  cod: category_t <C, CM>
  src: functor_t <D, DM, C, CM>
  tar: functor_t <D, DM, C, CM>
  component: (x: D) => CM

  constructor (the: {
    src: functor_t <D, DM, C, CM>,
    tar: functor_t <D, DM, C, CM>,
    component: (x: D) => CM,
  }) {
    // note the use of === here
    assert (the.src.dom === the.tar.dom)
    assert (the.src.cod === the.tar.cod)
    this.dom = the.src.dom
    this.cod = the.src.cod
    this.src = the.src
    this.tar = the.tar
    this.component = (x) => {
      the_eqv (
        this.cod.objects,
        this.cod.dom (the.component (x)),
        this.src.map (x),
      )
      the_eqv (
        this.cod.objects,
        this.cod.cod (the.component (x)),
        this.tar.map (x),
      )
      return the.component (x)
    }
  }

  naturality (f: DM) {
    let a = this.dom.dom (f)
    let b = this.dom.cod (f)
    the_eqv (
      this.cod.morphisms,
      this.cod.compose (
        this.component (a),
        this.tar.fmap (f),
      ),
      this.cod.compose (
        this.src.fmap (f),
        this.component (b),
      ),
    )
  }
}
