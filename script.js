function $(query) {
    return document.querySelector(query)
}

const bookContainer = $(".book-container");
const newBookForm = $(".new-book-form");
const openNewBookModalButton = $("#openNewBookModalButton")

const newBookFormDialog = $(".newBookFormDialog")
openNewBookModalButton.addEventListener("click", () => {
    newBookFormDialog.showModal()
})

const cancelButton = $("#cancel")
cancelButton.addEventListener("click", (e) => {
    newBookFormDialog.close()
})

const myLibrary = []

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.changeReadStatus = function () {
    this.read = !this.read
    displayBooks();
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
    displayBooks();
}

function displayBooks() {
    bookContainer.replaceChildren();
    myLibrary.forEach(book => {
        const bookCardDiv = document.createElement("div");
        bookCardDiv.classList.add("book-card");
        bookCardDiv.setAttribute("data-id", book.id);

        const titleDisplay = document.createElement('h2');
        const authorDisplay = document.createElement('h3');
        const pagesDisplay = document.createElement('h4');
        const readDisplay = document.createElement('h4');

        titleDisplay.textContent = book.title;
        authorDisplay.textContent = book.author;
        pagesDisplay.textContent = `${book.pages} pages`;
        readDisplay.textContent = book.read;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";

        const toggleButton = document.createElement("button");
        toggleButton.classList.add("toggle-btn");
        toggleButton.textContent = "Toggle";

        bookCardDiv.append(titleDisplay, authorDisplay, pagesDisplay, readDisplay, deleteButton, toggleButton)
        bookContainer.appendChild(bookCardDiv);
    })
}

function deleteBook(id) {
    const index = myLibrary.findIndex(book => book.id === id)
    myLibrary.splice(index, 1)
    displayBooks();
}

function handleReadStatusToggle(id) {
    const book = myLibrary.find(book => book.id === id)
    console.log(book)
    if (book) {
        book.changeReadStatus();
        displayBooks();
    }
}

bookContainer.addEventListener("click", (event) => {
    const bookCard = event.target.closest(".book-card");

    if (!bookCard) return;

    const id = bookCard.dataset.id;

    if (event.target.matches(".delete-btn")) deleteBook(id)
    if (event.target.matches(".toggle-btn")) handleReadStatusToggle(id)

})

displayBooks();

newBookForm.addEventListener("submit", (event) => {
    const data = event.currentTarget.elements;
    const title = data["title"].value;
    const author = data["author"].value;
    const pages = data["pages"].value;
    const read = data["read"].checked;
    addBookToLibrary(title, author, pages, read)
})

function addTestBooks() {
    addBookToLibrary("The Hobbit", "J. R. R. Tolkien", 265, false);
    addBookToLibrary("Harry Potter", "J. K. Rowling", 322, false);
    addBookToLibrary("Der Sandmann", "E. T. A. Hoffmann", 150, false);
    addBookToLibrary("Faust I", "Johann Wolgang von Goethe", 475, false);
    addBookToLibrary("Faust II", "Johann Wolgang von Goethe", 200, false);
}

//IIFE
(function main(){
    addTestBooks();
    displayBooks();
})()
