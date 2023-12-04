import axios from 'axios';

interface Account {
  // Define the structure of the user object
  accountId: number;
  email: string;
  firstName: string;
  lastname: string;
  gender: string
  
  // Add other properties as needed
}

const useFetchAccount = () => {
  const fetchAccount = async (accountId: number): Promise<Account | null> => {
    try {
      const response = await axios.get(`http://localhost:8080/account/${accountId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user information:', error);
      return null;
    }
  };

  return fetchAccount;
};

export default useFetchAccount;
