const INCOMPLETED_BOOKSHELFLIST = 'incompletedBookshelfList';
const COMPLETED_BOOK_SHELFLIST = 'completedBookshelfList';
const BOOK_ITEMID = 'itemId';

function addBook() {
    const incompletedBookshelfList = document.getElementById(INCOMPLETED_BOOKSHELFLIST);
    const completedBookshelfList = document.getElementById(COMPLETED_BOOK_SHELFLIST);

    const inputBookTitle = document.getElementById('inputBookTitle').value;
    const inputBookAuthor = document.getElementById('inputBookAuthor').value;
    const inputBookYear = document.getElementById('inputBookYear').value;
    const inputIsCompleted = document.getElementById('inputIsCompleted').checked;

    const book = makeBook(inputBookTitle, inputBookAuthor, inputBookYear, inputIsCompleted);
    const bookObject = composebookObject(inputBookTitle, inputBookAuthor, inputBookYear, inputIsCompleted);

    book [BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    if (inputIsCompleted == false) {
        incompletedBookshelfList.append(book);
    } else {
        completedBookshelfList.append(book);
    }

    updateDataToStorage();
}

function makeBook(inputBookTitle, inputBookAuthor, inputBookYear, inputIsCompleted) {
    const bookTitle = document.createElement('h3');
    bookTitle.innerText = inputBookTitle;
    bookTitle.classList.add('move');

    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = inputBookAuthor;

    const bookYear = document.createElement('p');
    bookYear.innerText = inputBookYear;
    bookYear.classList.add('year');

    const bookIsCompleted = createCompletedButton();

    const bookRemove = createRemoveButton();
    bookRemove.innerText = 'Hapus';
    
    const bookAction = document.createElement('div');
    bookAction.classList.add('action');
    if (inputIsCompleted == true) {
        bookIsCompleted.innerText = 'Belum selesai dibaca';
    } else {
        bookIsCompleted.innerText = 'Sudah selesai dibaca';
    }

    bookAction.append(bookIsCompleted, bookRemove);
    const bookItem = document.createElement('article');
    bookItem.classList.add('book-item');
    bookItem.append(bookTitle, bookAuthor, bookYear, bookAction);

    return bookItem;
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement('button');
    button.classList.add(buttonTypeClass);
    button.addEventListener('click', function(event){
        eventListener(event);
    });
    return button;
}

function createCompletedButton() {
    return createButton('green', function(event) {
        const parent = event.target.parentElement;
        addBookToCompleted(parent.parentElement);
    });
}

function removeBook(bookELement) {
    const bookPosition = findbookIndex(bookELement[BOOK_ITEMID]);
    if (window.confirm('Apakah anda yakin ingin menghapus buku ini dari rak?')){
        books.splice(bookPosition, 1);
        bookELement.remove();
    }
    updateDataToStorage();
}

function createRemoveButton() {
    return createButton('red', function(event) {
        const parent = event.target.parentElement;
        removeBook(parent.parentElement);
    });
}

function addBookToCompleted(bookELement) {
    const bookTitled = bookELement.querySelector('.book-item h3').innerText;
    const bookAuthored = bookELement.querySelector('.book-item p').innerText;
    const bookYeared = bookELement.querySelector('.year').innerText;
    const bookIsCompleted = bookELement.querySelector('.green').innerText;
    

    if (bookIsCompleted == 'Sudah selesai dibaca') {
        const newBook = makeBook(bookTitled, bookAuthored, bookYeared, true)

        const book = findbook(bookELement[BOOK_ITEMID]);
        book.IsCompleted = true;
        newBook[BOOK_ITEMID] = book.id;

        const completedBookshelfList = document.getElementById(COMPLETED_BOOK_SHELFLIST);
        completedBookshelfList.append(newBook);
    } else {
        const newBook = makeBook(bookTitled, bookAuthored, bookYeared, false)

        const book = findbook(bookELement[BOOK_ITEMID]);
        book.IsCompleted = false;
        newBook[BOOK_ITEMID] = book.id;

        const incompletedBookshelfList = document.getElementById(INCOMPLETED_BOOKSHELFLIST);
        incompletedBookshelfList.append(newBook);
    }
    bookELement.remove();

    updateDataToStorage();
}

function refreshDataFrombooks() {
    const listUncompleted = document.getElementById(INCOMPLETED_BOOKSHELFLIST);
    const listCompleted = document.getElementById(COMPLETED_BOOK_SHELFLIST);

    for (book of books){
        const newbook = makeBook(book.title, book.author, book.year, book.IsCompleted);
        newbook[BOOK_ITEMID] = book.id;

        if (book.IsCompleted == false){
            listUncompleted.append(newbook);
        } else {
            listCompleted.append(newbook);
        }
    }
}

function searchBook() {
    const inputSearch = document.getElementById('searchBookTitle').value;
    const moveBook = document.querySelectorAll('.move');

    for (move of moveBook) {
        if (inputSearch !== move.innerText) {
            console.log(move.innerText);
            move.parentElement.remove();
        }
    }
}