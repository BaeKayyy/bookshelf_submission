const STORAGE_KEY = "BOOKSHELF_DATA";

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


// load data saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function () {

  loadData();

  displayBooks();

  const bookForm = document.getElementById("bookForm");

  bookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    createNewBook();
  });

  const searchForm = document.getElementById("searchBook");

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBook();
  });

});


// membuat buku baru
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
    isComplete: isComplete
  };

  bookCollection.push(newBook);

  saveData();
  displayBooks();

  document.getElementById("bookForm").reset();
}


// menampilkan buku ke rak
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


    const toggleButton = document.createElement("button");
    toggleButton.setAttribute("data-testid","bookItemIsCompleteButton");

    if (book.isComplete) {
      toggleButton.innerText = "Belum selesai dibaca";
    } else {
      toggleButton.innerText = "Selesai dibaca";
    }

    toggleButton.addEventListener("click", function () {
      toggleBookStatus(book.id);
    });


    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Hapus Buku";
    deleteButton.setAttribute("data-testid","bookItemDeleteButton");

    deleteButton.addEventListener("click", function () {
      removeBook(book.id);
    });


    const editButton = document.createElement("button");
    editButton.innerText = "Edit Buku";
    editButton.setAttribute("data-testid","bookItemEditButton");

    editButton.addEventListener("click", function () {
      editBook(book.id);
    });


    buttonContainer.append(toggleButton, deleteButton, editButton);

    bookCard.append(title, author, year, buttonContainer);


    if (book.isComplete) {
      completeShelf.append(bookCard);
    } else {
      incompleteShelf.append(bookCard);
    }

  }

}


// ubah status selesai dibaca
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


// hapus buku
function removeBook(bookId) {

  const newBooks = [];

  for (const book of bookCollection) {

    if (book.id !== bookId) {
      newBooks.push(book);
    }

  }

  bookCollection = newBooks;

  saveData();
  displayBooks();
}


// edit buku
function editBook(bookId) {

  for (const book of bookCollection) {

    if (book.id === bookId) {

      const newTitle = prompt("Edit Judul", book.title);
      const newAuthor = prompt("Edit Penulis", book.author);
      const newYear = prompt("Edit Tahun", book.year);

      if (newTitle && newAuthor && newYear) {
        book.title = newTitle;
        book.author = newAuthor;
        book.year = parseInt(newYear);
      }

      break;
    }

  }

  saveData();
  displayBooks();
}


// mencari buku berdasarkan judul
function searchBook() {

  const keyword = document
    .getElementById("searchBookTitle")
    .value
    .toLowerCase();

  const result = [];

  for (const book of bookCollection) {

    if (book.title.toLowerCase().includes(keyword)) {
      result.push(book);
    }

  }

  displayBooks(result);
}