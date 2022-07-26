// Book class: Represents a Book
class Book
{
	constructor(title, author, isbn)
	{
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

// UI class: Handle UI Tasks
class UI
{
	static displayBooks()
	{
		
		
		const books = Store.getBooks();
		
		/*
		for(let i=0; i<books.length; i++)
		{
			alert("hi");
			UI.addBookToList(books[i]);
		}
		*/
		
		books.forEach((book) => UI.addBookToList(book))
	}
	
	static addBookToList(book)
	{
		const list = document.querySelector('#book-list');
		
		const row = document.createElement('tr');
		
		row.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
		`;
		
		list.appendChild(row);
	}
	
	static clearFields()
	{
		document.querySelector('#title').value = '';
		document.querySelector('#author').value = '';
		document.querySelector('#isbn').value = '';
	}
	
	
	static deleteBook(el)
	{
		if(el.classList.contains('delete'))
		{
			el.parentElement.parentElement.remove();
			
			Store.removeBook(el.parentElement.previousElementSibling.textContent);
			
			UI.showAlert('Book Removed', 'success');
		}
	}
	
	static showAlert(message, className)
	{
		const div = document.createElement('div');
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector('.container');
		const form = document.querySelector('#book-form');
		container.insertBefore(div, form);
		
		setTimeout(() => document.querySelector('.alert').remove(), 3000);
	}
	
}

// Store class: Handles Storage
class Store
{
	static getBooks()
	{
		let books;
		
		if(localStorage.getItem('books') === null)
		{
			books = [];
		}
		else
		{
			books = JSON.parse(localStorage.getItem('books'));
		}
		
		return books;
	}
	
	static addBook(book)
	{
		const books = Store.getBooks();
		books.push(book);
		localStorage.setItem('books', JSON.stringify(books));
	}
	
	static removeBook(isbn)
	{
		const books = Store.getBooks();
		
		for(let i=0; i<books.length; i++)
		{
			if(books[i].isbn === isbn)
			{
				books.splice(i, 1);
			}
		}
		
		localStorage.setItem('books', JSON.stringify(books));
	}
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', getFormValues);

function getFormValues(e)
{
	e.preventDefault();
	
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const isbn = document.querySelector('#isbn').value;
	
	if(title === '' || author === '' || isbn === '')
	{
		UI.showAlert('Please fill in all the fields', 'danger');
	}
	else
	{
		const book = new Book(title, author, isbn);
	
		UI.addBookToList(book);
		
		Store.addBook(book);
		
		UI.showAlert('Book Added', 'success');
		
		UI.clearFields();
	}
}

// Event: Remove a Book

document.querySelector('#book-list').addEventListener('click', (e) => UI.deleteBook(e.target) );


/*
document.querySelector('#book-list').addEventListener('click', callDelete);

function callDelete(e)
{
	UI.deleteBook(e.target);
}
*/
