import { useState, useEffect, useMemo } from 'react'
import type {Guitar, CartItem} from '../types'

export const useCart = ()  => {

    const initialCart = () : CartItem[]=>{
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }
     
   
      const [cart, setCart]= useState(initialCart)
    
      const MIN_ITEMS = 1
      const MAX_ITEMS = 5
    
    
      useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])   
      
    
      function removeFromCart(id : Guitar['id']) {
        setCart(prevCart=> prevCart.filter(guitar=>guitar.id !== id))
      }
    
      function increaseQuantity(id : Guitar['id']) {
        const updatedCart= cart.map(guitar=> {
          if (guitar.id === id && guitar.quantity < MAX_ITEMS) {
            return {
              ...guitar,
              quantity: guitar.quantity + 1
            }
          } else {
            return guitar
          }
        })
        setCart(updatedCart)
      }
    
      function decreaseQuantity(id : Guitar['id']) {
        const updatedCart= cart.map(guitar=> {
          if (guitar.id === id && guitar.quantity > MIN_ITEMS) {
            return {
              ...guitar,
              quantity: guitar.quantity - 1
            }
          } else {
            return guitar
          }
        })
        setCart(updatedCart)
      }
    
      function clearCart() {
        setCart([])
      }

      // State derivado
    const isEmpty = useMemo(()=> cart.length === 0, [cart])
    const cartTotal = useMemo(()=> cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart], 0);




    return {        
        cart,        
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}