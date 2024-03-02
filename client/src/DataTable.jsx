



import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DataTable = ({ data }) => {
  const [timestamp, setTimestamp] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState({ date: 'asc', time: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const apiUrl = `http://localhost:3001/api/getTimestamp`;

    axios.get(apiUrl)
      .then(response => {
        const timestamps = response.data;
        setTimestamp(timestamps);

        const updatedData = data.map((item, index) => ({
          ...item,
          date: timestamps[index].date,
          time: timestamps[index].time,
        }));

        setSortedData(updatedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [data]);

  const sortData = (sortBy) => {
    const sortFunction = (a, b) => {
      const dateA = new Date(a.formattedDate + ' ' + a.formattedTime);
      const dateB = new Date(b.formattedDate + ' ' + b.formattedTime);

      if (sortBy === 'date') {
        return sortOrder.date === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortBy === 'time') {
        return sortOrder.time === 'asc' ? dateA - dateB : dateB - dateA;
      }

      return 0;
    };

    const sorted = [...sortedData].sort(sortFunction);
    setSortedData(sorted);
    setSortOrder({
      ...sortOrder,
      [sortBy]: sortOrder[sortBy] === 'asc' ? 'desc' : 'asc',
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = sortedData.filter(item =>
    item.Customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <a href='#' className='navbar-brand'/>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder=" Name or Location"
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-success mx-2" onClick={() => sortData('date')}>
                  Sort by Date
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-success" onClick={() => sortData('time')}>
                  Sort by Time
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Customer_Name</th>
              <th>Age</th>
              <th>Phone_no</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item.Sno}>
                <td>{item.Sno}</td>
                <td>{item.Customer_name}</td>
                <td>{item.Age}</td>
                <td>{item.Phone_no}</td>
                <td>{item.Location}</td>
                <td>{item.formattedDate}</td>
                <td>{item.formattedTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
