export interface Book {
    bookId: number;
    bookName: string;
    genre: string
    // Add other fields as needed
  }
  
  export const fetchBooks = async (): Promise<Book[]> => {
    try {
      const response = await fetch('http://localhost:8080/book/all');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
  
      const data: Book[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  };
  