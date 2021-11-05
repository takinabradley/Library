function Book(title, author, pages, read) { //Object Constructor
	this.title = title; 
	this.author = author;
	this.pages = pages;
	this.read = read;
}


function addToLibrary (myLibrary) {
  //should bring up a proper form.
  let title = prompt("Add a book!\nWrite the title.");
  let author = prompt("Add a book!\n Write the author.");
  let pages = prompt("Add a book!\n How many pages?");
  let read = prompt("Add a book!\n Have you read it? ('true/false')");
  myLibrary.push(new Book(title, author, pages, read));
  
  console.log(myLibrary);
}


function clearBooks () {
  document.querySelector('.library').innerHTML = '';
}


function displayBooks (myLibrary) {
  clearBooks();
  for (i = 0; i < myLibrary.length; i++) {
    const library = document.querySelector('.library');
    
    book = document.createElement('article');
    book.classList.add('book');
    library.appendChild(book);
    
    
    bookInfo = document.createElement('div');
    bookInfo.classList.add('bookInfo');
    book.appendChild(bookInfo);
    
    bookTitle = document.createElement('h2');
    bookTitle.classList.add('bookTitle');
    bookTitle.textContent = myLibrary[i].title;
    bookInfo.appendChild(bookTitle);
    
    bookAuthor = document.createElement('span');
    bookAuthor.classList.add('bookAuthor');
    bookAuthor.textContent = myLibrary[i].author;
    bookInfo.appendChild(bookAuthor);
    
    bookPages = document.createElement('span');
    bookPages.classList.add('bookPages');
    bookPages.textContent = `${myLibrary[i].pages} pages`;
    bookInfo.appendChild(bookPages);
    
    
    bookButtons = document.createElement('div');
    bookButtons.classList.add('bookButtons');
    book.appendChild(bookButtons);
    
    readButton = document.createElement('button');
    readButton.classList.add('readButton');
    if (myLibrary[i].read === 'true') readButton.classList.add('read');
    readButton.textContent= "Read";
    bookButtons.appendChild(readButton);
    
    deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.setAttribute('data-key', i); //used to remove each book from library
    deleteButton.textContent = 'Delete';
    bookButtons.appendChild(deleteButton);
  }
  bookButtonInput(myLibrary);
}


function addBookInput (myLibrary) {
  //should bring up proper form

  addButton = document.querySelector('.addBook');
  
  addButton.addEventListener('click', e => {
    addToLibrary(myLibrary);
    displayBooks(myLibrary);
  });
}


function bookButtonInput (myLibrary) {
  readButtons = document.querySelectorAll('.readButton');
  readButtons.forEach( button => button.addEventListener('click', (e) => { //create a function for this.
    button.classList.toggle('read');
  }));
  
  deleteButtons = document.querySelectorAll('.deleteButton');
  deleteButtons.forEach( button => button.addEventListener('click', (e) => {
    dataKey = e.target.getAttribute('data-key');
    myLibrary.splice(dataKey, 1);
    displayBooks(myLibrary);
  }));
}

function init () {
  let myLibrary = [];
  let Eragon = new Book('Eragon', 'Chris Paolini', 754, 'true');
  myLibrary.push(Eragon);

  displayBooks(myLibrary);
  addBookInput(myLibrary);
}

init();


  