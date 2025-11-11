import React from 'react'
import CaseList from './CaseList'
import CaseView from './CaseView'

// Small navigation component that manages hash-based simple pages for Cases.
export default class NavigationButtons extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hash: (typeof window !== 'undefined') ? window.location.hash : '' }
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
    this.setState({ hash: window.location.hash })
  }

  goList() {
    window.location.hash = '#/cases'
  }

  goView() {
    // User must select a case from the list first
    alert('Please open Case List and click a case to view it.')
    this.goList()
  }

  render() {
    const { hash } = this.state
    let page = null
    if (hash && hash.indexOf('#/case/') === 0) {
      page = <CaseView />
    } else if (hash === '#/cases') {
      page = <CaseList />
    }

    return (
      <div>
        <div style={{margin: '8px 0'}}>
          <button onClick={() => this.goList()}>Case List</button>
          <button onClick={() => this.goView()} style={{marginLeft: '8px'}}>Case View</button>
        </div>
        {page}
      </div>
    )
  }
}
