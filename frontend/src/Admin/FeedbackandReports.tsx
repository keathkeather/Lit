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

  // * Delete Modal
  const [showFeedbackDeleteModal, setShowFeedbackDeleteModal] = useState(false);
  const [showReportDeleteModal, setShowReportDeleteModal] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<number | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  // * Feedback and Report modal
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackEntity | null>(null);
  const[selectedReport, setSelectedReport] = useState<ReportEntity | null>(null);

  // Pagination settings
  const itemsPerPage = 3;
  const [feedbackCurrentPage, setFeedbackCurrentPage] = useState(1);
  const [reportsCurrentPage, setReportsCurrentPage] = useState(1);

  // Fetch feedbacks and reports data 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [feedbacksResponse, reportsResponse] = await Promise.all([
          fetch('http://localhost:8080/feedback/getAllAvailableFeedback'),
          fetch('http://localhost:8080/report/getAllAvailableReport')
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

  // *** Delete Feedback and Report *** //
  const confirmDeleteFeedback = async () => {
    if (selectedFeedbackId) {
      try {
        const response = await fetch(`http://localhost:8080/feedback/deleteFeedback/${selectedFeedbackId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Failed to delete feedback');
        }
        setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback.feedBackId !== selectedFeedbackId));
        console.log('Feedback deleted successfully');
      } catch (error) {
        console.error('Error deleting feedback:', error);
      } finally {
        setShowFeedbackDeleteModal(false);
      }
    }
  };

  const confirmDeleteReport = async () => {
    if (selectedReportId) {
      try {
        const response = await fetch(`http://localhost:8080/report/deleteReport/${selectedReportId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Failed to delete report');
        }
        setReports((prevReports) => prevReports.filter((report) => report.reportId !== selectedReportId));
        console.log('Report deleted successfully');
      } catch (error) {
        console.error('Error deleting report:', error);
      } finally {
        setShowReportDeleteModal(false);
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-5">
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
                    <td 
                    className="px-6 py-3 cursor-pointer hover:text-bgc2 underline font-semibold"
                    onClick={() => {
                      setSelectedFeedback(feedback); // Set the selected feedback
                      setShowFeedbackModal(true); // Show the modal
                    }}
                    >
                      View Feedback
                    </td>
                    <td className="py-1.5">
                      <button
                        onClick={() => {
                          setSelectedFeedbackId(feedback.feedBackId); // Set the selected report ID to be deleted
                          setShowFeedbackDeleteModal(true); // * Show the delete report confirmation modal
                        }}
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
          <div className="flex justify-center mt-4 p-2 rounded-lg">
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
                    <td
                      className="px-6 py-3 cursor-pointer hover:text-bgc2 underline font-semibold"
                      onClick={() => {
                        setSelectedReport(report); // Set the selected feedback
                        setShowReportModal(true); // Show the modal
                      }}
                    >
                      View Report
                    </td>
                    <td className="py-1.5">
                      <button
                        onClick={() => {
                          setSelectedReportId(report.reportId); // Set the selected report ID to be deleted
                          setShowReportDeleteModal(true); // * Show the delete report confirmation modal
                        }}
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
          <div className="flex justify-center mt-4 p-2.5 rounded-lg">
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

       {/* View Feedback Modal */}
        {showFeedbackModal && selectedFeedback && (
          <div className="fixed top-0 left-0 w-full h-full bg-[#000] bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-[500px] bg-white rounded-lg ">
              {/* Header section */}
              <div className="bg-[#10235d] rounded-t-lg text-white p-4 mb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Feedback Details</h2>
                <button
                  onClick={() => {
                    setSelectedFeedback(null); // Clear the selected feedback
                    setShowFeedbackModal(false);
                  }}
                  className="focus:outline-none float-right"
                >
                  <img src="/litimg/close.png" alt="xbtn" className="w-3.5 mr-1.5" />
                </button>
              </div>
              {/* Feedback Details */}
              <div className='p-6 pt-2'>
                <h1 className="text-lg font-bold">Name</h1>
                <p>{selectedFeedback.account.firstName} {selectedFeedback.account.lastName}</p>
                <h1 className="text-lg font-bold mt-4">Feedback</h1>
                <p>{selectedFeedback.feedback}</p>
              </div>
            </div>
          </div>
        )}

        {/* View Report Modal */}
        {showReportModal && selectedReport && (
          <div className="fixed top-0 left-0 w-full h-full bg-[#000] bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-[500px] bg-white rounded-lg ">
            {/* Header section */}
            <div className="bg-[#10235d] rounded-t-lg text-white p-4 mb-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Feedback Details</h2>
              <button
                onClick={() => {
                  setSelectedReport(null); // Clear the selected report
                  setShowReportModal(false);
                }}
                className="focus:outline-none float-right"
              >
                <img src="/litimg/close.png" alt="xbtn" className="w-3.5 mr-1.5" />
              </button>
            </div>
            {/* Feedback Details */}
            <div className='p-6 pt-2'>
              <h1 className="text-lg font-bold">Name</h1>
              <p>{selectedReport.account.firstName} {selectedReport.account.lastName}</p>
              <h1 className="text-lg font-bold mt-4">Feedback</h1>
              <p>{selectedReport.report}</p>
            </div>
          </div>
        </div>
        )}

        {/* Delete Feedback Modal */}
        {showFeedbackDeleteModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-[#000] bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-[15px] shadow-lg p-12">
              <h2 className='text-[24px] text-center font-bold mb-3 text-[#c72b2b]'>Delete Feedback</h2>
              <p className="text-lg font-semibold mb-4 text-center ">Are you sure you want to delete <br/>Feedback?</p>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowFeedbackDeleteModal(false)}
                  className="px-4 py-2 bg-[#10235d12] text-gray-700 rounded font-semibold w-[120px]"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteFeedback}
                  className="px-4 py-2 bg-[#c72b2b] text-white rounded font-semibold w-[120px]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Report Modal */}
        {showReportDeleteModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-[#000] bg-opacity-50 flex justify-center items-center z-50 ">
            <div className="bg-white rounded-[15px] shadow-lg p-12">
              <h2 className='text-[24px] text-center font-bold mb-3 text-[#c72b2b]'>Delete Report</h2>
              <p className="text-lg font-semibold mb-4 text-center ">Are you sure you want to delete <br/>Report?</p>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowReportDeleteModal(false)}
                  className="px-4 py-2 bg-[#10235d12] text-gray-700 rounded font-semibold w-[120px]"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteReport}
                  className="px-4 py-2 bg-[#c72b2b] text-white rounded font-semibold w-[120px]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackAndReports;