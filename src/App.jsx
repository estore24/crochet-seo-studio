import { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [seoData, setSeoData] = useState({
    title: "",
    description: "",
    keywords: "",
    tags: "",
    altText: "",
    board: "",
  });

  const [error, setError] = useState("");

  // =========================
  // Upload Image
  // =========================
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setImage(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // =========================
  // Generate SEO
  // =========================
  const handleGenerate = async () => {
    setError("");

    if (!url.trim()) {
      setError("Please enter your product URL.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/generate-seo",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            productUrl: url,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Something went wrong."
        );
      }

      if (!result.success) {
        throw new Error(
          result.message || "SEO generation failed."
        );
      }

      setSeoData(result.data);
    } catch (error) {
      console.error("Frontend Error:", error);

      setError(
        "Cannot connect to backend. Make sure the backend is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Copy text
  // =========================
  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // Reset
  // =========================
  const handleReset = () => {
    setImage(null);
    setImagePreview("");
    setUrl("");

    setSeoData({
      title: "",
      description: "",
      keywords: "",
      tags: "",
      altText: "",
      board: "",
    });

    setError("");
  };

  return (
    <div className="app">
      {/* =========================
          HEADER
      ========================= */}
      <header className="header">
        <div>
          <h1>Pinterest AI SEO Tool</h1>

          <p>
            Generate Pinterest SEO content for your digital
            products.
          </p>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          AI Generator
        </div>
      </header>

      {/* =========================
          MAIN
      ========================= */}
      <main className="container">
        {/* =========================
            LEFT SIDE
        ========================= */}
        <section className="card">
          <h2>Create Your Pin</h2>

          <p className="subtitle">
            Upload your Pin image and add your product URL.
          </p>

          {/* IMAGE UPLOAD */}
          <div className="upload-box">
            {imagePreview ? (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Pin preview"
                />

                <button
                  className="remove-image"
                  onClick={() => {
                    setImage(null);
                    setImagePreview("");
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <label
                htmlFor="image-upload"
                className="upload-label"
              >
                <div className="upload-icon">📷</div>

                <strong>Upload Pin Image</strong>

                <span>
                  PNG, JPG or WEBP
                </span>

                <input
                  id="image-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageUpload}
                  hidden
                />
              </label>
            )}
          </div>

          {/* PRODUCT URL */}
          <div className="form-group">
            <label>
              Product / Website URL
            </label>

            <input
              type="url"
              placeholder="https://your-product.com"
              value={url}
              onChange={(event) =>
                setUrl(event.target.value)
              }
            />
          </div>

          {/* ERROR */}
          {error && (
            <div className="error">
              ⚠️ {error}
            </div>
          )}

          {/* GENERATE */}
          <button
            className="generate-button"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading
              ? "Generating SEO..."
              : "✨ Generate Pinterest SEO"}
          </button>

          {/* RESET */}
          <button
            className="reset-button"
            onClick={handleReset}
          >
            Reset
          </button>
        </section>

        {/* =========================
            RIGHT SIDE
        ========================= */}
        <section className="card results-card">
          <div className="results-header">
            <div>
              <h2>SEO Results</h2>

              <p className="subtitle">
                Your Pinterest optimization data.
              </p>
            </div>

            <div className="ai-badge">
              AI
            </div>
          </div>

          {/* TITLE */}
          <div className="seo-field">
            <div className="field-header">
              <label>Title</label>

              {seoData.title && (
                <button
                  onClick={() =>
                    copyText(seoData.title)
                  }
                >
                  Copy
                </button>
              )}
            </div>

            <div className="field-content">
              {seoData.title ||
                "Your Pinterest title will appear here..."}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="seo-field">
            <div className="field-header">
              <label>Description</label>

              {seoData.description && (
                <button
                  onClick={() =>
                    copyText(seoData.description)
                  }
                >
                  Copy
                </button>
              )}
            </div>

            <div className="field-content large">
              {seoData.description ||
                "Your Pinterest description will appear here..."}
            </div>
          </div>

          {/* KEYWORDS */}
          <div className="seo-field">
            <div className="field-header">
              <label>Keywords</label>

              {seoData.keywords && (
                <button
                  onClick={() =>
                    copyText(seoData.keywords)
                  }
                >
                  Copy
                </button>
              )}
            </div>

            <div className="field-content">
              {seoData.keywords ||
                "Keywords will appear here..."}
            </div>
          </div>

          {/* TAGS */}
          <div className="seo-field">
            <div className="field-header">
              <label>Tags</label>

              {seoData.tags && (
                <button
                  onClick={() =>
                    copyText(seoData.tags)
                  }
                >
                  Copy
                </button>
              )}
            </div>

            <div className="field-content">
              {seoData.tags ||
                "Tags will appear here..."}
            </div>
          </div>

          {/* ALT TEXT */}
          <div className="seo-field">
            <div className="field-header">
              <label>Alt Text</label>

              {seoData.altText && (
                <button
                  onClick={() =>
                    copyText(seoData.altText)
                  }
                >
                  Copy
                </button>
              )}
            </div>

            <div className="field-content">
              {seoData.altText ||
                "Alt text will appear here..."}
            </div>
          </div>

          {/* BOARD */}
          <div className="seo-field">
            <div className="field-header">
              <label>Recommended Board</label>
            </div>

            <div className="board">
              📌{" "}
              {seoData.board ||
                "Recommended board will appear here..."}
            </div>
          </div>
        </section>
      </main>

      {/* =========================
          PIN PREVIEW
      ========================= */}
      <section className="preview-section">
        <h2>Pin Preview</h2>

        <div className="pin-preview">
          <div className="pin-image">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Pinterest Pin"
              />
            ) : (
              <div className="empty-preview">
                <span>📌</span>
                <p>Your Pin preview</p>
              </div>
            )}
          </div>

          <div className="pin-info">
            <span className="preview-label">
              PIN TITLE
            </span>

            <h3>
              {seoData.title ||
                "Your Pinterest title"}
            </h3>

            <span className="preview-label">
              DESCRIPTION
            </span>

            <p>
              {seoData.description ||
                "Your Pinterest description will appear here."}
            </p>

            <div className="preview-board">
              📌{" "}
              {seoData.board ||
                "Your recommended board"}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;