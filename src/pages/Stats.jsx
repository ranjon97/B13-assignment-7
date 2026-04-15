import { useTimeline } from '../context/TimelineContext'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import Footer from '../components/Footer'
import './Stats.css'

const COLORS = ['#7B61FF', '#244D3F', '#22C55E']

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div className="chart-tooltip">
      <span className="tooltip-name">{name}</span>
      <span className="tooltip-val">{value}</span>
    </div>
  )
}

export default function Stats() {
  const { timeline } = useTimeline()

  const counts = timeline.reduce((acc, entry) => {
    if (['Call', 'Text', 'Video'].includes(entry.type)) {
      acc[entry.type] = (acc[entry.type] ?? 0) + 1
    }
    return acc
  }, {})

  const data = [
    { name: 'Text',  value: counts.Text  ?? 0 },
    { name: 'Call',  value: counts.Call  ?? 0 },
    { name: 'Video', value: counts.Video ?? 0 },
  ].filter(d => d.value > 0)

  return (
    <div className="page">
      <main className="page-content">
        <div className="stats-page">
          <h1 className="stats-title">Friendship Analytics</h1>

          <div className="chart-card">
            <h2 className="chart-label">By Interaction Type</h2>

            {data.length === 0 ? (
              <p className="chart-empty">No call, text, or video interactions yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={340}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={85}
                    outerRadius={135}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {data.map((entry, i) => (
                      <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    iconType="circle"
                    iconSize={10}
                    formatter={val => (
                      <span style={{ fontSize: '0.85rem', color: '#64748B' }}>{val}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
