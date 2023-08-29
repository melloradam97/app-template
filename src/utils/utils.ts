import { useParam } from "@blitzjs/next"

export const useStringParam = (param: string) => useParam(param, "string")
