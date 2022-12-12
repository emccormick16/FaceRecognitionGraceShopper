/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCart, addBookToCart } from "../../store/cartSlice";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

const SingleProductAdd = ({ book, quantity }) => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.cart)
  const userId = user.id;
  const loadCartFromLocalStorage = () => {
    // Get the stringified cart from local storage
    const cartString = localStorage.getItem('cart');
  
    // Parse the stringified cart to get the original cart object
    const cart = JSON.parse(cartString);
  
    // Return the cart object
    dispatch(setCart(cart))
  };
  const saveCartToLocalStorage = cart => {
    // Local storage can only store strings, so we need to convert the cart object to a string
    const cartString = JSON.stringify(cart);
  
    // Now we can save the stringified cart to local storage
    localStorage.setItem('cart', cartString);
  };

  useEffect(()=> {
    loadCartFromLocalStorage()
  },[])
  const addToCart = async () => {
      try {
          if (!user.id) {
              const existingItem = cart.find((cartItem) => cartItem.book.id === book.id);
                  if(existingItem && existingItem.book.stock >= existingItem.quantity + quantity && quantity !== 0) {
                    const updatedQuantity = existingItem.quantity + quantity
                    const newCart = cart.map(item => {
                        if (item.book.id === existingItem.book.id) {
                            return {
                                ...item,
                                quantity: updatedQuantity,
                            };
                        }
                        return item;
                    });
                    dispatch(setCart(newCart))
                    saveCartToLocalStorage(newCart)
            } else if(existingItem && existingItem.book.stock < existingItem.quantity + quantity && quantity !== 0){
                const updatedQuantity = existingItem.book.stock
                const newCart = cart.map(item => {
                    if (item.book.id === existingItem.book.id) {
                        return {
                            ...item,
                            quantity: updatedQuantity,
                        };
                    }
                    return item;
                });
                dispatch(setCart(newCart))
                saveCartToLocalStorage(newCart)
            }
            else 
            if(!existingItem && quantity !== 0) {
                const { data }= await axios.get(`/api/books/${book.id}`)
                const bookAndQuantity = {quantity: 1, book:data}
                dispatch(addBookToCart(bookAndQuantity))
                saveCartToLocalStorage([...cart, bookAndQuantity])
            }
        } else if (user.id) {
            const existingItem = cart.find((cartItem) => cartItem.book.id === book.id);
            if(existingItem){
                const quantityToAdd = Number(quantity + existingItem.quantity)
                if(existingItem.book.stock >= quantityToAdd){
                    await axios.put(`/api/cart/${existingItem.id}`,{
                        quantity: quantityToAdd
                    })
                    const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
                    dispatch(setCart(updatedCart.data))
                    saveCartToLocalStorage(updatedCart.data)
                } else if (existingItem.book.stock < quantityToAdd){
                    await axios.put(`/api/cart/${existingItem.id}`,{
                        quantity: existingItem.book.stock
                    })
                    const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
                    dispatch(setCart(updatedCart.data))
                    saveCartToLocalStorage(updatedCart.data)
                }
            } else if(!existingItem){
                const foundBook = await axios.get(`/api/books/${book.id}`)
                const bookToAdd = foundBook.data
                const bookId = book.id
                if(bookToAdd.stock >= quantity){
                    const quantityToAdd = Number(quantity)
                    const body = { userId, bookId, quantityToAdd };
                    await axios.post("/api/cart/quantity", body);
                    const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
                    console.log(updatedCart)
                    dispatch(setCart(updatedCart.data))
                    saveCartToLocalStorage(updatedCart.data)
                } else if(bookToAdd.stock < quantity){
                    console.log('we should be here')
                    const quantityToAdd = bookToAdd.stock
                    console.log(quantityToAdd)
                    const body = { userId, bookId, quantityToAdd };
                    await axios.post("/api/cart/quantity", body);
                    const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
                    console.log(updatedCart)
                    dispatch(setCart(updatedCart.data))
                    saveCartToLocalStorage(updatedCart.data)
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <>
      <Button 
      disabled={book.stock === 0 && true}
      size="small" onClick={addToCart}>
        {book.stock !== 0 ? <AddShoppingCart /> : <ProductionQuantityLimitsIcon/> }

      </Button>
    </>
  );
};

export default SingleProductAdd;
