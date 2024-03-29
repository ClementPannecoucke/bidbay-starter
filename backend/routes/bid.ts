import authMiddleware from '../middlewares/auth'
import { Bid, Product } from '../orm/index.js'
import express from 'express'
import { getDetails } from '../validators/index.js'

const router = express.Router()

router.delete('/api/bids/:bidId', async (req, res) => {
  res.status(600).send()
})

router.post('/api/products/:productId/bids', authMiddleware, async (req, res) => {
  if(!req.body["price"]){
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
      "productId": product.id,
      "price": product.originalPrice,
      "date": product.endDate,
      "bidderId":product.bids
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
