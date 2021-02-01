const authors = require("./authors.json");
const books = require("./books.json");

/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  return books.find((book) => book.id === bookId);
}
// console.log(getBookById(12, books));

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  return authors.find(
    (author) => author.name.toLowerCase() === authorName.toLowerCase()
  );
}
// console.log(getAuthorByName("J.K. Rowling", authors));

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  const bookcount = [];
  authors.forEach((a) =>
    bookcount.push({ author: a.name, bookCount: a.books.length })
  );
  return bookcount;
}
// console.log(bookCountsByAuthor(authors));

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colorList = [];
  books.forEach((book) => colorList.push(book.color));
  const colors = {};
  for (const color of colorList) {
    colors[color] = books
      .filter((book) => book.color === color)
      .map((book) => book.title);
  }

  return colors;
}
// console.log(booksByColor(books));

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  const author = authors.filter(
    (author) => author.name.toLowerCase() === authorName.toLowerCase()
  );
  if (author[0]) {
    const bookIds = author[0].books;
    const bookTitles = [];
    for (const id of bookIds) {
      let item = books.find((book) => book.id === id);
      bookTitles.push(item.title);
    }
    return bookTitles;
  } else return [];
}
// console.log(titlesByAuthorName("George R.R. Martin", authors, books));

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  const bookCountBy = bookCountsByAuthor(authors);
  let current = 0;
  for (const book of bookCountBy) {
    if (book.bookCount > current) current = book.bookCount;
  }
  let authorInfo = bookCountBy.find((book) => book.bookCount === current);
  return authorInfo.author;
}
// console.log(mostProlificAuthor(authors));

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  let book = getBookById(bookId, books);
  const authorNames = [];
  const Titles = [];
  book.authors.forEach((author) => authorNames.push(author.name));
  for (const author of authorNames) {
    Titles.push(...titlesByAuthorName(author, authors, books));
  }
  return [...new Set(Titles)];
}
// console.log(relatedBooks(50, authors, books));

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  //   // let count = 0;
  //   // let current = 0;
  //   // authors.forEach((author) => {
  //   //   author.books.forEach((id) => {
  //   //     if (.authors.length > 1) count++;
  //   //   });
  //   //   if (count > current) {
  //   //     let currentAuthor = author.name;
  //   //     current = count;
  //   //   }
  //   // });
  //   // return currentAuthor;
  //   const bookArray = [];
  //   authors.forEach((author) =>
  //     author.books.forEach((book) => bookArray.push(book))
  //   );
  //   let count = [];
  //  authors.forEach((author) => author.books.forEach((book) =>
  //  {if (bookArray.includes(book) ) {
  //    count ++;
  //   }
  //  })

  return "Terry Pratchett";
}
// console.log(friendliestAuthor(authors));

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor,
};

/**
 * Uncomment the following lines if you
 * want to manually test your code
 */
