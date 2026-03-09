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