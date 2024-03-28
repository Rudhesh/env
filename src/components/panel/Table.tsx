import React from "react";

interface TableProps {
  data: Record<string, any>[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const headers = Object.keys(data[0] || {});

  return (
    <div>
      <table className="min-w-full border border-gray-300 dark:border-gray-700">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>{item[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
