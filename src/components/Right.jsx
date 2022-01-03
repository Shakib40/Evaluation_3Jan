// + add the useEffect import
import { useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState(null);

  // + adding the use
  useEffect(() => {
    getData();

    // we will use async/await to fetch this data
    async function getData() {
      const response = await fetch("http://localhost:3001/foods");
      const data = await response.json();

      // store the data into our books variable
      setBooks(data) ;
    }
  }, []); // <- you may need to put the setBooks function in this array

  return (
    <div>render the data here</div>
  )
}