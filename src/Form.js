import createElement from './createElement'

const Form = (function () {
  let form = null

  function createForm() {
    if(!form) return

    const titleInput = createElement(
      'input',
      ['titleInput'],
      { placeholder: 'title', name: 'title' }
    )
    form.appendChild(titleInput);
  
    const authorInput = createElement(
      'input',
      ['authorInput'],
      { placeholder: 'author', name: 'author' }
    )
    form.appendChild(authorInput);
  
    const pagesInput = createElement(
      'input',
      ['pagesInput'],
      { placeholder: 'pages', name: 'pages' }
    )
    form.appendChild(pagesInput);
    
    const readLabel = createElement('label', [], { for: 'readInput' })
    readLabel.textContent = 'read?'
    readLabel.style.display = 'flex'
    form.appendChild(readLabel)

    const readInput = createElement(
      'input',
      ['readInput'],
      { placeholder: 'read? true/false', name: 'read', type: 'checkbox'}
    )
    readLabel.appendChild(readInput);
  
    const submitBtn = createElement(
      'button',
      ['submitBtn'],
      { type: 'submit', name: 'submit' }
    )
    submitBtn.textContent = 'Submit';
    form.appendChild(submitBtn);
  }

  return {
    createForm, 
    get formElem() { return form },
    set formElem(elem) {form = elem}
  }
})()

export default Form;