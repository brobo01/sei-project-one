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
    length: 5,
    location: [],
    hit: []
  }

  const battleship = {
    length: 4,
    location: [],
    hit: []
  }
  const destroyer = {
    length: 3,
    location: [],
    hit: []
  }
  const submarine = {
    length: 3,
    location: [],
    hit: []
  }
  const patrolboat = {
    length: 2,
    location: [],
    hit: []
  }



  const allNums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

  const checkNums = [21,24,79]
  let numberChecked = []

  function numCheck (){ 
    numberChecked = allNums.some(num => {
      return checkNums.includes(num)
    })
  }

  // numCheck()
  // console.log(numberChecked)

  // console.log(someAreNums)
  const allShipLocations = []



  function createShip (ship){

    return (Math.round(Math.random()) > 0) ? createHorizontalShip(ship) : createVerticalShip(ship)
      
    
    function createHorizontalShip (ship){
      const shipRef = horizontalShip(ship.length)
      let tempShip = []
      for (let i = 0; i < ship.length; i++){
        tempShip.push(shipRef + i)
      }
      if (allShipLocations.some(num => {
        return tempShip.includes(num)
      })) {
        tempShip = []
        createHorizontalShip(ship)
      } else {
        tempShip.forEach(location => {
          ship.location.push(location)
          allShipLocations.push(location)
        })
      }
    } 



    function createVerticalShip (ship) {
      let shipRef = verticalShip(ship.length)
      let tempShip = []
      for (let i = 0; i < ship.length; i++){
        tempShip.push(shipRef += 10)
      }
      if (allShipLocations.some(num => {
        return tempShip.includes(num)
        
      })){
        tempShip = []
        createVerticalShip(ship)
      } else {
        tempShip.forEach(location => {
          ship.location.push(location)
          allShipLocations.push(location)
        })
      }
    }
  }
  
  // console.log(ship.location)

 

  // }
  
  // const allCompShips = carrier.location.concat(battleship.location,destroyer.location,submarine.location,patrolboat.location)

  
  
  createShip(carrier)
  // console.log(allCompShips)
  // console.log(carrier.location)
  console.log(allShipLocations)
  
  createShip(battleship)
  // console.log(allCompShips)
  // console.log(battleship.location)
  console.log(allShipLocations)
  
  createShip(destroyer)
  // console.log(allCompShips)
  // console.log(destroyer.location)
  console.log(allShipLocations)
  
  createShip(submarine)
  // console.log(allCompShips)
  // console.log(submarine.location)
  console.log(allShipLocations)
  
  createShip(patrolboat)
  // console.log(allCompShips)
  // console.log(patrolboat.location)
  console.log(allShipLocations)
  

  
  
  carrier.location.forEach(location => {
    cells[location].classList.add('ship')
  })

  // carrier.location[0].classList.add('ship-end')
  
  battleship.location.forEach(location => {
    cells[location].classList.add('ship')
  })
  
  destroyer.location.forEach(location => {
    cells[location].classList.add('ship')
  })
  
  submarine.location.forEach(location => {
    cells[location].classList.add('ship')
  })
  
  patrolboat.location.forEach(location => {
    cells[location].classList.add('ship')
  })
  


















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