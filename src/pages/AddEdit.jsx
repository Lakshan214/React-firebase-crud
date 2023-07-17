import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AddEdit.css';
import { toast } from 'react-toastify';
import fireDb from '../firebase';


const AddEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
 

  useEffect(() => {
    if (id) {
      // Fetch data from the database based on the ID for editing
      // Example:
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && age) {
      try {
        if (id) {
          // Update data in the database
          // Example:
          await fireDb.collection('contacts').doc(id).update({
            name,
            age,
          });
          toast.success('Data updated successfully!');
        } else {
          // Add new data to the database
          // Example:
          await fireDb.collection('contacts').add({
            name,
            age,
          });
          toast.success('Data added successfully!');
        }

        // Redirect to the appropriate page
        navigate('/');
      } catch (error) {
        console.log(error);
        toast.error('An error occurred. Please try again.');
      }
    } else {
      toast.error('Please enter all fields.');
    }
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-submit">Submit</button>
      </form>
    </div>
  );
};

export default AddEdit;
