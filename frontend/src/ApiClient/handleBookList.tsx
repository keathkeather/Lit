import axios from 'axios';
import { useBookList } from './BookListContext';
// Move this code inside a React function component or a custom React Hook function

export const useHandleBookList = () => {
    const { setBookList } = useBookList();
    const handleBookList = async (action: 'addBook' | 'removeBook', accountId: number, bookId: number) => {
        try {
            const response = await axios.put(`http://localhost:8080/booklist/${action}/${accountId}/?bookId=${bookId}`);
            const updatedBookList = await getBookList(accountId);
            setBookList(updatedBookList);
            return response.data;
        } catch (error) {
            if ((error as any).response) {
                if ((error as any).response.status === 409) {
                    // Handle the error here, e.g., show a message to the user
                    console.error('Book already exists in the list');
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
    const getBookList = async (accountId: number) => {
        try {
            const response = await axios.get(`http://localhost:8080/booklist/getAllBookInList/${accountId}`);
            return response.data;
        } catch (error) {
            // Handle errors as before
            // ...
        }
    };


    return   {handleBookList,getBookList};
};