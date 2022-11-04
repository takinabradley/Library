export default function createElement(type, classArray, attrObj) {
  const element = document.createElement(type)
  element.classList.add(...classArray)

  for (const attr in attrObj) {
    element.setAttribute(attr, attrObj[attr])
  }

  return element
}