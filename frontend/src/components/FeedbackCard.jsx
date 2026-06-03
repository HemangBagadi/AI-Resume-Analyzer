import {
  CheckCircle,
  AlertTriangle,
  Lightbulb,
} from "lucide-react"

const FeedbackCard = ({
  title,
  items,
  type,
}) => {

  const getIcon = () => {

    if (type === "strength") {

      return (
        <CheckCircle
          className="text-green-500"
        />
      )
    }

    if (type === "weakness") {

      return (
        <AlertTriangle
          className="text-red-500"
        />
      )
    }

    return (
      <Lightbulb
        className="text-blue-500"
      />
    )
  }

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

      <div
        className="
          flex
          items-center
          gap-3
          mb-6
        "
      >

        {getIcon()}

        <h2
  className="
    text-2xl
    font-bold
    text-black
  "
>
          {title}
        </h2>

      </div>

      <div className="space-y-4">

        {items?.map(
          (item, index) => (

            <div
              key={index}
              className="
                p-4
                rounded-2xl
                bg-slate-50
                border
              "
            >

              <p
                className="
                  text-slate-700
                  leading-7
                "
              >
                {item}
              </p>

            </div>

          )
        )}

      </div>

    </div>
  )
}

export default FeedbackCard