const title = document.getElementById("title");
const author = document.getElementById("author");
const isbn = document.getElementById("isbn");
const searchInput = document.getElementById("searchInput");
const bookForm = document.getElementById("bookForm");
const searchForm = document.getElementById("searchForm");
const addButton = document.getElementById("add");
const dltButton = document.getElementById("delete");
const bookList = document.getElementById("tbody");
const bookArray = [];

bookForm.addEventListener("submit", function(event){
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
} )

searchForm.addEventListener("submit", function (e, searchInput) {
  let ui = new UI();
  ui.searchBook();
  e.preventDefault();
});

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
  const ui = new UI();
  var bookRow = document.createElement("tr");
  const dltButton = document.createElement("button");
  const editButton = document.createElement("button");
  dltButton.textContent = "x";
  editButton.textContent = "Edit";

  bookRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    `;

  bookRow.appendChild(dltButton);
  bookRow.appendChild(editButton);
  bookList.appendChild(bookRow);

  dltButton.onclick = function (event) {
    bookList.deleteRow(event);
    ui.deleteBook(book);
  };

  editButton.onclick = function () {
    console.log("edit clicked");
    const editDiv = document.createElement("div");
    const newTitle = document.createElement("input");
    const newAuthor = document.createElement("input");
    const newISBN = document.createElement("input");
    const updateButton = document.createElement("button");
    newTitle.placeholder = "Update book title";
    newAuthor.placeholder = "Update author name";
    newISBN.placeholder = "Update ISBN";
    updateButton.textContent = "Update";
    editDiv.appendChild(newTitle);
    editDiv.appendChild(newAuthor);
    editDiv.appendChild(newISBN);
    editDiv.appendChild(updateButton);
    bookRow.appendChild(editDiv);

    updateButton.onclick = function () {
      editDiv.remove();
      var title = newTitle.value;
      var author = newAuthor.value;
      var isbn = newISBN.value;
      var currentIndex = bookArray.indexOf(book);
      if (currentIndex > -1) {
        bookArray[currentIndex].title = title;
        bookArray[currentIndex].author = author;
        bookArray[currentIndex].isbn = isbn;
      }
      bookRow.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      `;
      bookRow.appendChild(dltButton);
      bookRow.appendChild(editButton);
      bookList.appendChild(bookRow);
      localStorage.setItem("books", JSON.stringify(bookArray));
    };
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

UI.prototype.searchBook = function () {
  var ui = new UI();
  bookList.innerHTML = "";
  var searchText = searchInput.value;
  bookArray.forEach((element) => {
    var title = element.title;
    if (title.includes(searchText)) {
      ui.displayBook(element);
    }
  });
};

