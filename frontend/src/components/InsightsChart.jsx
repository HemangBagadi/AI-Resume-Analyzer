import {

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  ResponsiveContainer,

  CartesianGrid

} from "recharts"

const InsightsChart = ({ insights }) => {

  const data = [

    {
      name: "Hiring",
      score: insights.hiring_chance,
    },

    {
      name: "ATS",
      score: insights.ats_optimization,
    },

    {
      name: "Keywords",
      score: insights.keyword_relevance,
    },

    {
      name: "Readability",
      score: insights.resume_readability,
    },
  ]

  return (

    <div
  className="
    bg-white
    rounded-3xl
    shadow-lg
    p-6
    text-black
  "
>

      <h2
        className="
          text-2xl
          font-bold
          mb-6
         text-black
        "
      >
        AI Insights Chart
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="score"
              fill="#2563eb"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default InsightsChart