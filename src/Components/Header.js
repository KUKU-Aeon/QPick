import {NavLink} from "react-router-dom";
import heart from "./assets/heart.svg"
import cart from "./assets/cart.svg"
import { useSelector } from "react-redux";
import {useState} from "react";

let header
let prevScroll = window.pageYOffset;
let scroll = window.pageYOffset;
let hidden = false;

let scrolledDown = 0;

async function onScroll()
{

    header = await document.querySelector('header');

    if (!header) {
        return;
    }

    scroll = window.pageYOffset;

    if ((header) && !hidden) {
        header.classList.remove('hidden');
    }

    if ((scroll - prevScroll > 0) && !hidden) {
        header.classList.add('hidden');
        hidden = true;
        prevScroll = scroll;
        scrolledDown = 0;
    } else {
        if (hidden && (scroll - prevScroll < 0))
            scrolledDown += scroll - prevScroll;
        else
            scrolledDown = 0;

        if ((scrolledDown < -50) && hidden) {
            header.classList.remove('hidden');
            hidden = false;
            prevScroll = scroll
        }
    }
    if (hidden && window.pageYOffset === 0) {
        header.classList.remove('hidden');
        hidden = false;
        prevScroll = scroll
    }

    prevScroll = scroll
}

const overflowHTML = (rule) => {
    rule ? document.getElementsByTagName('html')[0].style.overflow ="hidden" : document.getElementsByTagName('html')[0].style.overflow ="";
}

function Header() {
    window.addEventListener('scroll', onScroll);

    const Cart = useSelector(state => state);
    sessionStorage.setItem('Cart', JSON.stringify(Cart))
    const [isNavExpanded, setIsNavExpanded] = useState(false)

    const inCart = Cart.reduce((acc, el) => {
        return acc + el.count;
    }, 0)

    return (
        <header>
            <button className="hamburger" onClick={() => {
                setIsNavExpanded(!isNavExpanded);
                overflowHTML(!isNavExpanded)
            }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="black"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <nav className={isNavExpanded ? "active" : ""} onClick={() => {
                setIsNavExpanded(!isNavExpanded);
                overflowHTML(!isNavExpanded)
            }}>
                <NavLink to="/"><h1>QPICK</h1></NavLink>
                <div>
                    <NavLink to="/favorite"><button><img src={heart} alt="lovely" /></button><span className="favorite">0</span></NavLink>
                    <NavLink to="/cart"> <button><img src={cart} alt="cart" /></button><span className="shoping">{inCart}</span></NavLink>
                </div>
            </nav>
        </header>
    );
}

export default Header;
