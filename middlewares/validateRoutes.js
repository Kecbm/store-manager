const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  
  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity < 0 || quantity === 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  
  next();
};

const validateQuantitySale = (req, res, next) => {
  const arrSales = req.body;

  arrSales.forEach((elem) => {
    if (elem.quantity < 0 || elem.quantity === 0) {
      const error = { message: '"quantity" must be greater than or equal to 1', statusCode: 422 };
      throw error;
    }
  
    if (!elem.quantity) {
      const error = { message: '"quantity" is required', statusCode: 400 };
      throw error;
    }    
  });

  next();
};

const validateProductId = (req, res, next) => {
  const arrSales = req.body;

  const error = { message: '"productId" is required', statusCode: 400 };

  arrSales.forEach((elem) => {
    if (!elem.productId) {
      throw error;
    }    
  });

  next();
};

const validateRoutes = {
  validateName,
  validateQuantity,
  validateProductId,
  validateQuantitySale,
};

module.exports = validateRoutes;