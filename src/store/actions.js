import * as actions from './actionsType';
export const addToCart = elem => ({
    type: actions.CART_ADD,
    payload: elem
});

export const removeFromCart = elem => ({
    type: actions.CART_REMOVE,
    payload: elem
})

export const removeFromCartAll = elem => ({
    type: actions.CART_REMOVE_ALL,
    payload: elem
})