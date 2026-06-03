const ScoreCircle = ({ score }) => {

  const radius = 70

  const strokeWidth = 10

  const normalizedRadius =
    radius - strokeWidth / 2

  const circumference =
    normalizedRadius * 2 * Math.PI

  const strokeDashoffset =
    circumference -
    (score / 100) * circumference

  return (

  <div
    className="
      flex
      flex-col
      items-center
    "
  >

    <svg
      height={radius * 2}
      width={radius * 2}
    >

      {/* Background Circle */}

      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />

      {/* Progress Circle */}

      <circle
        stroke={
          score >= 80
            ? "#22c55e"
            : score >= 60
            ? "#f59e0b"
            : "#ef4444"
        }
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{
          transition:
            "stroke-dashoffset 1s ease",
          transform:
            "rotate(-90deg)",
          transformOrigin:
            "50% 50%",
        }}
      />

      {/* Score Text */}

      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
fill={
  score >= 80
    ? "#22c55e"
    : score >= 60
    ? "#f59e0b"
    : "#ef4444"
}
fontSize="20"
fontWeight="bold"      >
        {score}%
      </text>

    </svg>

    <p
      className="
        mt-4
        text-lg
        font-semibold
      "
    >
      {
        score >= 80
          ? "Excellent Match"
          : score >= 60
          ? "Good Match"
          : "Needs Improvement"
      }
    </p>

  </div>

)
}

export default ScoreCircle