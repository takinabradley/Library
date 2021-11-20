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




myLibrary = {
  library: [],
}
  

myLibrary.prototype = {
  createForm: function() {
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
  },
  
  removeForm: function() {
    document.querySelector('form').innerHTML = '';
  },

  addToLibrary: function() {
    this.createForm();
  
    const submitBtn = document.querySelector('.submitBtn');
    const addBtn = document.querySelector('.addBook');
  
    submitBtn.addEventListener('click', (e) => {
      //console.log(document.querySelector('form').elements);
      const title = document.querySelector('.titleInput').value;
      const author = document.querySelector('.authorInput').value;
      const pages = document.querySelector('.pagesInput').value;
      const read = document.querySelector('.readInput').value.toLowerCase();
      this.library.push(new Book(title, author, pages, read));
      addBtn.classList.toggle('active');
      this.saveToLocalStorage();
      this.displayBooks();
      this.removeForm();
    })
  },

  saveToLocalStorage: function () {
    localStorage.setItem('myLibrary', JSON.stringify(this.library));
    if (this.library.length === 0) localStorage.clear();
  },

  getFromLocalStorage: function() {
    const jsonArray = JSON.parse(localStorage.myLibrary);
    return jsonArray.map(jsonBook => new Book(jsonBook.title, jsonBook.author, 
                                              jsonBook.pages, jsonBook.read));
  },

  clearBooks: function() {
    document.querySelector('.library').innerHTML = '';
  },
  
  displayBooks: function() {
    this.clearBooks();
    this.library.forEach( (Book, index) => Book.createCard(index));
    this.bookButtonInput();
  },

  allowBookAdding: function() {
    //enables 'Add Book' button
  
    const addButton = document.querySelector('.addBook');
    
    addButton.addEventListener('click', e => {
      if (!addButton.classList.contains('active')) return;
      addButton.classList.toggle('active');
      if (document.querySelector('.library').childElementCount === 15) return;
      this.addToLibrary();
      this.displayBooks();
    });
  },
  
  
  bookButtonInput: function() {
    const readButtons = document.querySelectorAll('.readButton');
    const bookIndex = function (e) {
      return e.target.parentElement.getAttribute('data-key')
    };
  
    readButtons.forEach( button => button.addEventListener('click', (e) => {
      button.classList.toggle('read');
  
      if (this.library[bookIndex(e)].read === 'true') {
        this.library[bookIndex(e)].read = 'false';
        this.saveToLocalStorage(this.library);
      } else {
        this.library[bookIndex(e)].read = 'true';
        this.saveToLocalStorage(this.library);
      }
    })); //toggles button class and toggle actual value of 'read' on book item
    
    const deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach( button => button.addEventListener('click', (e) => {
      this.library.splice(bookIndex(e), 1);
      this.saveToLocalStorage(this.library);
      this.displayBooks(this.library);
    }));
  },

  init: function () {
  
    if (localStorage.length > 0) {
      this.library = this.getFromLocalStorage();
    } else {
      this.library = [];
      const bookExample = new Book('Title', 'Author', 120, 'false');
      this.library.push(bookExample);
    }
    
    this.displayBooks(this.library);
    this.allowBookAdding(this.library);
  }
}

myLibrary = Object.create(myLibrary.prototype)

myLibrary.init();