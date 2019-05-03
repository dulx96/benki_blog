const getHeaderChilds = (childrens, headings) =>
  childrens
    .filter(c => {
      if (['h1', 'h2', 'h3', 'h4', 'h5'].includes(c.tagName)) {
        return true
      } else return false
    })
    .map((c, index) => ({
      tagName: c.tagName,
      id: c.properties.id,
      text: headings[index].value,
    }))
const filterHeading = (headerChilds, fromHeading, toHeading) => {
  const headingArray = Array.from({ length: (toHeading - fromHeading + 1) }, (_, i) => 'h' + (fromHeading + i))
  return headerChilds.filter(h => headingArray.includes(h.tagName))
}

const getHeaderChildsFiltered = (childrens, headings, fromHeading, toHeading) => {
  let headerChilds = getHeaderChilds(childrens, headings)
  return filterHeading(headerChilds, fromHeading, toHeading)
}
const getMaxHeading = (headerChilds) => {
  const h1 = headerChilds.find((h) => h.tagName === 'h1')
  const h2 = headerChilds.find((h) => h.tagName === 'h2')
  const h3 = headerChilds.find((h) => h.tagName === 'h3')
  const h4 = headerChilds.find((h) => h.tagName === 'h4')
  return h1 ? 1 : h2 ? 2 : h3 ? 3 : h4 ? 4 : 5

}
const genClassLevelByHeading = (tagName, maxHeading) => {
  let level
  switch (tagName) {
    case 'h1':
      level = 1
      break
    case 'h2':
      level = 2
      break
    case 'h3':
      level = 3
      break
    case 'h4':
      level = 4
      break
    case 'h5':
      level = 5
      break
    default:
      level = 1
  }
  level = level + 1 - maxHeading
  return 'level-' + level

}
export { filterHeading, genClassLevelByHeading, getHeaderChilds, getMaxHeading, getHeaderChildsFiltered }
