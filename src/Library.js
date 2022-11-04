import Book from './Book'

const Library = (function () {
  const library = [];

  function add(title, author, pages, read) {
    const newBook = Book(title, author, pages, read)
    library.push(newBook)
    _saveToLocalStorage()
  }

  function getFromLocalStorage() {
    const jsonArray = JSON.parse(localStorage.getItem('myLibrary'))
    if (!jsonArray) return 
    
    library.push(...jsonArray.map(jsonBook =>
      Book(jsonBook.title, jsonBook.author, jsonBook.pages, jsonBook.read)
    ))
  }

  function _saveToLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(library))
  }

  function remove(index) {
    library.splice(index, 1)
    _saveToLocalStorage()
  }

  return Object.freeze({
    get books() {return [...library]},
    add, 
    remove,
    getFromLocalStorage,
    _saveToLocalStorage
  })
})()

export default Library