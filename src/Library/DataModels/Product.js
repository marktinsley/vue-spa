export class Product
{
  /**
   * Constructor.
   *
   * @param {Object} attributes
   */
  constructor ({id, title, price, description}) {
    this.id = id
    this.title = title
    this.price = price
    this.description = description
  }
}
