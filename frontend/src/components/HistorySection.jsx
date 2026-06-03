import { useEffect, useState } from "react"
import axios from "axios"
import { History, FileText } from "lucide-react"

const HistorySection = () => {

  const [reports, setReports] =
    useState([])

  const fetchReports = async () => {

    try {

      const username =
        localStorage.getItem(
          "username"
        )

      const response =
        await axios.get(
          `http://127.0.0.1:8000/reports/${username}`
        )

      setReports(
        response.data.reports
      )

    } catch (error) {

      console.log(error)
    }
  }

  useEffect(() => {

    fetchReports()

  }, [])

  return (

    <div
      className="
        bg-white
        rounded-3xl
        shadow-2xl
        p-8
      "
    >

      <div
        className="
          flex
          items-center
          gap-3
          mb-8
        "
      >

        <History
          size={30}
          className="text-blue-600"
        />

        <h2
          className="
            text-3xl
            font-bold
          "
        >
          Analysis History
        </h2>

      </div>

      {

        reports.length === 0

          ? (

            <div
              className="
                text-center
                py-10
              "
            >

              <p
                className="
                  text-slate-500
                  text-lg
                "
              >
                No saved reports yet.
              </p>

            </div>

          )

          : (

            <div
              className="
                grid
                md:grid-cols-2
                gap-5
              "
            >

              {

                reports.map(
                  (
                    report,
                    index
                  ) => (

                    <div
                      key={index}
                      className="
                        bg-gradient-to-r
                        from-slate-50
                        to-blue-50
                        border
                        rounded-3xl
                        p-4
                        hover:shadow-xl
                        hover:scale-[1.02]
                        transition-all
                        duration-300
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                          mb-4
                        "
                      >

                        <FileText
                          className="
                            text-blue-600
                          "
                        />

                        <span
                          className="
                            font-bold
                            text-lg
                          "
                        >
                          Resume Analysis
                        </span>

                      </div>

                      <div
                        className="
                          inline-block
                          bg-green-100
                          text-green-700
                          px-4
                          py-2
                          rounded-xl
                          font-semibold
                          mb-4
                        "
                      >

                        ATS Score:
                        {" "}
                        {report.match_score}%

                      </div>

                      <p
                        className="
                          text-slate-600
                          leading-7
                        "
                      >

                        {

                          report.summary
                            ?.slice(0, 100)

                        }

                        ...

                      </p>

                    </div>

                  )
                )

              }

            </div>

          )

      }

    </div>

  )
}

export default HistorySection