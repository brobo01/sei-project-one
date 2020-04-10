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


  // ? DOM Elements
  const playerGrid = document.querySelector('.player-grid')
  const playerCells = []

  
  // ? Functions
  function createPlayerCells() {
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.textContent = i
      playerGrid.appendChild(cell)
      playerCells.push(cell)
    }
  }

  createPlayerCells()

  

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
  const shipOptions = [carrier,battleship,destroyer,submarine,patrolboat]
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
  shipOptions.forEach(ship => {
    createShip(ship)
  })

  shipOptions.forEach(ship => {
    ship.location.forEach(location => {
      cells[location].classList.add('ship')
    })
  })
  



















  // * Computer ship placement


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
  



  // * Computer Shot Calcs
  const shotBtn = document.querySelector('.shoot')
  const fullCompShots = []
  const compShotsTaken = []
  let availableCompShots = []


  function getFullShotList () {
    for (let i = 0 ; i < cellCount ; i++){
      fullCompShots.push(i)
    }
  }

  function filterShots(){
    availableCompShots = fullCompShots.filter(shot => !compShotsTaken.includes(shot))
  }
  
  getFullShotList()
  function computerShot (){
    filterShots()
    const shot = availableCompShots[Math.floor(Math.random() * availableCompShots.length)]
    compShotsTaken.push(shot)
    filterShots()





    
    if (playerCells[shot].classList.contains('ship')){
      console.log('ship hit')
      playerCells[shot].classList.add('hit')
    } else {
      playerCells[shot].classList.add('miss')
      console.log('ship miss')
    }
  }

  shotBtn.addEventListener('click',computerShot)


  


  // console.log(compShotsTaken)
  // console.log(fullCompShots)

  // console.log(availableCompShots)

  
  
  
  
  
  
  
  
  playerCells[27].classList.add('ship')
  playerCells[37].classList.add('ship')
  playerCells[47].classList.add('ship')
  playerCells[57].classList.add('ship')
  
  
  
  
  
  
  playerCells[33].classList.add('ship')
  playerCells[34].classList.add('ship')
  playerCells[35].classList.add('ship')
  playerCells[32].classList.add('ship')



  // if (playerCells[shot].classList.contains('ship')){
  //   console.log('ship hit')
  //   playerCells[shot].classList.add('hit')
  // } else {
  //   console.log('ship miss')
  


  



  
  
}
window.addEventListener('DOMContentLoaded', init)