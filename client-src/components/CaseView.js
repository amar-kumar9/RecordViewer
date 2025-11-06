import React from 'react'

function parseHash() {
  if (typeof window === 'undefined') return { caseNumber: '', subject: '' }
  const hash = window.location.hash || ''
  // expected format: #/case/<caseNumber>?subject=...
  const parts = hash.split('?')
  const path = parts[0] || ''
  const qs = parts[1] || ''
  const pathParts = path.split('/')
  const caseNumber = pathParts.length >= 3 ? pathParts[2] : ''
  let subject = ''
  if (qs) {
    const params = new URLSearchParams(qs)
    subject = params.get('subject') || ''
  }
  return { caseNumber, subject }
}

export default class CaseView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...parseHash() }
    this.onHashChange = this.onHashChange.bind(this)
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', this.onHashChange)
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('hashchange', this.onHashChange)
    }
  }

  onHashChange() {
    this.setState(parseHash())
  }

  render() {
    const { caseNumber, subject } = this.state
    return (
      <div style={{border: '1px solid #ddd', padding: '8px'}}>
        <h3>Case View</h3>
        <div><strong>Case Number:</strong> {caseNumber}</div>
        <div style={{marginTop: '6px'}}><strong>Subject:</strong> {subject}</div>
      </div>
    )
  }
}
