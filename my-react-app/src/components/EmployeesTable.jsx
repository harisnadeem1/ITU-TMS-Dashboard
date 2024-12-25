import React from 'react';

const EmployeesTable = ({ employees, onAdditionalFieldsClick }) => {
  return (
    <table border="1" style={{ width: '100%', marginTop: '10px' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Bank Account No.</th>
          <th>Branch Code</th>
          <th>Branch Name</th>
          <th>CNIC</th>
          <th>Designation</th>
          <th>Category</th>
          <th>Scale</th>
          <th>Appointment Date</th>
          <th>Contract End Date</th>
          <th>Mode of Payment</th>
          <th>No of Days Paid</th>
          <th>Increment</th>
          <th>Basic Pay</th>
          <th>Running Basic Pay</th>
          <th>Monthly Pay</th>
          <th>Arrears</th>
          <th>Other Deductions</th>
          <th>Gross Payable</th>
          <th>Income Tax</th>
          <th>Previous Month's Net Pay</th>
          <th>Net Pay</th>
          <th>Remarks</th>
          <th>Additional Fields</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.bank_account_no}</td>
            <td>{employee.branch_code}</td>
            <td>{employee.branch_name}</td>
            <td>{employee.cnic}</td>
            <td>{employee.designation}</td>
            <td>{employee.category}</td>
            <td>{employee.scale}</td>
            <td>{employee.appointment_date}</td>
            <td>{employee.contract_end_date}</td>
            <td>{employee.mode_of_payment}</td>
            <td>{employee.no_of_days_paid}</td>
            <td>{employee.increment}</td>
            <td>{employee.basic_pay}</td>
            <td>{employee.running_basic_pay}</td>
            <td>{employee.monthly_pay}</td>
            <td>{employee.arrears}</td> {/* Corrected field */}
            <td>{employee.other_deductions}</td>
            <td>{employee.gross_payable}</td>
            <td>{employee.income_tax}</td>
            <td>{employee.previous_month_net_pay}</td>
            <td>{employee.net_pay}</td>
            <td>{employee.remarks}</td>
            <td>
              <button onClick={() => onAdditionalFieldsClick(employee.id)}>View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeesTable;
