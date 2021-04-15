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
  let bookObj = { title: book.title, author: book.author, isbn: book.isbn };
  bookArray.push(bookObj);
  localStorage.setItem("books", JSON.stringify(bookArray));
};

UI.prototype.displayBook = function (book) {
  var bookRow = document.createElement("tr");
  bookRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    `;
  const dltButton = document.createElement("button");
  const editButton = document.createElement("button");
  dltButton.textContent = "x";
  editButton.textContent = "Edit";
  bookRow.appendChild(dltButton);
  bookRow.appendChild(editButton);
  bookList.appendChild(bookRow);

  dltButton.onclick = function (event) {
    bookList.deleteRow(event);
    const ui = new UI();
    ui.deleteBook(book);
  };

  editButton.onclick = function(){
      console.log("edit clicked");
    const editForm = document.createElement("form");
    const newTitle = document.createElement("input");
    // const newAuthor = document.createElement("input");
    // const newISBN = document.createElement("input");
    // const updateButton = document.createElement("button");
    const p = document.createElement("p");
    // updateButton.textContent = "Update";
    editForm.appendChild(p);
    editForm.appendChild(newTitle);
    // editForm.appendChild(p);
    // editForm.appendChild(newAuthor);
    // editForm.appendChild(p);
    // editForm.appendChild(newISBN);
    // editForm.appendChild(p);
    // editForm.appendChild(updateButton);
    bookRow.appendChild(editForm);
  }
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


