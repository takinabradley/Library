function Book(title, author, pages, read) { //Object Constructor
	this.title = title; 
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.createCard = function (index) {
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
  book.appendChild(bookButtons);
  
  const readButton = document.createElement('button');
  readButton.classList.add('readButton');
  if (this.read === 'true') readButton.classList.add('read');
  readButton.textContent= "Read";
  bookButtons.appendChild(readButton);
  
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('deleteButton');
  deleteButton.setAttribute('data-key', index); //tells delete button index in array
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
    const title = document.querySelector('.titleInput').value;
    const author = document.querySelector('.authorInput').value;
    const pages = document.querySelector('.pagesInput').value;
    const read = document.querySelector('.readInput').value;
    myLibrary.push(new Book(title, author, pages, read));
    addBtn.classList.toggle('active');
    displayBooks(myLibrary);
    removeForm();
  })
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
  readButtons.forEach( button => button.addEventListener('click', (e) => { //create a function for this.
    button.classList.toggle('read');
  }));
  
  const deleteButtons = document.querySelectorAll('.deleteButton');
  deleteButtons.forEach( button => button.addEventListener('click', (e) => {
    const bookIndex = e.target.getAttribute('data-key');
    myLibrary.splice(bookIndex, 1);
    displayBooks(myLibrary);
  }));
}

function init () {
  let myLibrary = [];
  const Eragon = new Book('Eragon', 'Chris Paolini', 754, 'true');
  myLibrary.push(Eragon);

  displayBooks(myLibrary);
  allowBookAdding(myLibrary);
}

init(); 