export const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
export const baseURL = "https://www.googleapis.com/books/v1/volumes?";
export const requests = `${baseURL}q=holmes&maxResults=40&key=${API_KEY}`;
