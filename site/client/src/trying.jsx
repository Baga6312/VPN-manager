import  { useState, useEffect } from 'react';

function FetchDataButton(props) {
  const [dataUsers, setDataUsers] = useState([]); // Initialize with empty array
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Replace with your actual data fetching function
  const fetchDataUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await props.fetchDataFunction();
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const fetchedData = await response.json();
      setDataUsers(fetchedData); // Update state with fetched data
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataUsers(); // Fetch data on component mount
  }, [props.fetchDataFunction]); // Dependency on fetchDataFunction prop

  return (
    <div>
      <button onClick={fetchDataUsers} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Data'}
      </button>
      {dataUsers.length > 0 && (
        <div>
          <h2>Fetched Users:</h2>
          <ul>
            {dataUsers.map((user) => (
              <li key={user.id}>{user.name})</li>
            ))}
          </ul>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default FetchDataButton;

