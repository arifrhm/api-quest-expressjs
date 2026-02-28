class MemoryStore {
  constructor() {
    this.books = [];
    this.counter = 1;
  }

  addBook(book) {
    const newBook = {
      id: this.counter++,
      title: book.title,
      author: book.author,
      year: book.year
    };
    this.books.push(newBook);
    return newBook;
  }

  getAllBooks() {
    return this.books;
  }

  getBookById(id) {
    return this.books.find(book => book.id === parseInt(id));
  }

  updateBook(id, data) {
    const index = this.books.findIndex(book => book.id === parseInt(id));
    if (index === -1) return null;

    this.books[index] = {
      ...this.books[index],
      title: data.title ?? this.books[index].title,
      author: data.author ?? this.books[index].author
    };
    return this.books[index];
  }

  deleteBook(id) {
    const index = this.books.findIndex(book => book.id === parseInt(id));
    if (index === -1) return false;

    this.books.splice(index, 1);
    return true;
  }

  findBooksByAuthor(author) {
    return this.books.filter(book =>
      book.author.toLowerCase() === author.toLowerCase()
    );
  }

  paginateBooks(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    return {
      data: this.books.slice(offset, offset + limit),
      page,
      limit,
      total: this.books.length
    };
  }
}

export default new MemoryStore();
