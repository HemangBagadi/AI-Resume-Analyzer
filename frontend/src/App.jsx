import { useState } from "react"

import axios from "axios"

import Header from "./components/Header"

import AuthModal from "./components/AuthModal"

import UploadSection from "./components/UploadSection"

import ResultsSection from "./components/ResultsSection"

import HistorySection from "./components/HistorySection"

import ResumePreview from "./components/ResumePreview"

function App() {

  const [darkMode, setDarkMode] =
    useState(false)

  const [showAuthModal, setShowAuthModal] =
  useState(false)  

  const [resumeFile, setResumeFile] =
    useState(null)

  const [jobDescription, setJobDescription] =
    useState("")

  const [results, setResults] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  const handleAnalyze = async () => {

    if (
      !resumeFile ||
      !jobDescription
    ) {

      alert(
        "Upload resume and add job description"
      )

      return
    }

    try {

      setLoading(true)

      const formData =
        new FormData()

      formData.append(
        "file",
        resumeFile
      )

      formData.append(
        "job_description",
        jobDescription
      )

      const response =
        await axios.post(
          "http://127.0.0.1:8000/analyze",
          formData
        )

      const reportData = {
  ...response.data,
  username: localStorage.getItem(
    "username"
  )
}

setResults(reportData)

    } catch (error) {

      console.log(error)

      alert(
        "Something went wrong"
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <div
      className={
        darkMode
  ? `
    min-h-screen
    bg-gradient-to-b
from-slate-950
via-slate-900
to-blue-950
    transition-all
    duration-300
  `
          : `
            min-h-screen
            bg-slate-100
            text-black
            transition-all
            duration-300
          `
      }
    >

      {/* HEADER */}

      <Header
  onOpenAuth={() =>
    setShowAuthModal(true)
  }
/>

<AuthModal
  isOpen={showAuthModal}
  onClose={() =>
    setShowAuthModal(false)
  }
  darkMode={darkMode}
/>

      {/* DARK MODE BUTTON */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          pt-6
          flex
          justify-end
        "
      >

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="
            bg-slate-800
            text-white
            px-5
            py-3
            rounded-2xl
            shadow-lg
            hover:bg-slate-700
            transition-all
          "
        >

          {
            darkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"
          }

        </button>

      </div>

      {/* HERO SECTION */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          py-12
        "
      >

        <div
          className="
            bg-gradient-to-r
            from-blue-600
            to-indigo-700
            text-white
            rounded-3xl
            p-10
            shadow-2xl
          "
        >

          <h2
            className="
              text-5xl
              font-bold
              leading-tight
            "
          >
            AI-Powered Resume Analysis
          </h2>

          <p
            className="
              mt-5
              text-lg
              text-blue-100
              max-w-3xl
            "
          >
            Upload your resume,
            analyze ATS compatibility,
            discover missing skills,
            and improve hiring chances
            using AI.
          </p>

        </div>

      </section>

      <div
  className="
    max-w-6xl
    mx-auto
    px-6
    mb-10
  "
>

  <div
    className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-6
    "
  >

    <div
      className="
        bg-gradient-to-r
        from-blue-600
        to-blue-800
        text-white
        rounded-3xl
        p-6
        shadow-xl
      "
    >

      <p className="text-blue-100">
        Reports Generated
      </p>

      <h2 className="text-4xl font-bold mt-2">
        6
      </h2>

    </div>

    <div
      className="
        bg-gradient-to-r
        from-green-500
        to-green-700
        text-white
        rounded-3xl
        p-6
        shadow-xl
      "
    >

      <p className="text-green-100">
        Average ATS Score
      </p>

      <h2 className="text-4xl font-bold mt-2">
        37%
      </h2>

    </div>

    <div
      className="
        bg-gradient-to-r
        from-purple-500
        to-purple-700
        text-white
        rounded-3xl
        p-6
        shadow-xl
      "
    >

      <p className="text-purple-100">
        AI Powered
      </p>

      <h2 className="text-4xl font-bold mt-2">
        Gemini
      </h2>

    </div>

  </div>

</div>



      {/* MAIN CONTENT */}

      <div
        className="
          max-w-6xl
          mx-auto
          p-6
          space-y-10
        "
      >

        {/* UPLOAD SECTION */}

        <UploadSection
  darkMode={darkMode}
  resumeFile={resumeFile}
  setResumeFile={setResumeFile}
  jobDescription={jobDescription}
  setJobDescription={setJobDescription}
  handleAnalyze={handleAnalyze}
  loading={loading}
/>

        {/* RESULTS + PREVIEW */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-8
          "
        >

          <ResultsSection
            results={results}
            darkMode={darkMode}
          />

          <ResumePreview
          darkMode={darkMode}
            resumeFile={resumeFile}
          />

        </div>
        <HistorySection />

      </div>

    </div>
  )
}

export default App