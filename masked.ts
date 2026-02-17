function phoneMasked() {
	
  const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="tel"]')
  const rE: RegExp = /\D/g
	const numbers = (el: HTMLInputElement): string => el.value.replace(rE, '')
  
  const pasteHandler = (evt: ClipboardEvent ) => {
    const input = evt.target as HTMLInputElement
    const inNum = numbers(input)
    const pasted = evt.clipboardData // || window.clipboardData
    
    if (pasted && rE.test(pasted.getData('Text'))) {
      input.value = inNum
      return
    }
  }
   
  const inputHandler = (evt: Event) => {
    const input = evt.target as HTMLInputElement
    const inNum = numbers(input)
    const start = input.selectionStart
    const {length} = inNum
    let format = ''

    if (!inNum) {
      input.value = ''
      return
    }

    if (input.value.length != start) {
      const {data} = evt as InputEvent
      if (data && rE.test(data)) input.value = inNum
      return
    }

    const change = (str: string, s: number, f: number) => {
      format += str + inNum.substring(s, f)
    }

    if (length > 0) change('(', 0, 3)
    if (length >= 4) change(') ',3 ,6)
    if (length >= 7) change('-', 6, 8)
    if (length >= 9) change('-', 8, 10)
    
    input.value = format
	}

	inputs.forEach((input) => {
	  input.addEventListener('input', inputHandler)
    input.addEventListener('paste', pasteHandler)
	})

}
    
document.addEventListener("DOMContentLoaded", phoneMasked)