import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    // Fetch all feedbacks
    axios.get('http://localhost:8080/feedback/getAllFeedbacks')
      .then(response => {
        setFeedbacks(response.data);
      })
      .catch(error => {
        console.error('Error fetching feedbacks:', error);
      });

    // Fetch all reports
    axios.get('http://localhost:8080/report/getAllReports')
      .then(response => {
        setReports(response.data);
      })
      .catch(error => {
        console.error('Error fetching reports:', error);
      });
  }, []);

  return (
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
  );
};

export default FeedbackAndReports;