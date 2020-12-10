import Axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../../Components/Product";
import { requests } from "../../utils/request";
import "./Home.css";

const Home = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const requestBooks = async () => {
      const request = await Axios.get(requests);
      setBooks(request.data.items);
    };
    requestBooks();
  }, []);
  console.log(books);
  return (
    <div className="home__product">
      {books.map((book) => (
        <Product
          title={book.volumeInfo.title}
          authors={
            book.volumeInfo.authors ? book.volumeInfo.authors : "DONT KNOW"
          }
          price={book.saleInfo.listPrice?.amount}
          image={book.volumeInfo.imageLinks.thumbnail}
        />
      ))}
    </div>
  );
};

export default Home;
