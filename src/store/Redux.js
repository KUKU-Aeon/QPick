import * as actions from './actionsType';


export default function reducer(state = [], action) {

    const findElement = () =>
    {
        return (state.find((el) => el.id === action.payload.id) && true) || false
    }

    switch (action.type) {
        case actions.CART_ADD:
            if(state.length === 0) return [...state, action.payload]
            if(!findElement()) return [...state, action.payload]
            else{
                const index = state.findIndex(elem => action.payload.id === elem.id);
                const newElement = {
                        id:      state[index].id,
                        img:     state[index].img,
                        title:   state[index].title,
                        type:    state[index].type,
                        price:   state[index].price,
                        rate:    state[index].rate,
                        count:   state[index].count++,

                }
                return [...state.slice( 0, index), ...state.splice(index, 1, newElement), ...state.slice(index + 1)]
            }
        case actions.CART_REMOVE:
            const removeIndex = state.findIndex(elem => action.payload.id === elem.id);

            if (state[removeIndex].count === 1) return [...state.slice( 0, removeIndex), ...state.slice(removeIndex + 1)]
            else{
                const newCopy = {
                    id:      state[removeIndex].id,
                    img:     state[removeIndex].img,
                    title:   state[removeIndex].title,
                    type:    state[removeIndex].type,
                    price:   state[removeIndex].price,
                    rate:    state[removeIndex].rate,
                    count:   state[removeIndex].count--,

                }
                return [...state.slice( 0, removeIndex), ...state.splice(removeIndex, 1, newCopy), ...state.slice(removeIndex + 1)]
            }

        case actions.CART_REMOVE_ALL:
            return [...state.filter(el => el.id !== action.payload.id)]

        default:
            return state;
    }
}