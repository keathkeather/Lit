import axios from 'axios';

const addBookListService = async (accountId: number, bookId: number) => {
    try {
        const response = await axios.post(`http://localhost:8080/booklist/addBook/${accountId}/?bookId=${bookId}`);
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

export default addBookListService;