
import asyncHandler from "express-async-handler"
import FarmProduct from "../../models/farms/farmProductModel"

let cart = []
const addToCart = asyncHandler(async (req, res)=>{
    
    //find the added product
    const addedProduct = await FarmProduct.findById(req.body._id)[0]
    //check if cart is empty
    
    if(addedProduct.availableQuantity === 0){
        return res.status(404).json({error: `Product is out of stock, check back on: ${addedProduct.availabilityDate} `})
    }
    //check if product is in cart, if yes just add to the qty
    if(cart){//cart is not empty
        const productId = await req.body._id;
        const existingFarmProductIndex =await cart.products.find((p) => p.id === productId);//checking if product is already existing in shopping cart
        if(existingFarmProductIndex >= 0){
            const existingFarmProduct = cart.products[existingFarmProductIndex];
            existingFarmProduct.qty += 1;
            cart.totalPrice += addedProduct.perUnitPrice;
        }else{//if product is not existing
            addedProduct.qty = 1;
            cart.products.push(addedProduct)
            cart.totalPrice = addedProduct.perUnitPrice
        }
    }else{//cart is empty
        cart = {products: [], totalPrice: 0};
        addedProduct.qty = 1;
        //add the item to the cart
        cart.products.push(addedProduct)
        cart.totalPrice = addedProduct.perUnitPrice
    }
    res.json({message: "Product added to cart", cart})
});

const getCartItem = asyncHandler(async (req, res)=>{
    res.json(cart)
});

const deleteCartItem = asyncHandler(async (req, res)=>{
    const productId = await req.body._id;
    const existingFarmProductIndex = await cart.products.find((p) => p.id === productId);
    if(existingFarmProductIndex !== -1){
        cart.splice(existingFarmProductIndex, 1); //resmove item from cart
        res.status(200).json({message: "successfully deleted"})
        return true;
    }
    res.status(400).json({message: "Item is not in cart"})
    return false;
});
const checkOut = asyncHandler((req, res) =>{
   cart.length = 0;// clear the cart after successful checkout
    
})
export {
    addToCart,
    getCartItem,
    deleteCartItem,
    checkOut
}