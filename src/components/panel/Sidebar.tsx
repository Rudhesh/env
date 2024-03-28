// components/Sidebar.tsx

import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="overflow-y-auto  mt-2 p-4 h-fit			">
      <h3 className="text-xl font-semibold mb-4">Tools</h3>
      <ul>
        <li className="mb-2">Tool 1</li>
        <li className="mb-2">Tool 2</li>
        <li className="mb-2">Tool 3</li>
        <li className="mb-2">Tool 1</li>
        <li className="mb-2">Tool 2</li>
        <li className="mb-2">Tool 3</li>
        {/* Add more tools as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
