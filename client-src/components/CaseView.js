import React from 'react'
import { connect } from 'react-redux'
import { fetchCaseFeed, postCaseFeed } from '../actions'

function parseHash() {
  if (typeof window === 'undefined') return { caseId: '', subject: '' }
  const hash = window.location.hash || ''
  // expected format: #/case/<caseId>?subject=...
  const parts = hash.split('?')
  const path = parts[0] || ''
  const qs = parts[1] || ''
  const pathParts = path.split('/')
  const caseId = pathParts.length >= 3 ? pathParts[2] : ''
  let subject = ''
  if (qs) {
    const params = new URLSearchParams(qs)
    subject = params.get('subject') || ''
  }
  return { caseId, subject }
}

class CaseView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...parseHash(), message: '' }
    this.onHashChange = this.onHashChange.bind(this)
    this.onPost = this.onPost.bind(this)
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', this.onHashChange)
    }
    const { caseId } = this.state
    // Only fetch feed when we have a caseId and valid credentials
    if (caseId && this.props.creds && this.props.creds.accessToken && this.props.creds.instanceUrl) {
      this.props.fetchCaseFeed(this.props.creds, caseId)
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('hashchange', this.onHashChange)
    }
  }

  onHashChange() {
    const parsed = parseHash()
    this.setState(parsed)
    if (parsed.caseId && this.props.creds && this.props.creds.accessToken && this.props.creds.instanceUrl) {
      this.props.fetchCaseFeed(this.props.creds, parsed.caseId)
    }
  }

  onPost() {
    const { caseId, message } = this.state
    if (!message || message.trim().length === 0) return
    if (!this.props.creds || !this.props.creds.accessToken || !this.props.creds.instanceUrl) {
      console.warn('Cannot post to chatter: missing credentials')
      return
    }
    this.props.postCaseFeed(this.props.creds, caseId, message)
    this.setState({ message: '' })
  }

  render() {
  const { caseId, subject, message } = this.state
    const feedItems = (this.props.caseFeed && this.props.caseFeed.feeds && this.props.caseFeed.feeds[caseId]) || []

    if (!this.props.creds || !this.props.creds.accessToken) {
      return (
        <div style={{border: '1px solid #ddd', padding: '8px'}}>
          <h3>Case View</h3>
          <div>Please log in to view case details and Chatter.</div>
        </div>
      )
    }

    return (
      <div style={{border: '1px solid #ddd', padding: '8px'}}>
        <h3>Case View</h3>
        <div><strong>Case Id:</strong> {caseId}</div>
        <div style={{marginTop: '6px'}}><strong>Subject:</strong> {subject}</div>

        <div style={{marginTop: '12px'}}>
          <h4>Chatter</h4>
          <div style={{marginBottom: '8px'}}>
            <textarea value={message} onChange={(e) => this.setState({message: e.target.value})} rows={3} style={{width: '100%'}} />
            <div style={{marginTop: '6px'}}>
              <button onClick={this.onPost}>Post to Chatter</button>
            </div>
          </div>

          <div>
            {feedItems.map((f, idx) => (
              <div key={f.id || idx} style={{borderTop: '1px solid #eee', padding: '6px 0'}}>
                <div style={{fontSize: '12px', color:'#666'}}>{f.actor && f.actor.displayName}</div>
                <div>{f.body && (f.body.messageSegments ? f.body.messageSegments.map(s => s.text).join('') : f.body.message)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  creds: state.login,
  caseFeed: state.caseFeed
})

const mapDispatchToProps = (dispatch) => ({
  fetchCaseFeed: (creds, caseId) => dispatch(fetchCaseFeed(creds, caseId)),
  postCaseFeed: (creds, caseId, message) => dispatch(postCaseFeed(creds, caseId, message))
})

export default connect(mapStateToProps, mapDispatchToProps)(CaseView)
