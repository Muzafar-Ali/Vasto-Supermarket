import { ReactNode } from "react"

const Wrapper = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <section className={`w-full max-w-[1280px] mx-auto px-5 ${className || ""}`}>
      { children }
    </section>
  )
}

export default Wrapper

