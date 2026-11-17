
import { useState } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_BASE_URL

function App() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleScan = async (event) => {
    event.preventDefault()

    if (!url.trim()) {
      setError('Please enter a URL to scan.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch(`${API_URL}/api/scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || data.detail || 'Unable to scan this URL.'
        )
      }

      setResult(data)
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Cannot connect to Sentinel backend. Check that Spring Boot is running on port 8081.'
          : err.message
      )
    } finally {
      setLoading(false)
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'KNOWN_MALICIOUS':
        return 'Known Malicious'
      case 'SUSPICIOUS':
        return 'Suspicious'
      default:
        return 'No Known Threat Found'
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h2 className="logo">SENTINEL<span>.</span></h2>

        <div className="nav-links">
          <a href="#dashboard">Dashboard</a>
          <a href="#scanner">URL Scanner</a>
          <a href="#intelligence">Threat Intelligence</a>
          <a href="#about">About</a>
        </div>

        <button
          className="nav-button"
          onClick={() =>
            document.getElementById('scanner')?.scrollIntoView({
              behavior: 'smooth',
            })
          }
        >
          Scan a URL
        </button>
      </nav>

      <main id="dashboard">
        <section className="hero">
          <p className="eyebrow">INTELLIGENT URL SECURITY</p>

          <h1>
            Stay Ahead of <span>Phishing Threats.</span>
          </h1>

          <p>
            Analyse suspicious URLs using intelligent algorithms,
            threat intelligence and risk assessment.
          </p>
        </section>

        <section className="scanner" id="scanner">
          <h2>URL Security Scanner</h2>
          <p>Enter a URL below to analyse its threat level.</p>

          <form className="scan-input" onSubmit={handleScan}>
            <input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Analysing...' : 'Scan URL ↗'}
            </button>
          </form>

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}
        </section>

        {result && (
          <section className="results">
            <div className="results-heading">
              <div>
                <p className="eyebrow">SCAN COMPLETE</p>
                <h2>Analysis Results</h2>
              </div>

              <span className={`status ${result.status?.toLowerCase()}`}>
                {getStatusLabel(result.status)}
              </span>
            </div>

            <div className="risk-card">
              <p>Risk Score</p>
              <h2>{result.riskScore ?? 0}<span>/100</span></h2>
              <p>Risk Level: {result.riskLevel ?? 'Unknown'}</p>
            </div>

            <div className="result-details">
              <div className="detail-card">
                <p>Original URL</p>
                <strong>{result.originalUrl}</strong>
              </div>

              <div className="detail-card">
                <p>Normalized URL</p>
                <strong>{result.normalizedUrl}</strong>
              </div>

              <div className="detail-card">
                <p>Hostname</p>
                <strong>{result.hostname}</strong>
              </div>

              <div className="detail-card">
                <p>Protocol</p>
                <strong>{result.scheme}</strong>
              </div>
            </div>

            <h3 className="section-heading">Algorithm Analysis</h3>

            <div className="algorithm-grid">
              <div className="algorithm-card">
                <p>Bloom Filter</p>
                <strong>
                  {result.bloomFilterMatch ? 'Possible Match' : 'No Match'}
                </strong>
                <small>Probabilistic pre-check</small>
              </div>

              <div className="algorithm-card">
                <p>Exact Database</p>
                <strong>
                  {result.exactDatabaseMatch ? 'Exact Match' : 'No Exact Match'}
                </strong>
                <small>Authoritative verification</small>
              </div>

              <div className="algorithm-card">
                <p>KMP Pattern Matching</p>
                <strong>
                  {result.matchedPatterns?.length
                    ? result.matchedPatterns.join(', ')
                    : 'No patterns found'}
                </strong>
                <small>Suspicious URL patterns</small>
              </div>

              <div className="algorithm-card">
                <p>Domain Trie</p>
                <strong>
                  {result.matchedDomain || 'No matching domain'}
                </strong>
                <small>Suspicious domain suffix check</small>
              </div>
            </div>

            <div className="reasons-card">
              <h3>Risk Assessment Reasons</h3>

              {result.reasons?.length ? (
                <ul>
                  {result.reasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              ) : (
                <p>No risk indicators were detected.</p>
              )}
            </div>

            <p className="disclaimer">
              No known threat found does not guarantee that a URL is safe.
              Results depend on the currently available threat database
              and detection rules.
            </p>
          </section>
        )}

        <section className="stats">
          <div className="stat-card">
            <p>Total URLs Scanned</p>
            <h2>—</h2>
          </div>

          <div className="stat-card">
            <p>Known Threats</p>
            <h2>—</h2>
          </div>

          <div className="stat-card">
            <p>Suspicious URLs</p>
            <h2>—</h2>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
