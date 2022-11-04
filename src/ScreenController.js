import './styles.css'
import Library from './Library'
import Form from './Form'
import BookDisplay from './BookDisplay'

//ScreenController.js
const ScreenController = (function (library, form, display) {  
  function init(formElem, displayElem) {
    //set the container 'form' and 'display' should render into
    form.formElem = formElem
    display.displayElem = displayElem
    
    //load anything that may be in localStorage
    library.getFromLocalStorage()
    //create our form
    form.createForm(document.querySelector('form'))
    //render our books
    display.render(library.books)

    //set event listeners to interact with 'library'
    form.formElem.addEventListener('submit', addBook)
    display.displayElem.addEventListener('click', editbook)
  }

  function editbook(e) {
    if (e.target.className === 'deleteButton') {
      //delete a book and rerender book array
      const index = e.target.parentElement.getAttribute('data-key')
      library.remove(index)
      display.render(library.books)
    }

    if (e.target.className.includes('readButton')) {
      //change a books read status and rerender book array
      const index = e.target.parentElement.getAttribute('data-key')
      library.books[index].toggleRead()
      library._saveToLocalStorage() //temporary solution to save read status
      display.render(library.books)
    }
  } 

  function addBook(e) {
    e.preventDefault() //keep page from reloading
    const formElems = e.target.elements
    console.log(formElems)
    library.add(
      formElems['title'].value,
      formElems['author'].value,
      formElems['pages'].value,
      formElems['read'].checked
    )

    display.render(library.books)
  }

  return {init}
})(Library, Form, BookDisplay)

export default ScreenController