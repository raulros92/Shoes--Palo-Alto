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

  // Logica para cambiar la posición de la etiqueta descuento en la página producto
  document.addEventListener("DOMContentLoaded", function () {
    const badgeCustom = document.querySelector(
      ".product__badge__item--custom-product"
    );
    const priceOffCustom = document.querySelector(
      ".product__price--off-custom"
    );

    if (badgeCustom && priceOffCustom) {
      // Cambia top y left de .product__price--off-custom si existe el badge custom
      priceOffCustom.style.top = "1.8rem";
      priceOffCustom.style.left = "1.8rem";
    }
  });

  // Lógica para seleccionar tiendas mediante botones
  document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".button-custom");
    const columnItems = document.querySelectorAll(".column-item");

    // Al cargar la página, queremos que todos los items estén visibles
    columnItems.forEach((item) => item.classList.add("show"));

    // Selecciona el botón "Todas" por defecto
    buttons.forEach((button) => {
      const buttonText = button
        .querySelector("span")
        .textContent.trim()
        .toLowerCase();
      if (buttonText === "todas") {
        button.classList.add("selected"); // Marca el botón "Todas" como seleccionado
      }
    });

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        // Obtén el texto del span dentro del botón seleccionado
        const selectedText = this.querySelector("span")
          .textContent.trim()
          .toLowerCase();

        // Recorrer todos los column-items
        columnItems.forEach((item) => {
          const columnText = item
            .querySelector(".column-item__text")
            .textContent.trim()
            .toLowerCase();

          // Si el texto es "todas", mostramos todos los items
          if (selectedText === "todas") {
            item.classList.add("show"); // Muestra todos los elementos
          } else {
            // Comparar el texto del span con el texto dentro del column-item
            if (columnText.includes(selectedText)) {
              item.classList.add("show"); // Muestra el elemento si coincide
            } else {
              item.classList.remove("show"); // Oculta el elemento si no coincide
            }
          }
        });

        // Elimina la clase 'selected' de todos los botones
        buttons.forEach((btn) => {
          btn.classList.remove("selected");
        });

        // Agrega la clase 'selected' al botón clicado
        this.classList.add("selected");
      });
    });
  });

  // ^^ Keep your scripts inside this IIFE function call to
  // avoid leaking your variables into the global scope.
})();
