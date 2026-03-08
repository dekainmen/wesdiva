const express = require("express");
const router = express.Router();

/**
 * Import products JSON
 */

const products = require("../data/products.json");


/**
 * GET ALL PRODUCTS
 * Optional filters: category, subcategory
 */

router.get("/", (req, res) => {

  try {

    const { category, subcategory } = req.query;

    let result = products;

    if (category) {

      result = result.filter(p =>
        (p.category || "").toLowerCase() === category.toLowerCase()
      );

    }

    if (subcategory) {

      result = result.filter(p =>
        (p.subcategory || "").toLowerCase() === subcategory.toLowerCase()
      );

    }

    res.json(result);

  } catch (err) {

    console.error("PRODUCT FETCH ERROR:", err);

    res.status(500).json({
      error: "Failed to fetch products"
    });

  }

});


/**
 * GET SINGLE PRODUCT BY ID
 */

router.get("/:id", (req, res) => {

  try {

    const productId = req.params.id;

    console.log("Fetching product:", productId);

    const product = products.find(
      p => String(p.id) === String(productId)
    );

    if (!product) {

      return res.status(404).json({
        error: "Product not found"
      });

    }

    res.json(product);

  } catch (err) {

    console.error("SINGLE PRODUCT ERROR:", err);

    res.status(500).json({
      error: "Failed to fetch product"
    });

  }

});


module.exports = router;