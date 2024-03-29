import express from 'express'
import { User, Product, Bid } from '../orm/index.js'

const router = express.Router()

router.get('/api/users/:userId', async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params["userId"]},
    include : [
      {model: Product, as: 'products', attributes:['id', 'name', 'description', 'category', 'originalPrice', 'pictureUrl', 'endDate']},
      {model: Bid, as: 'bids', include:[{model: Product, as: 'product', attributes:['id','name']}], attributes:['id','price','date']}]
  })

  if(user){
    res.status(200).json({
      "id": user.id,
	    "username": user.username,
	    "email": user.email,
	    "admin": user.admin,
	    "products": user.products,
	    "bids": user.bids
    })
  }else{
    res.status(404).json({"error": "User not found"})
  }
})

export default router
