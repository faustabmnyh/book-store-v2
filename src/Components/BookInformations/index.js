import "./BookInformations.css"

const BookInformations = ({ product }) => {
  return (
    <div className="booInformations">
      <h2>Book Informations</h2>
      <div className="bookInformations__container">
        <div>
          Number of Pages : {product.volumeInfo.printedPageCount || "Unknown"}
        </div>
        <div>Publisher : {product.volumeInfo.publisher || "Unknown"}</div>
        <div>
          Published Date : {product.volumeInfo.publishedDate || "Unknown"}
        </div>
        <div>
          Language :
          {product.volumeInfo.language === "en" ? " English" : " Indonesia"}
        </div>
        <div>
          Author :
          {product.volumeInfo?.authors
            ? product.volumeInfo?.authors?.map((author) => (
                <div key={author}>
                  <a href="!#">- {author}</a>
                </div>
              ))
            : "Unknown"}
        </div>
      </div>
    </div>
  );
};

export default BookInformations;
