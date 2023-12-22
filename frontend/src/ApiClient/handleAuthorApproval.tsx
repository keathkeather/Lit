import axios from 'axios';
import { useBookList } from './BookListContext';
// Move this code inside a React function component or a custom React Hook function

export interface Request {
    account: Account
    request: string;
    portfolioLink: string; //link
    requestStatus: string;
}

interface Account {
    accountId: number;
    firstName: string;
}
export const useHandleAuthorApproval = () => {
    const handleRequest = async (action: 'approveRequest' | 'denyRequest', accountId: number) => {
        try {
            const response = await axios.put(`http://localhost:8080/authorRequest/approveRequest/${accountId}`);
            return response.data;
        } catch (error) {
            if ((error as any).response) {
                if ((error as any).response.status === 409) {
                    // Handle the error here, e.g., show a message to the user
                    console.error('User is already an author');
                } else if ((error as any).response.status === 500) {
                    // Handle internal server error
                    console.error('Internal server error');
                    // Show a user-friendly error message
                    alert('An unexpected error occurred. Please try again later.');
                } else {
                    // Handle other errors
                    console.error('An error occurred:', error);
                }
            } else {
                // Handle other errors
                console.error('An error occurred:', error);
            }
        }
    };
    const getRequest = async (accountId: number) => {
        try {
            const response = await axios.get(`http://localhost:8080/authorRequest/getByAccount/${accountId}`);
            return response.data;
        } catch (error) {
            // Handle errors as before
            // ...
        }
    };

    return   {handleRequest, getRequest};
};