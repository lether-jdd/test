const steps = 20
const data = [...Array(10000).keys()]
const total = data.length
function renderSmall() { 
  let fragment = document.createDocumentFragment()
  for (i = 0; i < steps;i++) { 
    li = document.createElement('li')
    li.innerText = `li${i}`
    fragment.appendChild(li)
    console.log(i)
  }
}
let loopCount = Match.ceil(total / steps)
let hasLoop = 0
function loop() {
  renderSmall()
  if (hasLoop < loopCount) { 
    window.requestAminationFrame(loop)
  }
}
loop()