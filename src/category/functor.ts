import { set_t, the_eqv } from "../set"
import { category_t } from "../category"

export class functor_t<D, DM, C, CM> {
  dom: category_t<D, DM>
  cod: category_t<C, CM>
  map: (x: D) => C
  fmap: (f: DM) => CM

  constructor(the: {
    dom: category_t<D, DM>
    cod: category_t<C, CM>
    map: (x: D) => C
    fmap: (f: DM) => CM
  }) {
    this.dom = the.dom
    this.cod = the.cod
    this.map = the.map
    this.fmap = (f) => {
      the_eqv(
        the.cod.objects,
        the.map(the.dom.dom(f)),
        the.cod.dom(the.fmap(f))
      )
      the_eqv(
        the.cod.objects,
        the.map(the.dom.cod(f)),
        the.cod.cod(the.fmap(f))
      )
      return the.fmap(f)
    }
  }

  fmap_respect_compose(f: DM, g: DM) {
    the_eqv(
      this.cod.morphisms,
      this.fmap(this.dom.compose(f, g)),
      this.cod.compose(this.fmap(f), this.fmap(g))
    )
  }

  fmap_respect_id(x: D) {
    the_eqv(
      this.cod.morphisms,
      this.fmap(this.dom.id(x)),
      this.cod.id(this.map(x))
    )
  }
}
