const ATSCard = ({
  title,
  value,
  color,
}) => {

  return (

    <div
      className={`
        rounded-3xl
        p-6
        text-white
        shadow-xl
        transition-all
        duration-300
        hover:scale-105
        ${color}
      `}
    >

      <h3
        className="
          text-sm
          uppercase
          tracking-wider
          opacity-80
        "
      >
        {title}
      </h3>

      <p
        className="
          text-4xl
          font-bold
          mt-4
        "
      >
        {value}
      </p>

    </div>

  )
}

export default ATSCard