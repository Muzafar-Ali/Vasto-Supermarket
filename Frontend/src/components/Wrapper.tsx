import { ReactNode } from "react"

const Wrapper = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <div className={`w-full max-w-[1280px] mx-auto px-5 ${className || ""}`}>
      { children }
    </div>
  )
}

export default Wrapper

