import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

interface Feedback {
  id: number;
  userId: number;
  content: string;
  // Add other properties as per your API response
}

interface Report {
  id: number;
  userId: number;
  reason: string;
  // Add other properties as per your API response
}

const FeedbackAndReports: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [feedbacksFetched, setFeedbacksFetched] = useState<boolean>(false);
  const [reportsFetched, setReportsFetched] = useState<boolean>(false);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/feedback/getAllFeedbacks');
      setFeedbacks(response.data);
      setFeedbacksFetched(true);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:8080/report/getAllReports');
      setReports(response.data);
      setReportsFetched(true);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    if (!feedbacksFetched) {
      fetchFeedbacks();
    }
    if (!reportsFetched) {
      fetchReports();
    }
  }, [feedbacksFetched, reportsFetched]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-4">
        <div>
          <h2>Feedbacks</h2>
          <ul>
            {feedbacks.map(feedback => (
              <li key={feedback.id}>
                <strong>User ID:</strong> {feedback.userId}<br />
                <strong>Content:</strong> {feedback.content}<br />
                {/* Display other feedback properties as needed */}
              </li>
            ))}
          </ul>

          <h2>Reports</h2>
          <ul>
            {reports.map(report => (
              <li key={report.id}>
                <strong>User ID:</strong> {report.userId}<br />
                <strong>Reason:</strong> {report.reason}<br />
                {/* Display other report properties as needed */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeedbackAndReports;