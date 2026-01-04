import type { Employee } from '../types/Employee';

export const printEmployeesList = (employees: Employee[], filters?: { gender?: string; status?: string }) => {
  const pageTitle = 'Employee List';
  const timestamp = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let htmlContent = `
    <html>
    <head>
      <title>${pageTitle}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
          background-color: white;
          padding: 20px;
          border-radius: 8px;
        }
        h1 {
          color: #333;
          text-align: center;
          margin-bottom: 10px;
        }
        .timestamp {
          text-align: center;
          color: #666;
          margin-bottom: 20px;
          font-size: 14px;
        }
        .filters {
          background-color: #f9f9f9;
          padding: 10px;
          margin-bottom: 20px;
          border-left: 4px solid #4f46e5;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th {
          background-color: #4f46e5;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: bold;
        }
        td {
          padding: 12px;
          border-bottom: 1px solid #ddd;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        tr:hover {
          background-color: #f0f0f0;
        }
        .status-active {
          color: #10b981;
          font-weight: bold;
        }
        .status-inactive {
          color: #ef4444;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          color: #666;
          font-size: 12px;
          border-top: 1px solid #ddd;
          padding-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>${pageTitle}</h1>
        <div class="timestamp">Generated on: ${timestamp}</div>
  `;

  if (filters) {
    htmlContent += '<div class="filters">';
    if (filters.gender) {
      htmlContent += `<p><strong>Gender Filter:</strong> ${filters.gender}</p>`;
    }
    if (filters.status) {
      htmlContent += `<p><strong>Status Filter:</strong> ${filters.status}</p>`;
    }
    htmlContent += '</div>';
  }

  htmlContent += `
    <table>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Full Name</th>
          <th>Gender</th>
          <th>Date of Birth</th>
          <th>State</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
  `;

  employees.forEach(employee => {
    const dob = new Date(employee.dateOfBirth).toLocaleDateString('en-IN');
    const statusClass = employee.isActive ? 'status-active' : 'status-inactive';
    const statusText = employee.isActive ? 'Active' : 'Inactive';

    htmlContent += `
      <tr>
        <td>${employee.id}</td>
        <td>${employee.fullName}</td>
        <td>${employee.gender}</td>
        <td>${dob}</td>
        <td>${employee.state}</td>
        <td><span class="${statusClass}">${statusText}</span></td>
      </tr>
    `;
  });

  htmlContent += `
      </tbody>
    </table>
    <div class="footer">
      <p>Total Records: ${employees.length}</p>
      <p>This is an auto-generated document. Please verify the information before use.</p>
    </div>
  </div>
  </body>
  </html>
  `;

  const printWindow = window.open('', '', 'height=600,width=900');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }
};
