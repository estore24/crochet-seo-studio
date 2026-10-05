const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Pinterest AI Backend is running 🚀",
  });
});

// Generate SEO
app.post("/api/generate-seo", async (req, res) => {
  try {
    const { productUrl } = req.body;

    if (!productUrl) {
      return res.status(400).json({
        success: false,
        message: "Product URL is required",
      });
    }

    // بيانات تجريبية مؤقتاً
    // في المرحلة القادمة سنربط AI الحقيقي هنا

    const seoData = {
      title: "Halloween Crochet Patterns – Pumpkin, Ghost & Bat",

      description:
        "Discover adorable Halloween crochet patterns for pumpkin, ghost and bat amigurumi. Perfect crochet PDF patterns for beginners and crochet lovers.",

      keywords:
        "halloween crochet, crochet patterns, amigurumi, crochet pdf, pumpkin crochet, ghost crochet, bat crochet",

      tags:
        "Crochet, Halloween Crochet, Amigurumi, Crochet PDF, DIY Crochet",

      altText:
        "Halloween crochet patterns featuring pumpkin, ghost and bat amigurumi",

      board: "Halloween Crochet Ideas",
    };

    res.json({
      success: true,
      data: seoData,
    });

  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});