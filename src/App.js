import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

//Hooks
import { useLocalStorage } from './hooks';

//Context
import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
    const [products] = useState(data);
    const [cart, setCart] = useLocalStorage('car', []);

    const addItem = item => {
        setCart([...cart, item]);
    };

    const removeItem = itemId => {
        return () => {
            console.log(itemId);

            cart.splice(
                cart.findIndex(product => {
                    return product.id == itemId;
                }),
                1
            );
            setCart([...cart]);
        };
    };

    return (
        <ProductContext.Provider value={{ products, addItem }}>
            <CartContext.Provider value={{ cart, removeItem }}>
                <div className="App">
                    <Navigation cart={cart} />

                    {/* Routes */}
                    <Route exact path="/" component={Products} />

                    <Route path="/cart" component={ShoppingCart} />
                </div>
            </CartContext.Provider>
        </ProductContext.Provider>
    );
}

export default App;
