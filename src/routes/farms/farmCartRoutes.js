// const express = require("express");
import express from 'express';
import { 
    addToCart,
    getCartItem,
    deleteCartItem,
    checkOut
} from '../../controllers/farms/farmCartController';
const router = express.Router();


router.post("/addtocart", addToCart)
router.get("/getcartitem", getCartItem)
router.post("/deletcartitem", deleteCartItem)
router.post("/checkout", checkOut)

export default router;
