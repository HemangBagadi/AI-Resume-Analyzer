import axios from "axios"

const DownloadButton = ({
  results
}) => {

  const handleDownload = async () => {

    try {

      const response =
        await axios.post(
          "http://127.0.0.1:8000/download-report",
          results,
          {
            responseType: "blob"
          }
        )

      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        )

      const link =
        document.createElement("a")

      link.href = url

      link.setAttribute(
        "download",
        "resume_report.pdf"
      )

      document.body.appendChild(
        link
      )

      link.click()

    } catch (error) {

      console.log(error)

      alert(
        "Failed to download report"
      )
    }
  }

  return (

    <button
      onClick={handleDownload}
      className="
        bg-green-600
        hover:bg-green-700
        text-white
        px-6
        py-3
        rounded-2xl
        font-semibold
        shadow-lg
        transition-all
        duration-300
      "
    >
      Download PDF Report
    </button>

  )
}

export default DownloadButton