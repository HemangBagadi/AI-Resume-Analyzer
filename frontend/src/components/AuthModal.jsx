import AuthForm from "./AuthForm"

const AuthModal = ({
  isOpen,
  onClose,
  darkMode,
}) => {

  if (!isOpen) {
    return null
  }

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/60
        flex
        justify-center
        items-center
        z-50
      "
    >

      <div
        className="
          relative
          w-full
          max-w-md
        "
      >

        <button
          onClick={onClose}
          className="
  absolute
  top-4
  right-5
  text-slate-500
  text-3xl
  hover:text-red-500
  transition-all
"
        >
          ×
        </button>

        <AuthForm darkMode={darkMode} />

      </div>

    </div>

  )
}

export default AuthModal