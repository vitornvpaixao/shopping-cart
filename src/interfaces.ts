// Interfaces
type status = 'loading' | 'error' | 'success';
 
export interface IState {
    status: status,
    products: IProduct[],
    errorMessage: string,
    cart: ICart
}

export interface IProduct {
    id: number,
    name: string,
    price: number,
    category: string,
    // others depending on API
}

export interface ICart {
    readonly items: ICartItem[],
}

export interface ICartItem {
    productId: number,
    quantity: number,
    timeStamp: Date,
}

// Store
// Should be decopled from app and have his onw file simulating a store.
// Should be private and encapsulated and provide methods do deal with data: 
// - addToCart -> Allow add products to cart
// - removeFromCart -> Allow remove products from cart
// - updateQuantity -> Allow to update cart product quantity
// - getState -> Get information about global state, such as status or products or errorMessage
// - setItem/getItem -> Allow to update cart if has data stored in localStorage (other responsability - other file)

// Utils
// - getCartTotalValue -> receive the cart total value correctly formated
// - formatValueToCurrency -> implicit
// - Other formaters

// Delivery Plan
// First deliver is this with interfaces and all the ideas
// Second deliver I would provide the store logic + local storage logic
// Third deliver I would give app logic working with UI (Could be dummy and need improves)
// Fourth deliver I would give some utils to deal with values
