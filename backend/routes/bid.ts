import authMiddleware from '../middlewares/auth.js'
import { Bid, Product } from '../orm/index.js'
import express from 'express'
import { getDetails } from '../validators/index.js'
import { Request } from 'express';
import { Token } from 'types/types.js';

const router = express.Router()

router.delete('/api/bids/:bidId', async (req, res) => {
  res.status(600).send()
})

router.post('/api/products/:productId/bids', authMiddleware, async (req: Request<Record<string,string>, any, any> & {user?: Token}, res) => {
  const price: number = + req.body["price"]
  if(Number.isNaN(price) || !(price>0)){
    res.status(400).json(
    {
      "error": "Invalid or missing fields",
	    "details": ["price"]
    })
  }

  const product = await Product.findOne({
    where: { id: req.params["productId"]}
  })

  if(product){
    const newBid = await Bid.create({
      "productId": req.params["productId"],
      "price": price,
      "date": Date.now,
      "bidderId":req.user!.id
    })
    res.status(201).json({
      "id": newBid.id,
      "productId": newBid.productId,
      "price": newBid.price,
      "date": newBid.date,
      "bidderId":newBid.bidderId
    })
  }else{
    res.status(404).json({"error": "Product not found"})
  }
})

export default router
