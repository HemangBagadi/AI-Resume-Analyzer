import { BrainCircuit, LogOut } from "lucide-react"

const Header = ({
  onOpenAuth,
}) => {

  const username =
    localStorage.getItem(
      "username"
    )

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    )

    localStorage.removeItem(
      "username"
    )

    window.location.reload()
  }

  return (

    <header
      className="
        bg-gradient-to-r
        from-slate-900
        via-blue-900
        to-slate-900
        text-white
        shadow-xl
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-8
          flex
          items-center
          justify-between
        "
      >

        <div className="flex items-center gap-4">

          <div
            className="
              bg-blue-500
              p-3
              rounded-2xl
            "
          >

            <BrainCircuit size={32} />

          </div>

          <div>

            <h1
              className="
                text-4xl
                font-bold
              "
            >
              AI Resume Analyzer
            </h1>

            <p
              className="
                text-slate-300
                mt-2
              "
            >
              Smart ATS Resume Intelligence Platform
            </p>

          </div>

        </div>

        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          {username ? (

            <>

              <div
                className="
                  bg-slate-800
                  px-4
                  py-2
                  rounded-xl
                "
              >
                👤 {username}
              </div>

              <button
                onClick={handleLogout}
                className="
                  flex
                  items-center
                  gap-2
                  bg-red-600
                  hover:bg-red-700
                  px-4
                  py-2
                  rounded-xl
                  transition-all
                "
              >

                <LogOut size={18} />

                Logout

              </button>

            </>

          ) : (

            <button
              onClick={onOpenAuth}
              className="
                bg-blue-600
                hover:bg-blue-700
                px-5
                py-3
                rounded-xl
                font-semibold
                transition-all
              "
            >
              👤 Login / Signup
            </button>

          )}

        </div>

      </div>

    </header>

  )
}

export default Header