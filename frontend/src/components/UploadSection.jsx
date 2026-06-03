import LoadingSpinner from "./LoadingSpinner"
import { UploadCloud, FileText } from "lucide-react"

const UploadSection = ({
  resumeFile,
  setResumeFile,
  jobDescription,
  setJobDescription,
  handleAnalyze,
  loading,
  darkMode,
}) => {
  return (
    <div
      className={
        darkMode
          ? "bg-slate-800 p-8 rounded-3xl shadow-2xl text-white border border-slate-700"
          : "bg-white p-8 rounded-3xl shadow-2xl text-black"
      }
    >

      <div className="flex items-center gap-3 mb-6">

        <UploadCloud
          size={30}
          className="text-blue-500"
        />

        <h2 className="text-3xl font-bold">
          Upload Resume
        </h2>

      </div>

      <div
        className="
          border-2
          border-dashed
          border-blue-500
          rounded-3xl
          p-8
          text-center
          mb-6
          hover:border-indigo-500
          transition-all
          hover:scale-105
duration-300
cursor-pointer
        "
      >

        <label
  className="
    inline-block
    bg-blue-600
    hover:bg-blue-700
    text-white
    px-6
    py-3
    rounded-2xl
    cursor-pointer
    hover:scale-105
    transition-all
    duration-300
  "
>

<label
  className="
    inline-block
    bg-blue-600
    hover:bg-blue-700
    text-white
    px-6
    py-3
    rounded-2xl
    hover:scale-105
transition-all
duration-300
cursor-pointer
  "
>

  📄 Select Resume

  <input
    type="file"
    accept=".pdf,.doc,.docx"
    onChange={(e) =>
      setResumeFile(
        e.target.files[0]
      )
    }
    className="hidden"
  />

</label>

</label>

        <p
          className={
            darkMode
              ? "text-slate-300"
              : "text-slate-600"
          }
        >
          Upload PDF or DOCX Resume
        </p>

      </div>

      {resumeFile && (

        <div
          className="
            flex
            items-center
            gap-3
            bg-blue-50
            text-slate-800
            p-4
            rounded-2xl
            mb-6
          "
        >

          <FileText size={22} />

          <span className="font-medium">
            {resumeFile.name}
          </span>

        </div>

      )}

      <textarea
  rows="5"
  placeholder="Paste Job Description Here..."
  value={jobDescription}
  onChange={(e) =>
    setJobDescription(
      e.target.value
    )
  }
  className={
    darkMode
      ? `
          w-full
          border
          border-slate-600
          p-4
          rounded-2xl
          bg-slate-900
          text-white
          shadow-sm
          placeholder:text-slate-400
        `
      : `
          w-full
          border
          border-slate-300
          p-4
          rounded-2xl
          bg-white
          text-black
          shadow-sm
          placeholder:text-slate-400
        `
  }
/>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="
          mt-6
          w-full
          bg-gradient-to-r
          from-blue-600
          to-indigo-700
          hover:from-blue-700
          hover:to-indigo-800
          text-white
          font-semibold
          py-4
          rounded-2xl
          transition-all
          duration-300
          shadow-xl
          flex
          justify-center
          items-center
          gap-3
          disabled:opacity-70
        "
      >

        {loading ? (
          <>
            <LoadingSpinner />
            Analyzing Resume...
          </>
        ) : (
          "🚀 Analyze Resume"
        )}

      </button>

    </div>
  )
}

export default UploadSection