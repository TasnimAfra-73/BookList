const title = document.getElementById("title");
const author = document.getElementById("author");
const isbn = document.getElementById("isbn");
const addButton = document.getElementById("add");
const dltButton = document.getElementById("delete");
const bookList = document.getElementById("tbody");
const bookArray = [];

document.addEventListener("DOMContentLoaded", function () {
  let ui = new UI();
  let storageData = JSON.parse(localStorage.getItem("books"));
  if (storageData) {
    storageData.forEach((element) => {
      bookArray.push(element);
      ui.displayBook(element);
    });
  }
});

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {}

UI.prototype.addBook = function (book) {
  console.log(book.title);
  console.log(book.author);
  console.log(book.isbn);
  let bookObj = { title: book.title, author: book.author, isbn: book.isbn };
  bookArray.push(bookObj);
  localStorage.setItem("books", JSON.stringify(bookArray));
  console.log(bookArray);
};

UI.prototype.displayBook = function (book) {
    // console.log(book);
  var bookRow = document.createElement("tr");
  bookRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    `;
  const dltButton = document.createElement("button");
  dltButton.textContent = "x";
  bookRow.appendChild(dltButton);
  bookList.appendChild(bookRow);


  dltButton.onclick = function (event) {
    bookList.deleteRow(event);
    const ui = new UI();
    ui.deleteBook(book);
  };
};

UI.prototype.clearField = function () {
  title.value = "";
  author.value = "";
  isbn.value = "";
};

UI.prototype.deleteBook = function (book) {
  var currentIndex = bookArray.indexOf(book);
  if (currentIndex > -1) {
    bookArray.splice(currentIndex, 1);
  }
  localStorage.setItem("books", JSON.stringify(bookArray));
};

UI.prototype.getBook = function () {
  let storageData = JSON.parse(localStorage.getItem("books"));
  if (storageData) {
    storageData.forEach((element) => {
      bookArray.push(element);
    });
  }
};

addButton.onclick = function (event) {
  if (title.value === "" || author.value === "" || isbn.value === "") {
    alert("Fields cannot be empty");
  } else {
    const book = new Book(title.value, author.value, isbn.value);
    const ui = new UI();
    ui.addBook(book);
    ui.clearField();
    ui.displayBook(book);
  }
  event.preventDefault();
};


