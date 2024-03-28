import React from 'react';
import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import Header from '../src/Components/Header'
import Footer from '../src/Components/Footer'
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";


function App() {
  return (
          <Router basename={process.env.PUBLIC_URL}>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage/>}>

            </Route>

            <Route path="/cart" element={<CartPage/>}>

            </Route>

        </Routes>
          <Footer/>
          </Router>
  );
}

export default App;
