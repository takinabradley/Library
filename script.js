function Book (title, author, pages, read) {
  this.title = title; 
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.createCard = function(index) {
  const library = document.querySelector('.library');
  
  const book = document.createElement('article');
  book.classList.add('book');
  library.appendChild(book);
  
  
  const bookInfo = document.createElement('div');
  bookInfo.classList.add('bookInfo');
  book.appendChild(bookInfo);
  
  const bookTitle = document.createElement('h2');
  bookTitle.classList.add('bookTitle');
  bookTitle.textContent = this.title;
  bookInfo.appendChild(bookTitle);
  
  const bookAuthor = document.createElement('span');
  bookAuthor.classList.add('bookAuthor');
  bookAuthor.textContent = this.author;
  bookInfo.appendChild(bookAuthor);
  
  const bookPages = document.createElement('span');
  bookPages.classList.add('bookPages');
  bookPages.textContent = `${this.pages} pages`;
  bookInfo.appendChild(bookPages);
  
  
  const bookButtons = document.createElement('div');
  bookButtons.classList.add('bookButtons');
  bookButtons.setAttribute('data-key', index); //stores place of book in array
  book.appendChild(bookButtons);
  
  const readButton = document.createElement('button');
  readButton.classList.add('readButton');
  if (this.read === 'true') readButton.classList.add('read');
  readButton.textContent= "Read";
  bookButtons.appendChild(readButton);
  
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('deleteButton');
  deleteButton.textContent = 'Delete';
  bookButtons.appendChild(deleteButton);
}


function createForm() {
  const form = document.querySelector('form');

  const titleInput = document.createElement('input');
  titleInput.classList.add('titleInput');
  titleInput.setAttribute('placeholder', 'Title');
  form.appendChild(titleInput);

  const authorInput = document.createElement('input');
  authorInput.classList.add('authorInput');
  authorInput.setAttribute('placeholder', 'author');
  form.appendChild(authorInput);

  const pagesInput = document.createElement('input');
  pagesInput.classList.add('pagesInput');
  pagesInput.setAttribute('placeholder', 'pages');
  form.appendChild(pagesInput);

  const readInput = document.createElement('input');
  readInput.classList.add('readInput');
  readInput.setAttribute('placeholder', 'Read? True/False');
  form.appendChild(readInput);

  const submitBtn = document.createElement('button');
  submitBtn.classList.add("submitBtn");
  submitBtn.setAttribute('type', 'button');
  submitBtn.textContent = 'Submit';
  form.appendChild(submitBtn);
}

function removeForm() {
  document.querySelector('form').innerHTML = '';
}


function addToLibrary (myLibrary) {
  createForm();

  const submitBtn = document.querySelector('.submitBtn');
  const addBtn = document.querySelector('.addBook');

  submitBtn.addEventListener('click', (e) => {
    //console.log(document.querySelector('form').elements);
    const title = document.querySelector('.titleInput').value;
    const author = document.querySelector('.authorInput').value;
    const pages = document.querySelector('.pagesInput').value;
    const read = document.querySelector('.readInput').value.toLowerCase();
    myLibrary.push(new Book(title, author, pages, read));
    addBtn.classList.toggle('active');
    saveToLocalStorage(myLibrary);
    displayBooks(myLibrary);
    removeForm();
  })
}

function saveToLocalStorage (myLibrary) {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  if (myLibrary.length === 0) localStorage.clear();
}

function getFromLocalStorage () {
  const jsonArray = JSON.parse(localStorage.myLibrary);
  return jsonArray.map(jsonBook => new Book(jsonBook.title, jsonBook.author, 
                                            jsonBook.pages, jsonBook.read));
}


function clearBooks () {
  document.querySelector('.library').innerHTML = '';
}

function displayBooks (myLibrary) {
  clearBooks();
  myLibrary.forEach( (Book, index) => Book.createCard(index));
  bookButtonInput(myLibrary);
}


function allowBookAdding (myLibrary) {
  //enables 'Add Book' button

  const addButton = document.querySelector('.addBook');
  
  addButton.addEventListener('click', e => {
    if (!addButton.classList.contains('active')) return;
    addButton.classList.toggle('active');
    if (document.querySelector('.library').childElementCount === 15) return;
    addToLibrary(myLibrary);
    displayBooks(myLibrary);
  });
}


function bookButtonInput (myLibrary) {
  const readButtons = document.querySelectorAll('.readButton');
  const bookIndex = function (e) {
    return e.target.parentElement.getAttribute('data-key')
  };

  readButtons.forEach( button => button.addEventListener('click', (e) => {
    button.classList.toggle('read');

    if (myLibrary[bookIndex(e)].read === 'true') {
      myLibrary[bookIndex(e)].read = 'false';
      saveToLocalStorage(myLibrary);
    } else {
      myLibrary[bookIndex(e)].read = 'true';
      saveToLocalStorage(myLibrary);
    }
  })); //toggles button class and toggle actual value of 'read' on book item
  
  const deleteButtons = document.querySelectorAll('.deleteButton');
  deleteButtons.forEach( button => button.addEventListener('click', (e) => {
    myLibrary.splice(bookIndex(e), 1);
    saveToLocalStorage(myLibrary);
    displayBooks(myLibrary);
  }));
}


function init () {
  let myLibrary = [];

  if (localStorage.length > 0) {
    myLibrary = getFromLocalStorage();
  } else {
    myLibrary = [];
    const bookExample = new Book('Title', 'Author', 120, 'false');
    myLibrary.push(bookExample);
  }
  
  displayBooks(myLibrary);
  allowBookAdding(myLibrary);
}

init(); 