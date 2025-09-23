'use strict';

function phoneMasked() {
	const inputs = document.querySelectorAll('input[type="tel"]');
	const numbers = input => input.value.replace(/\D/g, '');

  function pasteHandler(evt) {
    const input = evt.target;
    const inputNumbers = numbers(input);
    const pasted = evt.clipboardData || window.clipboardData;
    if (pasted && /\D/g.test(pasted.getData('Text'))) {
      input.value = inputNumbers;
      return;
    }
  }
   
  function inputHandler(evt) {
    const input = evt.target;
    const inputNumbers = numbers(input);
    const start = input.selectionStart;
    let format = "";

    if (!inputNumbers) {
      input.value = "";
      return;
    }

    if (input.value.length != start) {
      if (evt.data && /\D/g.test(evt.data)) {
        input.value = inputNumbers;
      }
      return;
    }
    
    if (inputNumbers.length > 0) {
        format += '(' + inputNumbers.substring(0, 3);
    }
    if (inputNumbers.length >= 4) {
        format += ') ' + inputNumbers.substring(3, 6);
    }
    if (inputNumbers.length >= 7) {
        format += '-' + inputNumbers.substring(6, 8);
    }
    if (inputNumbers.length >= 9) {
        format += '-' + inputNumbers.substring(8, 10);
    }
    input.value = format;
	}

	inputs.forEach(input => {
	  input.addEventListener('input', inputHandler);
      input.addEventListener('paste', pasteHandler);
	});

}
    
document.addEventListener("DOMContentLoaded", phoneMasked);