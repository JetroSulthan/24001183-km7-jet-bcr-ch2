
function hidePlaceholder(selector) {
    const placeholder = document.querySelector(selector);
    if (placeholder) {
      placeholder.style.display = "none";
    }
  }
  
 
  hidePlaceholder('#driverPlaceholder');
  hidePlaceholder('#time option[selected]');
  hidePlaceholder('#passenger option[selected]');
  