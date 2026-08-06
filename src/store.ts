import { type IState, type IProduct, type ICartItem } from './interfaces';

const state: IState = {
    status: 'loading',
    products: [],
    errorMessage: '',
    cart: {
        items: []
    }
}

let subscribers: (() => void)[] = [];

export function addToCart(product: IProduct) {
    const hasProduct = state.cart.items.find(prod => prod.productId === product.id);

    if (hasProduct) {
        const newItemsArray: ICartItem[] = state.cart.items.map(prod => {
            if (prod.productId === product.id) {
                return { ...prod, quantity: prod.quantity + 1 };
            }

            return prod;
        })

        state.cart = { ...state.cart, items: newItemsArray };
    } else {
        const newItemCart: ICartItem = { 
            productId: product.id, 
            quantity: 1, 
            timeStamp: new Date() 
        }
        
        state.cart = { ...state.cart, items: [...state.cart.items, newItemCart] };
    }

    notify();
}

export function removeFromCart(productId: number) {
    const newItemsArray: ICartItem[] = state.cart.items.filter(prod => prod.productId !== productId);

    state.cart = { ...state.cart, items: newItemsArray };
    notify();
}

export function updateQuantity(productId: number, newQuantity: number) {
    // quantity at 0 is not handled here; removal is a separate explicit action (trash button)

    const newItemsArray: ICartItem[] = state.cart.items.map(prod => {
        if (prod.productId === productId) {
            return { ...prod, quantity: newQuantity };
        }

        return prod;
    })

    state.cart = { ...state.cart, items: newItemsArray };
    notify();
}

export function getState(): Readonly<IState> {
    return state;
}

export function subscribe(fn: () => void) {
    subscribers = [...subscribers, fn];
}

function notify() {
    subscribers.forEach(fn => fn());
}
