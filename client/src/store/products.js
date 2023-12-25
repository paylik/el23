import { makeAutoObservable } from "mobx";


class Products{

  categoryProducts = []
  categoriesList = []
  product = {}
  cart = []
  previousOrders = []
  categories = [
    { code: 'cable', name: 'Кабельная продукция' },
    { code: 'pipe', name: 'Гофра и труба' },
    { code: 'box', name: 'Электромонтажные коробки' },
    { code: 'frame', name: 'Корпуса, щитки' },
    { code: 'automation', name: 'Автоматика' },
    { code: 'socket', name: 'Розетки, выключатели' },
    { code: 'lighting', name: 'Светотехника' },
    { code: 'insulation', name: 'Изоляция' }
  ]

  constructor() {
    makeAutoObservable(this)
  }

  setCategory(category) {
    this.categoryProducts = [...category]
  }

  setCategoriesList(categories) {
    this.categoriesList = [...categories]
  }

  setProduct(product) {
   this.product = product
  }

  setProductValue(key, value) {
    this.product[key] = value
  }

  getCategoryName(category) {
    let c = this.categories.find(cat => cat.code === category)
    return c ? c.name : ""
  }

  setCart(products) {
    this.cart = [...products]
    console.log("CART", this.cart)
  }

}

const p = new Products()
export default p

