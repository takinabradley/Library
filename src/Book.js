export default function Book(title, author, pages, read) {
  return Object.freeze({
    title,
    author,
    pages,
    get read() { return read },
    toggleRead: function() { return read = !read }
  })
}

