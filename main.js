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