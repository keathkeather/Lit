import axios from 'axios';
import { useCallback } from 'react';
interface Account {
    accountId: number;
    email: string;
    firstName: string;
    // Add other properties of Account here
  }
  
  interface Subscription {
    subscriptionName: string;
    subscriptionDescription: string;
    subscriptionDuration: number;
    cost: number;
    // Add other properties of Subscription here
  }
  
 export interface AccountSubscription {
    account: Account;
    subscription: Subscription;
    start_date: string;
    end_date: string;
    startDate: string;
    subscribed: boolean;
    endDate: string;
    accountSubscriptionId: number;
  }

export const useHandleAccountSubscription = () => {
    const purchaseSubscription = async ( accountId: number) => {
        try {
            const response = await axios.post(`http://localhost:8080/account/purchaseSub/${accountId}?subscriptionId=1`);
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
    const getAccountSubscription = useCallback(async (accountId: number): Promise<AccountSubscription | undefined> => {
        // Function implementation here
        // ...
    
        try {
            const response = await axios.get<AccountSubscription>(`http://localhost:8080/account/subscription/${accountId}`);
            return response.data;
        } catch (error) {
            // Handle errors as before
            // ...
        }
    }, []); 


    return   {purchaseSubscription,getAccountSubscription};
};