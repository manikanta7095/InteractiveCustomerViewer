import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import DataTable from './DataTable';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    const apiUrl = `http://localhost:3001/api/customers`;

    axios.get(apiUrl)
      .then(response => {
        const modifiedData = response.data.map(item => {
          const dateOfCreation = new Date(item.date_of_creation);
          const formattedDate = dateOfCreation.toLocaleDateString();
          const formattedTime = dateOfCreation.toLocaleTimeString();

          return {
            ...item,
            formattedDate,
            formattedTime,
          };
        });

        setData(modifiedData);
        console.log(modifiedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-bold mb-5">Interactive Customer Database Viewer</h1>

      <DataTable data={currentRecords} />
      <Pagination
        recordsPerPage={recordsPerPage}
        totalRecords={data.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default App;

