import axios from 'axios';

interface User {
  // Define the structure of the user object
  username: string;
  firstName: string;
  // Add other properties as needed
}

const useFetchUser = () => {
  const fetchUser = async (userId: number): Promise<User | null> => {
    try {
      const response = await axios.get(`http://localhost:8080/user/getUser/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user information:', error);
      return null;
    }
  };

  return fetchUser;
};

export default useFetchUser;
