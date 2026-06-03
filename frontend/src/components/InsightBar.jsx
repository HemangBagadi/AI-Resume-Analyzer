const InsightBar = ({
  title,
  value,
  color,
}) => {
  return (
    <div className="space-y-2">

      <div className="flex justify-between">

        <h3 className="font-semibold text-slate-700">
          {title}
        </h3>

        <span className="font-bold">
          {value}%
        </span>

      </div>

      <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">

        <div
          className={`h-4 rounded-full transition-all duration-1000 ${color}`}
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  )
}

export default InsightBar