const Product = require("../models/productModels");
const ErrorHander = require("../utils/errorHandler");
const asyncFunError = require("../middleware/catchErrorAsync");
const ApiFeatures = require("../utils/apiFeature");
const cloudinary = require("cloudinary");

// create product ----Admin
exports.createProduct = async (req, res, next) => {
  try {
    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "product",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.url,
      });
    }
    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
      succes: true,
      product,
    });
  } catch (error) {
    res.status(401).json({
      succes: false,
      error: error,
    });
  }
};

// get all product
exports.getAllProduct = asyncFunError(async (req, res) => {
  const resultParPage = 8;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()

    // let products = await ApiFeatures.query;
    // let filterProductCount = products.length;

    .pagination(resultParPage);

  const products = await apiFeature.query;
  res.status(201).json({
    succes: true,
    products,
    resultParPage,
    productCount,
  });
});

// get all product {**ADMIN**}
exports.getAdminProduct = asyncFunError(async (req, res) => {
  const products = await Product.find();

  res.status(201).json({
    succes: true,
    products,
  });
});

// update product
exports.updateProduct = asyncFunError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    res.status(500).json({
      succes: false,
      massage: "product not found ",
    });
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // delete images fron cloudenry
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "product",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.url,
      });

      req.body.images = imagesLinks;
    }
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    succes: true,
    product,
  });
});

// delete product
exports.deleteProduct = asyncFunError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(500).json({
      succes: false,
      message: "prduct not found !",
    });
  }

  // delete images fron cloudenry
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();
  res.status(200).json({
    succes: true,
    message: "prduct delete succesfully !",
  });
});

// get single product detels
exports.getProductDetels = asyncFunError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }
  res.status(200).json({
    succes: true,
    product,
  });
});

// create product review

exports.createProductReview = asyncFunError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.NumOfReview = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforSave: false });

  res.status(200).json({
    succes: true,
  });
});

// get all product review

exports.getAllReviews = asyncFunError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    next(new ErrorHander("product not found!", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete product review

exports.deleteProductRewies = asyncFunError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    next(new ErrorHander("product not found!", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / product.reviews.length;
  const NumOfReview = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      NumOfReview,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
