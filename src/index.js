import ScreenController from './ScreenController'

const formElem = document.querySelector('form')
const libraryElem = document.querySelector('.library')

//render using the above elements
ScreenController.init(formElem, libraryElem)