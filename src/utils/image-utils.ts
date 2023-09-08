export const getUploadthingUrl = (filekey?: string | null) => {
  return filekey ? `https://uploadthing.com/f/${filekey}` : ""
}

export const getAvatarFallbackName = (name?: string | null) => {
  if (!name) return ""
  const [first, second] = name.split(" ")
  return `${first ? first[0] : ""}${second ? second[0] : ""}`
}
