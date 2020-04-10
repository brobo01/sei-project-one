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



  const carrier = {
    length: 8,
    location: [],
    hit: []
  }




  function createCarrier (ship){

    if (Math.round(Math.random()) > 0){
      const shipRef = horizontalShip(ship.length)
      for (let i = 0; i < ship.length; i++){
        carrier.location.push(shipRef + i)
      }
    } else {
      let shipRef = verticalShip(ship.length)
      for (let i = 0; i < ship.length; i++){
        ship.location.push(shipRef += 10)
      }
    }

    console.log(carrier.location)

    carrier.location.forEach(location => {
      cells[location].classList.add('ship')
    })
  

  }


  
  
  createCarrier(carrier)

















  // * Computer ship placement




  
  function shipRef(){
    return Math.round(Math.random()) ? horizontalShip() : verticalShip()
  }

  function verticalShip (a){
    return Math.floor(Math.random() * (cellCount - (width * (a))))

  }


  function horizontalShip(a){
    const allNums = []
    for (let i = 0 ; i < cellCount ; i++){
      allNums.push(i)
    }
    const newNums = allNums.filter(num => {
      return num % width < (width - a + 1)
    })

    return newNums[Math.floor(Math.random() * newNums.length)]

  }
  



  // fourShips()



  
  
}
window.addEventListener('DOMContentLoaded', init)