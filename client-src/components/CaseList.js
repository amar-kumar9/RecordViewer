import React from 'react'
import { connect } from 'react-redux'
import { fetchCases } from '../actions'

// Paginated list of cases owned by the logged-in user. Shows 10 per page.
class CaseList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { page: 1 }
  }

  componentDidMount() {
    const { creds } = this.props
    this.fetchPage(1, creds)
  }

  fetchPage(page, creds) {
    const pageSize = 10
    this.setState({ page: page })
    this.props.fetchCases(creds, page, pageSize)
  }

  onRowClick(c) {
    window.location.hash = `#/case/${c.Id}?subject=${encodeURIComponent(c.Subject || '')}`
  }

  render() {
    const { casesState } = this.props
    const { page } = this.state
    const records = (casesState.cases && casesState.cases.length) ? casesState.cases : []
    const total = casesState.totalSize || records.length
    const pageSize = casesState.pageSize || 10
    const start = (page - 1) * pageSize + 1
    const end = Math.min(page * pageSize, total)

    return (
      <div style={{border: '1px solid #ddd', padding: '8px'}}>
        <h3>Case List</h3>
        <div style={{marginBottom: '6px'}}>{`Showing ${start} - ${end} of ${total}`}</div>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr>
              <th style={{textAlign: 'left', borderBottom: '1px solid #ccc'}}>Case Number</th>
              <th style={{textAlign: 'left', borderBottom: '1px solid #ccc'}}>Subject</th>
            </tr>
          </thead>
          <tbody>
            {records.map((c) => (
              <tr key={c.Id} onClick={() => this.onRowClick(c)} style={{cursor: 'pointer'}}> 
                <td style={{padding: '6px 4px'}}>{c.CaseNumber}</td>
                <td style={{padding: '6px 4px'}}>{c.Subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{marginTop: '8px'}}>
          <button disabled={page <= 1} onClick={() => this.fetchPage(page - 1, this.props.creds)}>Prev</button>
          <button style={{marginLeft: '8px'}} disabled={end >= total} onClick={() => this.fetchPage(page + 1, this.props.creds)}>Next</button>
        </div>
        <div style={{marginTop: '6px', color: '#666'}}>
          Click a row to open the Case View.
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  creds: state.login,
  casesState: state.cases
})

const mapDispatchToProps = (dispatch) => ({
  fetchCases: (creds, page, pageSize) => dispatch(fetchCases(creds, page, pageSize))
})

export default connect(mapStateToProps, mapDispatchToProps)(CaseList)
