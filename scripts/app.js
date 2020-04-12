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
  

  function createCompShips(){
    compShipOptions.forEach(ship => {
      createShip(ship)
    })
  
  

    // ? ADD SHIP FORMATTING TO BOTH COMP AND PLAYER SHIPS -----------------
    compShipOptions.forEach(ship => {
      ship.location.forEach(location => { 
        compCells[location].classList.add('ship')
      })
    
    })
  }
  playShipOptions.forEach(ship => {
    ship.location.forEach(location => { 
      playerCells[location].classList.add('ship')
    })
  }) 
  
  
  
  // ? ADD HIT FORMATTING TO BOTH COMP AND PLAYER SHIPS -----------------

  function playerHit (){
    playShipOptions.forEach(ship => {
      ship.hit.forEach(location => { 
        playerCells[location].classList.add('hit')
      })
    })
  }

  function compHit (){
    compShipOptions.forEach(ship => {
      ship.hit.forEach(location => { 
        compCells[location].classList.add('hit')
      })
    })
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
      console.log(ship.location.length)
      if (ship.location.length === ship.hit.length){
        ship.sunk = true
        ship.hit.forEach(location => {
          console.log('help')
          
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
    const availableCompShots = fullCompShots.filter(shot => !compShotsTaken.includes(shot))
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

  function checkCompHit(shot){
    compShipOptions.forEach(ship => {
      ship.location.forEach(location => {
        if (location === shot){
          ship.hit.push(shot)
        }
      })
    })
  }


  



  function chooseNextShot (){
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

    checkPlaySunk()

  }

  shotBtn.addEventListener('click',computerShot)


  

  // ? PLAYER SHOT ----------------------------------------------------

  // * Function

  function playerShot(){
    const shot = parseInt(event.target.innerHTML)
    checkCompHit(shot)
    compHit()
    if (compCells[shot].classList.contains('ship')){
      console.log('ship hit')
    } else {
      event.target.classList.add('miss')
      console.log('ship miss')
    }
    checkCompSunk()
    computerShot()
  }
  console
  
  // * Event
  
  compCells.forEach(cell => cell.addEventListener('click',playerShot))

  // ? GAME LOOP ----------------------------------------------------

  const startBtn = document.querySelector('.start-btn')

  
  // Make this disappear after it has been clicked
  function startGame (){
    createCompShips()
    playerShot()
  }
  startBtn.addEventListener('click',startGame)
  

  
  const powerBtn = document.querySelector('.power-btn')
  const startTimerBtn = document.querySelector('.start-timer-btn')
  const stopTimerBtn = document.querySelector('.stop-timer-btn')




  startTimerBtn.addEventListener('mousedown',start)
  startTimerBtn.addEventListener('mouseup',stop)
  
  let startTime = []
  let endTime = []
  let timeTaken = []


  function start(){
    startTime = new Date()
  }

  function stop(){
    endTime = new Date()
    timeTaken = endTime - startTime
    console.log(timeTaken)
    if (timeTaken > 1500 && timeTaken < 2500){
      console.log('fuckin bring it on')
    } else {
      console.log('close')
    }
  }

  console.log(timeTaken)

















  
  
}
window.addEventListener('DOMContentLoaded', init)