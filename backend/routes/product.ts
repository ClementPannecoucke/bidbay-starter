import express from 'express'
import { Product, Bid, User } from '../orm/index.js'
import authMiddleware from '../middlewares/auth.js'
import { getDetails } from '../validators/index.js'
import { Request } from 'express';
import { Token } from 'types/types.js';

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

router.post('/api/products', authMiddleware, async (req: Request<Record<string,string>, any, any> & {user?: Token}, res) => {
  const { name, description, category, originalPrice, pictureUrl, endDate} = req.body;
  const sellerId = req.user?.id;

  if (!name ||!description ||!category ||!originalPrice ||!pictureUrl ||!endDate ||!sellerId) {
    return res.status(400).send({"error" : "Invalid or missing fields", "details" : ""});
    req.body.details;
  }

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
/*
router.get('/api/products/:productId', (req, res) => {
  const productId = req.params.productId;
  const product = Product.findOne({where : {id: req.params["productId"]}})

  .then((product) => {
    if(!product === null){res.status(200).json(product);}
    
  })
.catch((error) => {
    res.status(404).send(error);
  });
});
*/
router.put('/api/products/:productId', async (req, res) => {
  res.status(600).send()
})

router.delete('/api/products/:productId', async (req, res) => {
  res.status(600).send()
})

export default router
