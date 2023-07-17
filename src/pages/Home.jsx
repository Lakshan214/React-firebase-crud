import { useState, useEffect } from 'react';
import fireDb from '../firebase';
import './Home.css'; // Import the external CSS file for styling
import { FaTrash, FaEdit,FaEye} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const response = await fireDb.collection('contacts').get();
      const fetchedData = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(fetchedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch data from the database
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm('');
    fetchData();
  };

  const handleDelete = async (id) => {
    try {
      // Delete the data from the database
      await fireDb.collection('contacts').doc(id).delete();
      // Fetch updated data
      toast.error('Data deleted successfully!');
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = data.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const ageMatch = item.age.toString().includes(searchTerm);
    return nameMatch || ageMatch;
  });

  return (
    <div>
      <h2>Home</h2>
      <div className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name or age"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button type="button" className="search-button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <h3>Data from Database:</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>
                <Link to={`/update/${item.id}`}>
                  <FaEdit className="action-button-edit" />
                </Link>
                <button
                  type="button"
                  className="action-button"
                  onClick={() => handleDelete(item.id)}
                >
                  <FaTrash />
                </button>
             
              <Link to={`/view/${item.id}`}>
             <button type="button" className="action-button">
             <FaEye />
            </button>
             </Link>
             </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
