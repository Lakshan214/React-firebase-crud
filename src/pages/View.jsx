import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './View.css';
import fireDb from '../firebase';

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fireDb.collection('contacts').doc(id).get();
          const data = response.data();
          if (data) {
            setName(data.name);
            setAge(data.age);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleEdit = () => {
    // Perform your edit logic here
    // Example: Update the data in the database with the new values
    // const updatedData = { name, age };
    // await fireDb.collection('contacts').doc(id).update(updatedData);
    // Redirect to the appropriate page
    // navigate('/');

    // For demonstration purposes, we'll log the updated data to the console instead of performing the actual update
    console.log('Updated data:', { name, age });
  };

  return (
    <div>
      <div className="view-container">
        <div className="view-card">
          <div className="view-card-header">
            <h3>View Details</h3>
          </div>
          <div className="view-card-body">
            <form className="view-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  className="form-control"
                  value={age}
                  readOnly
                />
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
