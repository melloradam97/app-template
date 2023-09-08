import { useParam } from "@blitzjs/next"
import { useRouter } from "next/router"

export const useStringParam = (param: string) => useParam(param, "string")

export const useStringQueryParam = (param: string) => {
  const { query } = useRouter()
  return query[param]
}
