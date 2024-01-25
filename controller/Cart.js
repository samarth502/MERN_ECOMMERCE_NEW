const { Cart } = require("../model/Cart");

exports.fetchCartById = async (req, res) => {
    const {id} = req.user;
  try {
    const cartItem = await Cart.find({user:id}).populate('product');
    res.status(200).json(cartItem);
  } catch (err) {
    res.status(200).json(err);
  }
};



exports.addToCart = async (req, res) => {
  const {id} = req.user;  
    const cart = new Cart({...req.body,user:id});
    // const cart = new Cart(req.body);

    try {
      const doc = await cart.save();
      const result = await doc.populate('product');

      res.status(201).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  exports.deleteFromCart = async (req, res) => {
    // const cart = new Cart(req.body);
    const {id} = req.params;

    try {
      const doc = await Cart.findByIdAndDelete(id);
      res.status(200).json(doc);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  exports.updateCart = async (req,res)=>{
    const {id} = req.params;
   try {
    const cart = await Cart.findByIdAndUpdate(id,req.body,{new:true})
      const result = await cart.populate('product');

    res.status(200).json(result)
    
   } catch (err) {
    res.status(400).json(err);

    
   }

}