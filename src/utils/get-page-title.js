

export default function getPageTitle(key, fullName) {
  const realTitle = '我的网'
  const hasKey = `${key}`
  if (hasKey) {
    const pageName = `${key}`
    return `${pageName} - ${realTitle}`
  }
  return fullName ? `${fullName} - ${realTitle}` : realTitle
}
