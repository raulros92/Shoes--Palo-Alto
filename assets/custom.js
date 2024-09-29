/*
 * Palo Alto Theme
 *
 * Use this file to add custom Javascript to Palo Alto.  Keeping your custom
 * Javascript in this fill will make it easier to update Palo Alto. In order
 * to use this file you will need to open layout/theme.liquid and uncomment
 * the custom.js script import line near the bottom of the file.
 */

(function () {
  // Add custom code below this line

  document.addEventListener("DOMContentLoaded", function () {
    // Function to update SKU value dynamically
    function updateSKU(sku) {
      const skuElement = document.getElementById("sku-value");
      if (skuElement) {
        skuElement.textContent = sku;
        console.log("SKU updated to:", sku);
      } else {
        console.log("SKU element not found.");
      }
    }

    // Function to get the selected variant based on selected options
    function getSelectedVariant() {
      // Combine color and size inputs
      const selectedOptions = Array.from(
        document.querySelectorAll(
          ".swatch__input:checked, .radio__input:checked"
        )
      ).map((input) => input.value);
      console.log("Selected options:", selectedOptions);

      const matchingVariant = productVariants.find((variant) => {
        // Ensure all options match the variants
        return selectedOptions.every(
          (option, index) => variant[`option${index + 1}`] === option
        );
      });

      if (matchingVariant) {
        console.log("Selected variant found:", matchingVariant);
        return matchingVariant;
      } else {
        console.log("No matching variant found.");
        return null;
      }
    }

    // Event listener for variant changes
    const allInputs = document.querySelectorAll(
      ".swatch__input, .radio__input"
    );
    allInputs.forEach(function (input) {
      input.addEventListener("change", function () {
        const selectedVariant = getSelectedVariant();
        if (selectedVariant) {
          updateSKU(selectedVariant.sku);
        } else {
          console.log("No valid variant selected.");
        }
      });
    });
  });

  // ^^ Keep your scripts inside this IIFE function call to
  // avoid leaking your variables into the global scope.
})();
