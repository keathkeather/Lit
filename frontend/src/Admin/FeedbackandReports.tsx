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

interface FeedbackAndReportsProps {}

const FeedbackAndReports: React.FC<FeedbackAndReportsProps> = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackEntity[]>([]);
  const [reports, setReports] = useState<ReportEntity[]>([]);

  // Pagination settings
  const itemsPerPage = 3;
  const [feedbackCurrentPage, setFeedbackCurrentPage] = useState(1);
  const [reportsCurrentPage, setReportsCurrentPage] = useState(1);

  // Fetch feedbacks and reports data 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [feedbacksResponse, reportsResponse] = await Promise.all([
          fetch('http://localhost:8080/feedback/getAllFeedbacks'),
          fetch('http://localhost:8080/report/getAllReport')
        ]);

        const feedbacksData: FeedbackEntity[] = await feedbacksResponse.json();
        const reportsData: ReportEntity[] = await reportsResponse.json();

        setFeedbacks(feedbacksData);
        setReports(reportsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Run once on component mount

  // Function to get feedbacks for the current page
  const getFeedbackForCurrentPage = () => {
    const startIndex = (feedbackCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return feedbacks.slice(startIndex, endIndex);
  };

  const getReportsForCurrentPage = () => {
    const startIndex = (reportsCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return reports.slice(startIndex, endIndex);
  };

  const handleDeleteFeedback = async (feedbackId: number) => {
    // Implement delete feedback functionality here
  };
  
  const handleDeleteReport = async (reportId: number) => {
    // Implement delete report functionality here
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-4">
        {/* Feedbacks Table */}
        <div className="p-5 pb-0 pt-4">
          <h2 className="text-2xl font-bold mb-4 text-gray">Feedbacks</h2>
          <hr className="border-[#eee]"></hr>
          <br/>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[190px]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs uppercase dark:bg-gray-700 dark:text-gray-400 bg-[#10235d12] text-center">
                <tr>
                  <th scope="col" className="px-6 py-3">User ID</th>
                  <th scope="col" className="px-6 py-3">First Name</th>
                  <th scope="col" className="px-6 py-3">Last Name</th>
                  <th scope="col" className="px-6 py-3">Feedback</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {getFeedbackForCurrentPage().map((feedback, index) => (
                  <tr
                    key={feedback.feedBackId}
                    className={`${
                      index % 2 === 0
                        ? 'bg-[#ffffff] dark:bg-gray-800'
                        : 'bg-[#10235d08] dark:bg-gray-900'
                    } ${
                      index !== feedbacks.length - 1 ? 'border-b-[#000] dark:border-b-[#000]' : ''
                    }`}
                  >
                    <td className="px-6 py-3 font-bold">{feedback.account.accountId}</td>
                    <td className="px-6 py-3">{feedback.account.firstName}</td>
                    <td className="px-6 py-3">{feedback.account.lastName}</td>
                    <td className="px-6 py-3">{feedback.feedback}</td>
                    <td className="py-1.5">
                      <button
                        onClick={() => handleDeleteFeedback(feedback.feedBackId)}
                        className="focus:outline-none text-xs text-[#c72b2b] bg-[#c72b2b28] hover:bg-[#c72b2b] hover:text-white font-medium rounded-lg px-5 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination for Feedbacks */}
          <div className="flex justify-center mt-4 bg-[#eeeeeec1] p-2.5 rounded-lg">
            {Array.from({ length: Math.ceil(feedbacks.length / itemsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                className={`mx-1 px-3 py-2 text-xs font-bold rounded-full ${
                  feedbackCurrentPage === index + 1 ? 'bg-[#10235d] text-white' : 'bg-[#E6E6E6] text-[#4C4C4C] hover:bg-[#10235d] hover:text-white'
                }`}
                onClick={() => setFeedbackCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Reports Table */}
        <div className="p-5 pt-3">
          <h2 className="text-2xl font-bold mb-4 text-gray">Reports</h2>
          <hr className="border-[#eee]"></hr>
          <br></br>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[190px]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs uppercase dark:bg-gray-700 dark:text-gray-400 bg-[#10235d12] text-center">
                <tr>
                  <th scope="col" className="px-6 py-3">User ID</th>
                  <th scope="col" className="px-6 py-3">First Name</th>
                  <th scope="col" className="px-6 py-3">Last Name</th>
                  <th scope="col" className="px-6 py-3">Report</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {getReportsForCurrentPage().map((report, index) => (
                  <tr
                    key={report.reportId}
                    className={`${
                      index % 2 === 0
                        ? 'bg-[#ffffff] dark:bg-gray-800'
                        : 'bg-[#10235d08] dark:bg-gray-900'
                    } ${
                      index !== reports.length - 1 ? 'border-b-[#000] dark:border-b-[#000]' : ''
                    }`}
                  >
                    <td className="px-6 py-3 font-bold">{report.account.accountId}</td>
                    <td className="px-6 py-3">{report.account.firstName}</td>
                    <td className="px-6 py-3">{report.account.lastName}</td>
                    <td className="px-6 py-3">{report.report}</td>
                    <td className="py-1.5">
                      <button
                        onClick={() => handleDeleteReport(report.reportId)}
                        className="focus:outline-none text-xs text-[#c72b2b] bg-[#c72b2b28] hover:bg-[#c72b2b] hover:text-white font-medium rounded-lg px-5 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination for Reports */}
          <div className="flex justify-center mt-4 bg-[#eeeeeec1] p-2.5 rounded-lg">
            {Array.from({ length: Math.ceil(reports.length / itemsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                className={`mx-1 px-3 py-2 text-xs font-bold rounded-full ${
                  reportsCurrentPage === index + 1 ? 'bg-[#10235d] text-white' : 'bg-[#E6E6E6] text-[#4C4C4C] hover:bg-[#10235d] hover:text-white'
                }`}
                onClick={() => setReportsCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackAndReports;