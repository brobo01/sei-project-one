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

  

  const compCarrier = {
    length: 5,
    location: [],
    hit: []
  }

  const compBattleship = {
    length: 4,
    location: [],
    hit: []
  }
  const compDestroyer = {
    length: 3,
    location: [],
    hit: []
  }
  const compSubmarine = {
    length: 3,
    location: [],
    hit: []
  }
  const compPatrolboat = {
    length: 2,
    location: [],
    hit: []
  }
  const compShipOptions = [compCarrier,compBattleship,compDestroyer,compSubmarine,compPatrolboat]
  const allShipLocations = []


  const playCarrier = {
    length: 5,
    location: [31,32,33,34,35],
    hit: []
  }

  const playBattleship = {
    length: 4,
    location: [66,76,86,96],
    hit: []
  }
  const playDestroyer = {
    length: 3,
    location: [11,12,13],
    hit: []
  }
  const playSubmarine = {
    length: 3,
    location: [53,63,73],
    hit: []
  }
  const playPatrolboat = {
    length: 2,
    location: [28,38],
    hit: []
  }
  const playShipOptions = [playCarrier,playBattleship,playDestroyer,playSubmarine,playPatrolboat]
  



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
  compShipOptions.forEach(ship => {
    createShip(ship)
  })

  compShipOptions.forEach(ship => {
    ship.location.forEach(location => { 
      cells[location].classList.add('ship')
    })
    
  })
  


  playShipOptions.forEach(ship => {
    ship.location.forEach(location => { 
      playerCells[location].classList.add('ship')
    })
  })

  function playerHit (){
    playShipOptions.forEach(ship => {
      ship.hit.forEach(location => { 
        playerCells[location].classList.add('hit')
      })
    })
  }













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
  

  // ? SHOT TAKING CALCS---------------------------------------------

  // * Computer Shot Calcs
  const shotBtn = document.querySelector('.shoot')
  const fullCompShots = []
  const compShotsTaken = []
  let availableCompShots = []
  const compHits = []
  const compResults = []


  function getFullShotList () {
    for (let i = 0 ; i < cellCount ; i++){
      // fullCompShots.push(i)
      if ((((i - (i % width)) / width) % 2) === 0){
        i % 2 === 0 ? fullCompShots.push(i) : ''
      } else {
        i % 2 === 0 ? '' : fullCompShots.push(i)
      }
    }
  }


  function filterShots(){
    availableCompShots = fullCompShots.filter(shot => !compShotsTaken.includes(shot))
  }
  


  function checkHit(shot){
    playShipOptions.forEach(ship => {
      ship.location.forEach(location => {
        if (shot === location){
          ship.hit.push(shot)
        }
      })
    })
  }


  function hunter(){
    if ((compResults[compResults.length - 1]) === 'hit'){
      nextShot.push(compHits[0] - 1)
    } if ((compResults[compResults.length - 2]) === 'hit'){
      nextShot.push(compHits[0] - width)

    
    }
  }




  function chooseNextShot (){
    if (compResults[compResults.length - 1 ] === 'hit' || compResults[compResults.length - 2 ] === 'hit'){
      hunter()
    } else {
      nextShot.push(availableCompShots[Math.floor(Math.random() * availableCompShots.length)])
    }
  }
  




  const nextShot = []

  getFullShotList()

  function computerShot (){
    filterShots()
    chooseNextShot()
    const shot = nextShot[0]
    console.log(shot)
    console.log(nextShot)
    console.log(compHits)
    nextShot.pop()
    compShotsTaken.push(shot)
    filterShots()
    checkHit(shot)
    playerHit()
    if (playerCells[shot].classList.contains('ship')){
      console.log('ship hit')
      compHits.push(shot)
      compResults.push('hit')
      // playerCells[shot].classList.add('hit')
    } else {
      playerCells[shot].classList.add('miss')
      compResults.push('miss')
      console.log('ship miss')
      
    }
    
    
    
    console.log(compShotsTaken[compShotsTaken.length - 1])
    
    
    console.log(compHits)
    console.log(compResults)
  }



  shotBtn.addEventListener('click',computerShot)


  



  
  
  

  


  



























  
  
}
window.addEventListener('DOMContentLoaded', init)