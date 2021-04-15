const title = document.getElementById("title");
const author = document.getElementById("author");
const isbn = document.getElementById("isbn");
const addButton = document.getElementById("add");
const bookList = document.getElementById("tbody");
const bookArray = [];

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
  let bookObj = {title: book.title, author:book.author, isbn: book.isbn};
  bookArray.push(bookObj);
  localStorage.setItem("books", JSON.stringify(bookArray));
};

UI.prototype.displayBook = function(book){
    var bookRow = document.createElement("tr");
    bookRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    `;
    bookList.appendChild(bookRow);
}

UI.prototype.clearField = function(){
    title.value = "";
    author.value = "";
    isbn.value = "";
}

addButton.onclick = function(event){
    if(title.value === "" || author.value === "" || isbn.value === ""){
        alert("Fields cannot be empty");
    }else{
        const book = new Book(title.value, author.value, isbn.value);
        const ui = new UI();
        ui.addBook(book);
        ui.clearField();
        ui.displayBook(book);
    }
    event.preventDefault();
}
