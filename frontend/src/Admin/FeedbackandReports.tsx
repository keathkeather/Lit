import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

interface FeedbackEntity {
  feedBackId: number;
  account: {
    accountId: number;
    firstName: string;
    lastName: string;
  };
  feedback: string;
}

interface ReportEntity {
  reportId: number;
  account: {
    accountId: number;
    firstName: string;
    lastName: string;
  };
  report: string;
}

interface FeedbackAndReports {}

const FeedbackAndReports: React.FC<FeedbackAndReports> = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackEntity[]>([]);
  const [reports, setReports] = useState<ReportEntity[]>([]);

  // Fetch feedbacks and reports data 
  useEffect(() => {
    const fetchFeedbacksData = async () => {
      try {
        const feedbacksResponse = await fetch('http://localhost:8080/feedback/getAllFeedbacks');
        const feedbacksData: FeedbackEntity[] = await feedbacksResponse.json();
        setFeedbacks(feedbacksData);
      } catch (error) {
        console.error('Error fetching feedbacks data:', error);
      }
    };

    const fetchReportsData = async () => {
      try {
        const reportsResponse = await fetch('http://localhost:8080/report/getAllReport');
        const reportsData: ReportEntity[] = await reportsResponse.json();
        setReports(reportsData);
      } catch (error) {
        console.error('Error fetching reports data:', error);
      }
    };

    fetchFeedbacksData();
    fetchReportsData();
  }, []); // Run once on component mount

  const handleDeleteFeedback = async (feedBackId: number) => {
    // Your implementation here to delete feedback
  };
  
  const handleDeleteReport = async (reportId: number) => {
    // Your implementation here to delete report
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-4">

        {/* Feedbacks Table */}
        <div className="p-10">
          <h2 className="text-2xl font-bold mb-4 text-gray">Feedbacks</h2>
          <hr className="border-[#eee]"></hr>
          <br></br>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" >
              <thead className="text-xs uppercase dark:bg-gray-700 dark:text-gray-400 bg-[#10235d12] text-center">
                <tr>
                  <th scope="col" className="px-6 py-3">User ID</th>
                  <th scope="col" className="px-6 py-3">First Name</th>
                  <th scope="col" className="px-6 py-3">Last Name</th>
                  <th scope="col" className="px-6 py-3">Feedback</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {feedbacks.map((feedback, index) => (
                 <tr key={feedback.account.accountId} className={`${index % 2 === 0 ? 'bg-[#ffffff] dark:bg-gray-800' : 'bg-[#10235d08] dark:bg-gray-900'} ${index !== feedbacks.length - 1 ? 'border-b-[#000] dark:border-b-[#000]' : ''}`}>
                    <td className="px-6 py-4 font-bold">{feedback.account.accountId}</td>
                    <td className="px-6 py-4">{feedback.account.firstName}</td>
                    <td className="px-6 py-4">{feedback.account.lastName}</td>
                    <td className="px-6 py-4">{feedback.feedback}</td>
                    <td className="py-2">
                      <button onClick={() => handleDeleteFeedback(feedback.account.accountId)} 
                      className="focus:outline-none text-xs text-[#c72b2b] bg-[#c72b2b28] hover:bg-[#c72b2b] hover:text-white font-medium rounded-lg px-5 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reports Table */}
        <div className='p-10'>
          <h2 className="text-2xl font-bold mb-4 text-gray">Reports</h2>
          <hr className="border-[#eee]"></hr>
          <br></br>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" >
              <thead className="text-xs uppercase dark:bg-gray-700 dark:text-gray-400 bg-[#10235d12] text-center">
                <tr>
                  <th scope="col" className="px-6 py-3">User ID</th>
                  <th scope="col" className="px-6 py-3">First Name</th>
                  <th scope="col" className="px-6 py-3">Last Name</th>
                  <th scope="col" className="px-6 py-3">Report</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {reports.map((report, index) => (
                 <tr key={report.account.accountId} className={`${index % 2 === 0 ? 'bg-[#ffffff] dark:bg-gray-800' : 'bg-[#10235d08] dark:bg-gray-900'} ${index !== feedbacks.length - 1 ? 'border-b-[#000] dark:border-b-[#000]' : ''}`}>
                    <td className="px-6 py-4 font-bold ">{report.account.accountId}</td>
                    <td className="px-6 py-4">{report.account.firstName}</td>
                    <td className="px-6 py-4">{report.account.lastName}</td>
                    <td className="px-6 py-4">{report.report}</td>
                    <td className="py-2">
                      <button onClick={() => handleDeleteReport(report.account.accountId)} 
                      className="focus:outline-none text-xs text-[#c72b2b] bg-[#c72b2b28] hover:bg-[#c72b2b] hover:text-white font-medium rounded-lg px-5 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackAndReports;