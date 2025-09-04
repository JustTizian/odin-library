function $(query){
    return document.querySelector(query)
}

const bookContainer = $(".book-container");
const newBookForm = $(".new-book-form");

let myLibrary = []

function Book(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
    this.id = crypto.randomUUID();
}

Book.prototype.changeReadStatus = function(){
    this.read = !this.read
    displayBooks();
}

function addBookToLibrary(title, author, pages){
    myLibrary.push(new Book(title, author, pages));
    displayBooks();
}

addBookToLibrary("The Hobbit", "J. R. R. Tolkien", 265);
addBookToLibrary("Harry Potter", "J. K. Rowling", 322);
addBookToLibrary("Der Sandmann", "E. T. A. Hoffmann", 150);
addBookToLibrary("Faust I", "Johann Wolgang von Goethe", 475);
addBookToLibrary("Faust I", "Johann Wolgang von Goethe", 475);


console.table(myLibrary)

function displayBooks(){
    bookContainer.innerHTML = ""
    myLibrary.forEach(book => {
        const bookCardDiv = document.createElement("div");
        bookCardDiv.classList.add("book-card");
        //bookCardDiv.setAttribute("data-id", book.id);
        
        const titleDisplay = document.createElement('h2');
        const authorDisplay = document.createElement('h3');
        const pagesDisplay = document.createElement('h4');
        const readDisplay = document.createElement('h4');

        
        titleDisplay.textContent = book.title;
        authorDisplay.textContent = book.author;
        pagesDisplay.textContent = `${book.pages} pages`;
        readDisplay.textContent = book.read;

        const deleteButton = document.createElement("button");
        deleteButton.addEventListener("click", () => {
            deleteBook(book.id);
        })
        deleteButton.textContent = "Delete"

        const toggleButton = document.createElement("button");
        toggleButton.addEventListener("click", () => {
            book.changeReadStatus()
        })
        toggleButton.textContent = "Toggle"
        
        bookCardDiv.append(titleDisplay, authorDisplay, pagesDisplay, readDisplay, deleteButton, toggleButton)
        bookContainer.appendChild(bookCardDiv);
    })
}

function deleteBook(id){
    myLibrary = myLibrary.filter(book => book.id != id);
    displayBooks();
}

displayBooks();

newBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = event.currentTarget.elements;
    const title = data["title"].value;
    const author = data["author"].value;
    const pages = data["pages"].value;
    addBookToLibrary(title, author, pages)
})