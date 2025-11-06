import React from 'react'

// Simple case list with two fields per row: Case Number and Subject.
// Clicking a row navigates to the case view via hash with subject in query.
const sampleCases = [
  { caseNumber: '12345', subject: 'Login issue for user' },
  { caseNumber: '67890', subject: 'Payment processing error' }
]

export default function CaseList() {
  const onRowClick = (c) => {
    window.location.hash = `#/case/${c.caseNumber}?subject=${encodeURIComponent(c.subject)}`
  }

  return (
    <div style={{border: '1px solid #ddd', padding: '8px'}}>
      <h3>Case List</h3>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            <th style={{textAlign: 'left', borderBottom: '1px solid #ccc'}}>Case Number</th>
            <th style={{textAlign: 'left', borderBottom: '1px solid #ccc'}}>Subject</th>
          </tr>
        </thead>
        <tbody>
          {sampleCases.map((c) => (
            <tr key={c.caseNumber} onClick={() => onRowClick(c)} style={{cursor: 'pointer'}}> 
              <td style={{padding: '6px 4px'}}>{c.caseNumber}</td>
              <td style={{padding: '6px 4px'}}>{c.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop: '6px', color: '#666'}}>
        Click a row to open the Case View.
      </div>
    </div>
  )
}
