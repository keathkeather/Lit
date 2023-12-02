import React from 'react';
import Header from './Header';

interface QuestListProps {}

const QuestList: React.FC<QuestListProps> = () => {

    return (
        <div className="overflow-y-auto">
          <Header />
        </div>
      );
  };

export default QuestList;