const steps = 20
const data = [...Array(10000).keys()]
const total = data.length
function renderSmall() { 
  let fragment = document.createDocumentFragment()
  for (i in steps) { 
    li = document.createElement('li')
    li.innerText = ''
  }
}