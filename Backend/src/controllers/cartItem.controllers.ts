import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model.js";
import CartItemModel from "../models/cartItem.model.js";
import ErrorHandler from "../utils/errorClass.js";

export const addItemToCartHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const userId = req.userId;
      const { productId, quantity } = req.body;
      // const { cartId } = req.params;
      
      if(!productId || !quantity) throw new ErrorHandler("Please provide productId and quantity", 400)

      const cartItem = new CartItemModel({ 
        productId, 
        quantity: 1,
        userId: userId
      });

      const saveCartItem = await cartItem.save();

      // update shoping cart of user
      const updateUserShoppingCart = await UserModel.updateOne({ _id: userId },{ 
        $push: { 
          shoppingCart: productId 
        }
      }
      )
      if(!updateUserShoppingCart) throw new ErrorHandler("Failed to update user shopping cart", 400)

      res.status(201).json({
        success: true,
        message: "item added successfully",
      });

  } catch (error) {
      next(error);
  }
}