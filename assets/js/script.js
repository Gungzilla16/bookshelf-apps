document.addEventListener('DOMContentLoaded', function() {
    const submitBook = document.getElementById('formInputBook');
    
    submitBook.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });

    const searchBooks = document.getElementById('searchBook');

    searchBooks.addEventListener('submit', function(event) {
        event.preventDefault();
        searchBook();
    });

    if (isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener('ondatasaved', () => {
    console.log('Anda merubah data dan berhasil disimpan');
});
document.addEventListener('ondataloaded', () => {
    refreshDataFrombooks();
});

function changeText() {
    const checkbox = document.getElementById('inputIsCompleted');
    const textSubmit = document.getElementById('textSubmit');

    if (checkbox.checked == true) {
        textSubmit.innerText = 'Sudah selesai dibaca';
    } else {
        textSubmit.innerText = 'Belum selesai dibaca'
    }
};

