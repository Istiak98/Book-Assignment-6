document.getElementById("noResultFound").style.display = "none";
const searchBook = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  searchField.value = "";
  document.getElementById("noResultFound").style.display = "block";
  if (searchText === null) {
    document.getElementById("noResultFound").style.display = "block";
  } else {
    //Showing Books
    const url1 = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url1)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.docs));
    //Total Result
    const url2 = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url2)
      .then((res) => res.json())
      .then((data) => displayResult(data.numFound));
  }
};
document.getElementById("noResultFound").style.display = "none";
//Total Result
const displayResult = (noOfBook) => {
  const p = document.getElementById("noOfResult");
  p.textContent = "";
  const h2 = document.createElement("h2");
  h2.classList.add("col");
  h2.innerHTML = `<h2 class=" ">Total Books Found: ${noOfBook}</h2>
    `;
  p.appendChild(h2);
};

const displaySearchResult = (bookData) => {
  const searchResult = document.getElementById("search-result");

  searchResult.textContent = "";
  bookData.slice(0, 30).forEach((book) => {
    // console.log(index)
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="row row-cols-1 row-cols-md-2  justify-content-center">
        <div class="col">
        <div class="card">
        <img src="https://covers.openlibrary.org/b/id/${
          book.cover_i
        }-M.jpg" class="img-thumbnail rounded float-center" alt="...">
          <div class="card-body">
          <h4 class="card-title text-center">${book.title}</h4>
          <h6 class="card-title fs-5 font-monospace"><span class="Author">Author:</span>${
            book.author_name
          }</h6>
          <h6 class="card-title fs-5 font-monospace"><span class="Publisher">Publisher:</span>${book.publisher.slice(
            0,
            5
          )}</h6>
          <h6 class="card-title fs-5 font-monospace"><span class="FirstPublish">First Publish:</span>${
            book.first_publish_year
          }</h6>
          </div> 
        </div>
        `;
    searchResult.appendChild(div);
    document.getElementById("noResultFound").style.display = "none";
  });
};
