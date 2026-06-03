import { useEffect, useState } from "react"

import mammoth from "mammoth"

const ResumePreview = ({ resumeFile }) => {

  const [docxText, setDocxText] =
    useState("")

  useEffect(() => {

    if (
      resumeFile &&
      resumeFile.name.endsWith(".docx")
    ) {

      const reader = new FileReader()

      reader.onload = async (event) => {

        const result =
          await mammoth.extractRawText({
            arrayBuffer: event.target.result,
          })

        setDocxText(result.value)

      }

      reader.readAsArrayBuffer(resumeFile)

    }

  }, [resumeFile])

  if (!resumeFile) {
    return null
  }

  const fileURL =
    URL.createObjectURL(resumeFile)

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-lg
        p-6
      "
    >

      <h2
        className="
          text-2xl
          font-bold
          mb-6
          text-slate-800
        "
      >
        Resume Preview
      </h2>

      {/* PDF PREVIEW */}

      {resumeFile.name.endsWith(".pdf") && (

        <div
          className="
            border
            rounded-2xl
            overflow-hidden
            shadow-md
          "
        >

          <embed
            src={fileURL}
            type="application/pdf"
            className="
              w-full
              h-[800px]
            "
          />

        </div>

      )}

      {/* DOCX PREVIEW */}

      {resumeFile.name.endsWith(".docx") && (

        <div
          className="
            border
            rounded-2xl
            p-5
            h-[800px]
            overflow-auto
            whitespace-pre-wrap
            bg-slate-50
            text-slate-700
          "
        >

          {docxText}

        </div>

      )}

    </div>
  )
}

export default ResumePreview