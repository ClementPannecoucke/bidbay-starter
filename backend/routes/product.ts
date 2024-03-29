import express from 'express'
import { Product, Bid, User } from '../orm/index.js'
import authMiddleware from '../middlewares/auth.js'
import { getDetails } from '../validators/index.js'

const router = express.Router()

router.get('/api/products', async (req, res) => {
  try {
    const products = await Product.findAll({
      include : [{model: User, as: 'seller'}, {model: Bid, as: 'bids'}]
    });

    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).json({"error": "Products not found"});
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/api/products',(req, res) => {
  const { name, description, category, originalPrice, pictureUrl, endDate, sellerId } = req.body;

  const newProduct = {
    name,
    description,
    category,
    originalPrice,
    pictureUrl,
    endDate,
    sellerId
  };

  Product.create(newProduct)
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((error) => {
      res.status(401).send(error);
    });
});


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
