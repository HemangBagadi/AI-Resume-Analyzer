import FeedbackCard from "./FeedbackCard"
import DownloadButton from "./DownloadButton"
import InsightBar from "./InsightBar"
import ScoreCircle from "./ScoreCircle"
import ATSCard from "./ATSCard"
import InsightsChart from "./InsightsChart"
import axios from "axios"

const ResultsSection = ({
  results,
  darkMode,
}) => {

  if (!results) {
    return null
  }

  const handleSaveReport = async () => {

    try {

      const reportData = {
        ...results,
        username: localStorage.getItem(
          "username"
        )
      }

      await axios.post(
        "http://127.0.0.1:8000/save-report",
        reportData
      )

      alert(
        "Report saved successfully"
      )

    } catch (error) {

      console.log(error)

      alert(
        "Failed to save report"
      )
    }
  }

  return (
    <div
      className={
        darkMode
          ? "space-y-8 text-white"
          : "space-y-8"
      }
    >

      <div className="flex justify-end">
<DownloadButton
  results={results}
/>      </div>

      {/* ATS CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <ATSCard
  title="ATS Score"
  value={`${results.match_score}%`}
  color={
    results.match_score >= 80
      ? "bg-gradient-to-r from-green-500 to-green-700"
      : results.match_score >= 60
      ? "bg-gradient-to-r from-yellow-500 to-orange-500"
      : "bg-gradient-to-r from-red-500 to-red-700"
  }
/>

        <ATSCard
          title="Matched Skills"
          value={results.matched_skills.length}
          color="bg-gradient-to-r from-green-500 to-green-700"
        />

        <ATSCard
          title="Missing Skills"
          value={results.missing_skills.length}
          color="bg-gradient-to-r from-red-500 to-red-700"
        />

      </div>

      {/* ATS SCORE METER */}

      <div className="bg-white p-8 rounded-2xl shadow-lg">

<h2 className="text-2xl font-bold mb-6 text-center text-black">          ATS Score Overview
        </h2>

        <ScoreCircle
          score={results.match_score}
        />

      </div>

      {/* AI INSIGHTS */}

      <div className="bg-white p-6 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6 text-black">
  AI Insights
</h2>

        <div className="space-y-6">

          <InsightBar
            title="Hiring Chance"
            value={results.insights.hiring_chance}
            color="bg-green-500"
          />

          <InsightBar
            title="ATS Optimization"
            value={results.insights.ats_optimization}
            color="bg-blue-500"
          />

          <InsightBar
            title="Keyword Relevance"
            value={results.insights.keyword_relevance}
            color="bg-purple-500"
          />

          <InsightBar
            title="Resume Readability"
            value={results.insights.resume_readability}
            color="bg-orange-500"
          />

        </div>

      </div>

      <InsightsChart
        insights={results.insights}
      />

      <button
        onClick={handleSaveReport}
        className="
          bg-indigo-600
          hover:bg-indigo-700
          text-white
          px-6
          py-3
          rounded-2xl
          shadow-lg
          transition-all
        "
      >
        Save Report
      </button>

      {/* SUMMARY */}

      <div className="bg-white p-6 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold mb-4 text-black">
  Resume Summary
</h2>

        <p className="text-gray-700 leading-7">
          {results.summary}
        </p>

      </div>

      <FeedbackCard
        title="Strengths"
        items={results.ai_strengths}
        type="strength"
      />

      <FeedbackCard
        title="Weaknesses"
        items={results.ai_weaknesses}
        type="weakness"
      />

      <FeedbackCard
        title="Suggestions"
        items={results.ai_suggestions}
        type="suggestion"
      />

    </div>
  )
}

export default ResultsSection