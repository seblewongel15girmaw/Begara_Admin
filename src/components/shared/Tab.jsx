import React, { useState } from 'react';

const Tab = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || 0);

  return (
    <div>
      <div className="flex flex-wrap border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${
              index === activeTab
                ? 'bg-primary text-white'
                : 'bg-white text-primary'
            } py-2 px-4 focus:outline-none capitalize`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="mt-2">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tab;
