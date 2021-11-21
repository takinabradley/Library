class Book { //Object Constructor

  constructor(title, author, pages, read) {
    this.title = title; 
	  this.author = author;
	  this.pages = pages;
	  this.read = read;
  }

  createCard(index) {
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
}


MyLibrary = {
  library: [],

  addToLibrary: function() {
    Form.createForm();
  
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
      DOM.displayBooks();
      Form.removeForm();
    })
  },
  /*
  add: function (title, author, pages, read) {
    this.library.push(new Book(title, author, pages, read));
    this.saveToLocalStorage();
  }
  */

  saveToLocalStorage: function () {
    localStorage.setItem('myLibrary', JSON.stringify(this.library));
    if (this.library.length === 0) localStorage.clear();
  },
  
  getFromLocalStorage: function() {
    const jsonArray = JSON.parse(localStorage.myLibrary);
    this.library = jsonArray.map(jsonBook => new Book(jsonBook.title, 
                                                      jsonBook.author, 
                                                      jsonBook.pages, 
                                                      jsonBook.read));
  },

  init: function() {
    if (localStorage.length > 0) {
      this.getFromLocalStorage();
    } else {
      const bookExample = new Book('Title', 'Author', 120, 'false');
      this.library.push(bookExample);
    }//do MyLibrary.add to make this more clear
    
    DOM.displayBooks();
    Form.allowBookAdding();
  }
};




Form = {
  form: document.querySelector('form'),

  createForm: function() {

    const titleInput = document.createElement('input');
    titleInput.classList.add('titleInput');
    titleInput.setAttribute('placeholder', 'Title');
    this.form.appendChild(titleInput);
  
    const authorInput = document.createElement('input');
    authorInput.classList.add('authorInput');
    authorInput.setAttribute('placeholder', 'author');
    this.form.appendChild(authorInput);
  
    const pagesInput = document.createElement('input');
    pagesInput.classList.add('pagesInput');
    pagesInput.setAttribute('placeholder', 'pages');
    this.form.appendChild(pagesInput);
  
    const readInput = document.createElement('input');
    readInput.classList.add('readInput');
    readInput.setAttribute('placeholder', 'Read? True/False');
    this.form.appendChild(readInput);
  
    const submitBtn = document.createElement('button');
    submitBtn.classList.add("submitBtn");
    submitBtn.setAttribute('type', 'button');
    submitBtn.textContent = 'Submit';
    this.form.appendChild(submitBtn);
  },

  removeForm: function() {
    this.form.innerHTML = '';
  },

  allowBookAdding: function() {
    //enables 'Add Book' button
  
    const addButton = document.querySelector('.addBook');
    
    addButton.addEventListener('click', e => {
      if (!addButton.classList.contains('active')) return;
      addButton.classList.toggle('active');
      if (document.querySelector('.library').childElementCount === 15) return;
      MyLibrary.addToLibrary();
      DOM.displayBooks();
    });
  },
}




DOM = {
  clearBooks: function() {
    document.querySelector('.library').innerHTML = '';
  },
  
  displayBooks: function() {
    this.clearBooks();
    MyLibrary.library.forEach( (Book, index) => Book.createCard(index));
    this.bookButtonInput();
  },
  //F
  bookButtonInput: function() { //make this a Book method called in the forEach loop in above function?
    const readButtons = document.querySelectorAll('.readButton');
    const bookIndex = function (e) {
      return e.target.parentElement.getAttribute('data-key')
    };
  
    readButtons.forEach( button => button.addEventListener('click', (e) => {
      button.classList.toggle('read');
  
      if (MyLibrary.library[bookIndex(e)].read === 'true') {
        MyLibrary.library[bookIndex(e)].read = 'false';
        MyLibrary.saveToLocalStorage(this.library);
      } else {
        MyLibrary.library[bookIndex(e)].read = 'true';
        MyLibrary.saveToLocalStorage(this.library);
      }
    })); //toggles button class and toggle actual value of 'read' on book item
    
    const deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach( button => button.addEventListener('click', (e) => {
      MyLibrary.library.splice(bookIndex(e), 1);
      MyLibrary.saveToLocalStorage(this.library);
      this.displayBooks(this.library);
    }));
  }
}

MyLibrary.init();