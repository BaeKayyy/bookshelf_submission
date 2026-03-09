// Do your work here...
const  STORAGE_KEY = "BOOKSHELF_DATA";

let bookCollection = [];

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookCollection));
}

function loadData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData !== null) {
    bookCollection = JSON.parse(savedData);
  }
}


// load data ketika halaman selesai dimuat 
dcoument.addEventListener("DOMContentLoaded", function () {
    const saveData = localStorage.getItem(STORAGE_KEY);
    
    if (saveData !== null) {
        bookCollection = JSON.parse(saveData);
    }

    displayBooks();

    const bookForm = document.getElementById("book-form");

    bookForm.addEventListener("submit", function (event) {
        event.preventDefault();
        createNewBook();
    })
})


// membuat fungsi untuk menambahkan buku baru ke dalam koleksi

function createNewBook() {
  const title = document.getElementById("bookFormTitle").value;
  const author = document.getElementById("bookFormAuthor").value;
  const year = parseInt(document.getElementById("bookFormYear").value);
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  const newBook = {
    id: Date.now(),
    title: title,
    author: author,
    year: year,
    isComplete: isComplete,
  };

  bookCollection.push(newBook);

  saveData();
  displayBooks();
}

// menampilkan buku ke rak buku
function displayBooks(filtered = null) {
  const incompleteShelf = document.getElementById("incompleteBookList");
  const completeShelf = document.getElementById("completeBookList");

  incompleteShelf.innerHTML = "";
  completeShelf.innerHTML = "";

  const booksToShow = filtered ? filtered : bookCollection;

  for (const book of booksToShow) {
    const bookCard = document.createElement("div");

    bookCard.setAttribute("data-bookid", book.id);
    bookCard.setAttribute("data-testid", "bookItem");

    const title = document.createElement("h3");
    title.innerText = book.title;
    title.setAttribute("data-testid", "bookItemTitle");

    const author = document.createElement("p");
    author.innerText = "Penulis: " + book.author;
    author.setAttribute("data-testid", "bookItemAuthor");

    const year = document.createElement("p");
    year.innerText = "Tahun: " + book.year;
    year.setAttribute("data-testid", "bookItemYear");

    const buttonContainer = document.createElement("div");

    bookCard.append(title, author, year, buttonContainer);

    if (book.isComplete) {
      completeShelf.append(bookCard);
    } else {
      incompleteShelf.append(bookCard);
    }
  }
}

// mengubah status selesai dibaca
function toggleBookStatus(bookId) {

  for (const book of bookCollection) {

    if (book.id === bookId) {
      book.isComplete = !book.isComplete;
      break;
    }

  }

  saveData();
  displayBooks();
}