import * as actions from "../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import Del from './assets/trashbox.png'
import empty from './assets/emptycart.svg'
import Modal from './Modal'
import {useState} from "react"

export const CartCard = () => {
    const dispatch = useDispatch();
    const Cart = useSelector(state => state);



    const handleAddToCart = (elem) => {
        dispatch(actions.addToCart(elem));
    }

    const handleRemoveFromCart = (elem) => {
        dispatch(actions.removeFromCart(elem));
    }

    const handleRemoveFromCartAll = (elem) => {
        dispatch(actions.removeFromCartAll(elem));
    }

    const Price = Cart.reduce((acc, el) => {
        return acc + (el.price - el.discount) * el.count
    }, 0)

    const modalContent = (
        <>
            <h2>Оплата заказа</h2>
            <form>
                <div className="card-number">
                    <label>Номер карты</label>
                    <input required type="text" id="card-number" name="card-number" inputMode="numeric"
                           autcomplete="cc-number"  placeholder="Введите номер карты" pattern="^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$"/>
                </div>
                <div>
                    <label htmlFor="name">Имя на карте</label>
                    <input required type="text" id="name" name="name" autoComplete="cc-name" pattern="^[a-zA-Z\s\d\/\+\(\)\#\&]*$"/>
                </div>
                <div className="date-code">
                    <div>
                        <label htmlFor="expiry-date">Срок действия</label>
                        <input required type="text" id="expiry-date" name="expiry-date" className="expiry-date"
                               autoComplete="cc-exp" placeholder="MM/YY" minLength="4" pattern="(?:0[1-9]|1[0-2])\/[0-9]{2}"/>
                    </div>
                    <div>
                        <label htmlFor="security-code">CVC/CVV</label>
                        <input required type="password" id="security-code" name="security-code" inputMode="numeric"
                               minLength="3" maxLength="4" pattern="/^[0-9]{3,4}$/"/></div>
                </div>
                <button >Оплатить на сумму {Price} ₽</button>
            </form>
        </>
    );

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const toggleVisibility = () =>
    {
        setModalIsOpen(!modalIsOpen);
    }




    if (Cart.length === 0) return (<><main><h2>Упс, кажется в Вашей корзине ничего нет... <br/><NavLink to="/">Перейти к покупкам</NavLink></h2><img src={empty} alt="Пусто!" className={"empty"} /></main></>)
    else {
        return (
            <>
                <Modal content={modalContent} visibility={modalIsOpen} state={{toggleVisibility}}> </Modal>
                <h1>Корзина</h1>
                <div className="regPurchase">
                    <h3 style={{padding:"0 10px"}}>ИТОГО<p style={{float: "right", margin:"0"}}>₽{Price}</p></h3>
                    <button onClick={toggleVisibility}>Перейти к оформлению</button>
                </div>
                <div className={"CartSection"}>
                    {Cart.map((el) =>
                        <>
                            <div className={"cartCard"} key={el.id}>
                                <button onClick={() => handleRemoveFromCartAll(el)} style={{float: "right", backgroundColor: "#ffffff"}}><img src={Del} alt="Удалить всё" style={{width: "25px"}}/></button>
                                <div className={"cartInfo"}>
                                    <div className={"cartData"}>
                                        <img src={require(`${el.img}`)} alt=""/>
                                        <div style={{display: "flex", alignItems: "end"}}>
                                            <p style={{textAlign: "left"}}>{el.title}<br/><p style={{
                                                textAlign: "left",
                                                color: "rgba(0, 0, 0, 0.45)",
                                                verticalAlign: 'middle'
                                            }}>{el.price}₽</p></p>

                                        </div>
                                    </div>
                                    <div className={"cartFlexible"}>
                                        <div>
                                            <button onClick={() => handleRemoveFromCart(el)}>-</button>
                                            {el.count}
                                            <button onClick={() => handleAddToCart(el)}>+</button>
                                        </div>
                                        <p style={{textAlign: "right"}}>{(el.price - el.discount) * el.count}₽</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </>
        )
    }
}

