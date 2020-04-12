function init(){

  



  // ? DOM Elements
  const grid = document.querySelector('.grid')
  const compCells = []
  
  // ? Grid Variables
  const width = 10
  const cellCount = width * width 
    
  // ? Functions
  function createCompCells() {
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      compCells.push(cell)
    }
  }
  
  createCompCells()


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
    hit: [],
    sunk: []
  }

  const compBattleship = {
    length: 4,
    location: [],
    hit: [],
    sunk: []
  }
  const compDestroyer = {
    length: 3,
    location: [],
    hit: [],
    sunk: []
  }
  const compSubmarine = {
    length: 3,
    location: [],
    hit: [],
    sunk: []
  }
  const compPatrolboat = {
    length: 2,
    location: [],
    hit: [],
    sunk: []
  }
  const compShipOptions = [compCarrier,compBattleship,compDestroyer,compSubmarine,compPatrolboat]
  const allShipLocations = []
  const compSunkShips = []



  const playCarrier = {
    length: 5,
    location: [31,32,33,34,35],
    hit: [],
    sunk: []

  }

  const playBattleship = {
    length: 4,
    location: [66,76,86,96],
    hit: [],
    sunk: []

  }
  const playDestroyer = {
    length: 3,
    location: [11,12,13],
    hit: [],
    sunk: []

  }
  const playSubmarine = {
    length: 3,
    location: [53,63,73],
    hit: [],
    sunk: []

  }
  const playPatrolboat = {
    length: 2,
    location: [28,38],
    hit: [],
    sunk: []

  }
  const playShipOptions = [playCarrier,playBattleship,playDestroyer,playSubmarine,playPatrolboat]
  const playSunkShips = []



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
      compCells[location].classList.add('ship')
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
  

  // ? SHIP SUNK CALCS---------------------------------------------

  function checkPlaySunk(){
    playShipOptions.forEach(ship => {
      if (ship.location.length === ship.hit.length){
        ship.sunk = true
        ship.hit.forEach(location => {
          playerCells[location].classList.add('sunk')
        })
      }
    })
  }

  function checkCompSunk(){
    compShipOptions.forEach(ship => {
      if (ship.location.length === ship.hit.length){
        ship.sunk = true
        ship.hit.forEach(location => {
          compCells[location].classList.add('sunk')
        })
      }
    })
  }

  // // ? GAME WIN CALCS---------------------------------------------

  // function checkPlayWin(){
  //   compShipOptions.forEach(ship => {
  //     return ship.sunk === true ? alert('Player has won') : ''
  //   })
  // }


  // function checkCompWin(){
  //   return (playBattleship.sunk === true) ? alert('Computer has won') : ''
  // }


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


  // const huntedShip = []
  // const huntedShipShots = []
  

  // function hunterOne(){
  //   if (huntedShip.length === 1 && nextShot.length < 1){
  //     nextShot.push(huntedShip[0] - 1)
  //     nextShot.push(huntedShip[0] + 1)
  //     nextShot.push(huntedShip[0] - 10)
  //     nextShot.push(huntedShip[0] + 10)
  //   }
  // }

  // function hunterTwo(){ 
  //   if (huntedShip.length === 2 && nextShot.length < 1){
  //     const direction = huntedShip[1] - huntedShip[0]
  //     nextShot.push(huntedShip[1] + direction)
  //     nextShot.push(huntedShip[1] + (direction * 2))
  //     nextShot.push(huntedShip[1] + (direction * 3))
  //   }
  // }

  



  function chooseNextShot (){
    // if (huntedShip.length === 1){
    //   hunterOne()
    // } 
    // if (huntedShip.length === 2){
    //   hunterTwo()
    // }
    // if (nextShot.length < 1) {
    nextShot.push('')
    // nextShot.push(availableCompShots[Math.floor(Math.random() * availableCompShots.length)])
  }
  // }
  




  const nextShot = [11,12,13,28,38,31,32,33,34,35,53,63,73,66,76,86,96]

  getFullShotList()

  function computerShot (){
    filterShots()
    chooseNextShot()
    const shot = nextShot[0]
    nextShot.splice(0,1)
    // console.log(shot)
    // console.log(nextShot)
    // console.log(compHits)
    console.log(playSubmarine.sunk)
    
    compShotsTaken.push(shot)
    filterShots()
    checkHit(shot)
    playerHit()
    if (playerCells[shot].classList.contains('ship')){
      console.log('ship hit')
      compHits.push(shot)
      // huntedShip.push(shot)
      compResults.push('hit')
      // playerCells[shot].classList.add('hit')
    } else {
      playerCells[shot].classList.add('miss')
      compResults.push('miss')
      console.log('ship miss')
      
    }
    checkCompSunk()
    checkPlaySunk()
    // checkPlayWin()
    // checkCompWin()

    // console.log(compShotsTaken[compShotsTaken.length - 1])
    
    // console.log(huntedShip)
    // console.log(compHits)
    // console.log(compResults)
    // console.log(compResults.length)
  }



  shotBtn.addEventListener('click',computerShot)


  

  // ? PLAYER SHOT CALCS

  // * Element




  // * Function

  function playerShot(){
    const shot = event.target
    console.log(shot)
    if (event.target.classList.contains('ship')){
      console.log('ship hit')

    } else {
      event.target.classList.add('miss')
      console.log('ship miss')
    }

  }

  // * Event
  
  compCells.forEach(cell => cell.addEventListener('click',playerShot))


  

  


  



























  
  
}
window.addEventListener('DOMContentLoaded', init)