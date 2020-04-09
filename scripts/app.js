function init(){

  



  // ? DOM Elements
  const grid = document.querySelector('.grid')
  const cells = []
  
  // ? Grid Variables
  const width = 10
  const cellCount = width * width 
    
  // ? Functions
  function createCells() {
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }
  
  createCells()






  // * Computer ship placement

  // Horizontal (value 0) or veritcal (value 1)



  const boatLength = 4

  
  function shipLocation(){
    return Math.round(Math.random()) ? horizontalShip() : verticalShip()
  }

  function verticalShip (){
    const verticalRef = Math.floor(Math.random() * (cellCount - (width * (boatLength - 1))))
    cells[verticalRef].classList.add('ship')
    cells[verticalRef + 10].classList.add('ship')
    cells[verticalRef + 20].classList.add('ship')
    cells[verticalRef + 30].classList.add('ship')
  }


  function horizontalShip(){
    const allNums = []
    for (let i = 0 ; i < cellCount ; i++){
      allNums.push(i)
    }
    const newNums = allNums.filter(num => {
      return num % width < (width - boatLength + 1)
    })

    const horizontalRef = newNums[Math.floor(Math.random() * newNums.length)]
    cells[horizontalRef].classList.add('ship')
    cells[horizontalRef + 1].classList.add('ship')
    cells[horizontalRef + 2].classList.add('ship')
    cells[horizontalRef + 3].classList.add('ship')
  }
  



  shipLocation()



  
  
}
window.addEventListener('DOMContentLoaded', init)