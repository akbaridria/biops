import { Speed } from "./Icons"

export const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <Speed customClass="w-6 h-6 fill-primary" />
      <div className="text-xl font-semibold">Biops</div>
    </div>
  )
}