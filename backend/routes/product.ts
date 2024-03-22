import express from 'express'
import { Product, Bid, User } from '../orm/index.js'
import authMiddleware from '../middlewares/auth.js'
import { getDetails } from '../validators/index.js'

const router = express.Router()

router.get('/api/products', async (_req, res, next) => {
  try {
    const products = await Product.findAll({});
    res.status(200).json(products);
  } catch (e : unknown){
    res.status(400).json(e);
  }
})

router.get('/api/products/:productId', async (req, res) => {
  const product = await Product.findOne({
    where: { id: req.params["productId"]},
    include : [{model: User, as: 'seller'}, {model: Bid, as: 'bids'}]
  })

  if(product){
    res.status(200).json({
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "category": product.category,
        "originalPrice": product.originalPrice,
        "pictureUrl":product.pictureUrl,
        "endDate": product.endDate,
        "seller": product.seller,
        "bids": product.bids
    })
  }else{
    res.status(404).json({"error": "Product not found"})
  }
})

// You can use the authMiddleware with req.user.id to authenticate your endpoint ;)

router.post('/api/products', (req, res) => {
  res.status(600).send()
})

router.put('/api/products/:productId', async (req, res) => {
  res.status(600).send()
})

router.delete('/api/products/:productId', async (req, res) => {
  res.status(600).send()
})

export default router
