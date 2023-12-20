import axios from 'axios';

const fetchAuthorBooks = async (accountId: number) => {
        try {
            const response = await axios.get(`http://localhost:8080/book/getBookByAuthor/${accountId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
};
    



export  {fetchAuthorBooks};