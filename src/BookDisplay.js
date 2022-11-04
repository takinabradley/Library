import createElement from "./createElement";
const BookDisplay = (function () {
  let displayElem = null;

  function createCard(bookObj, index) {
    if(!displayElem) return
    const book = createElement('article', ['book'], {})
    
    const bookInfo = createElement('div', ['bookInfo'], {})
    book.appendChild(bookInfo);
    
    const bookTitle = createElement('h2', ['bookTitle'], {})
    bookTitle.textContent = bookObj.title;
    bookInfo.appendChild(bookTitle);
    
    const bookAuthor = createElement('span', ['bookAuthor'], {})
    bookAuthor.textContent = bookObj.author;
    bookInfo.appendChild(bookAuthor);
    
    const bookPages = createElement('span', ['bookPages'], {})
    bookPages.textContent = `${bookObj.pages} pages`;
    bookInfo.appendChild(bookPages);
    
    
    const bookButtons = createElement('div', ['bookButtons'], {'data-key': index})
    book.appendChild(bookButtons);
    
    const readButton = createElement('button', ['readButton'], {})
    if (bookObj.read === true) readButton.classList.add('read');
    readButton.textContent= "Read";
    bookButtons.appendChild(readButton);
    
    const deleteButton = createElement('button', ['deleteButton'], {})
    deleteButton.textContent = 'Delete';
    bookButtons.appendChild(deleteButton);

    return book
  } 
  
  function clear() {
    displayElem.innerHTML = ''
  }

  function render(books) {
    clear()
    displayElem.append(...books.map(createCard))
  }

  return {
    render, 
    get displayElem() { return displayElem },
    set displayElem(elem) {displayElem = elem}
  }
})()

export default BookDisplay