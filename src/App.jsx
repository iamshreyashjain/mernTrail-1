import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    visitorName: '',
    visitorEmail: '',
    visitorMessage: ''
  });
  const [response, setResponse] = useState(null);
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      const responseData = await response.json();
      setResponse(responseData);
    } catch (error) {
      setFormError(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/all');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h1>Fetching Data</h1>
        {loading && <p>Loading data...</p>}
        {error && <p>Error: {error}</p>}
        {data && (
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item.visitorName} - {item.visitorEmail} - {item.visitorMessage}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h1>Form Demo</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="visitorName">Visitor Name:</label>
            <input
              type="text"
              id="visitorName"
              name="visitorName"
              value={formData.visitorName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="visitorEmail">Visitor Email:</label>
            <input
              type="email"
              id="visitorEmail"
              name="visitorEmail"
              value={formData.visitorEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="visitorMessage">Visitor Message:</label>
            <input
              type="text"
              id="visitorMessage"
              name="visitorMessage"
              value={formData.visitorMessage}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
