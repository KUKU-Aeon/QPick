import { createStore } from 'redux';
import reducer from "./Redux";

const initialValue = JSON.parse(sessionStorage.getItem('Cart')) != null ? JSON.parse(sessionStorage.getItem('Cart')) : [];

const store = createStore(
    reducer,
    initialValue
);

export default store;