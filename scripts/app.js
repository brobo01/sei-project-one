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
  const compHitLocations = []
  const allShipLocations = []
  

  const playCarrier = {
    type: 'carrier',
    length: 5,
    location: [11,12,13,14,15],
    hit: [],
    sunk: []

  }
  const playBattleship = {
    length: 4,
    location: [42,52,62,72],
    hit: [],
    sunk: []

  }
  const playDestroyer = {
    length: 3,
    location: [85,86,87],
    hit: [],
    sunk: []

  }
  const playSubmarine = {
    length: 3,
    location: [27,37,47],
    hit: [],
    sunk: []

  }
  const playPatrolboat = {
    length: 2,
    location: [56,66],
    hit: [],
    sunk: []

  }
  const playShipOptions = [playCarrier,playBattleship,playDestroyer,playSubmarine,playPatrolboat]
  const playHitLocations = []
  let allPlayShipLocations = []


  function allPlayShipLocate (){
    playShipOptions.forEach(ship => {
      ship.location.forEach(location => {
        allPlayShipLocations.push(location)
      })
    })
  }


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


  function createPlayShips(){
    // playShipOptions.forEach(ship => {
    //   createShip(ship)
    // })
    formatPlayShips()
  }
  
  function removePlayShips(){  
    playShipOptions.forEach(ship => {
      ship.location.forEach(location => { 
        playerCells[location].classList.remove('ship')
      })
    })
  }
  function formatPlayShips (){
    playShipOptions.forEach(ship => {
      ship.location.forEach(location => { 
        playerCells[location].classList.add('ship')
      })
    }) 
  }
  
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
      if (ship.location.length === ship.hit.length){
        ship.hit.forEach(location => {          
          compCells[location].classList.add('sunk')
          
        })
        ship.sunk = true
      }
    })
  }

  // ? GAME WIN CALCS---------------------------------------------

  let compSunkShips = []

  function checkPlayWin(){
    compSunkShips = []
    compShipOptions.forEach(ship => {
      compSunkShips.push(ship.sunk)
    })
    if (compSunkShips.every(ship =>{
      return ship === true
    }
    )){
      console.log('You have won')
    }
  }
  

  let playSunkShips = []

  function checkCompWin(){
    playSunkShips = []
    playShipOptions.forEach(ship => {
      playSunkShips.push(ship.sunk)
    })
    console.log(playSunkShips)
    if (playSunkShips.every(ship =>{
      return ship === true
    }
    )){
      console.log(playSunkShips)
      console.log('Computer has won')
    }









  }


  // ? SHOT TAKING CALCS---------------------------------------------

  // * Computer Shot Calcs
  const shotBtn = document.querySelector('.shoot')
  const fullCompShots = []
  const compShotsTaken = []
  const compHits = []
  const compResults = []
  let availableCompShots = []

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


  function filterCompShots(){
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

  function checkCompHit(shot){
    compShipOptions.forEach(ship => {
      ship.location.forEach(location => {
        if (location === shot){
          ship.hit.push(shot)
        }
      })
    })
  }






  function getShipType(shot){
    playShipOptions.forEach(ship => {
      if (ship.location.includes(shot)){
        console.log(ship.type)
      }
    }
    
    )
  }

  let hunterRef = 0
  const targetShip = []


  function hunterOne (){
    nextShot.push(targetShip[0] - 1)
    nextShot.push(targetShip[0] - width)
    nextShot.push(targetShip[0] + width)
    nextShot.push(targetShip[0] + 1)

  }
  

  function hunterTwo (){
    nextShot = []
    if (targetShip[1] - targetShip[0] === 1){
      nextShot.push(targetShip[1] + (targetShip[1] - targetShip[0]))
    }
    if (targetShip[1] - targetShip[0] === -1){
      nextShot.push(targetShip[1] + (targetShip[1] - targetShip[0]))
    }
    if (targetShip[1] - targetShip[0] === 10){
      nextShot.push(targetShip[1] + (targetShip[1] - targetShip[0]))
    }
    if (targetShip[1] - targetShip[0] === -10){
      console.log('getting there')
      nextShot.push(targetShip[1] + (targetShip[1] - targetShip[0]))        
    } else {
      console.log('damn')
    }
  }

  function hunterThree (){
    nextShot = []
    if (targetShip[1] - targetShip[0] === 1){
      nextShot.push(targetShip[2] + (targetShip[1] - targetShip[0]))
    }
    if (targetShip[1] - targetShip[0] === -1){
      nextShot.push(targetShip[2] + (targetShip[1] - targetShip[0]))
    }
    if (targetShip[1] - targetShip[0] === 10){
      nextShot.push(targetShip[2] + (targetShip[1] - targetShip[0]))
    }
    if (targetShip[1] - targetShip[0] === -10){
      nextShot.push(targetShip[2] + (targetShip[1] - targetShip[0]))    
    } else {
      console.log('damn')
    }
  }

  function hunterFour (){
    nextShot = []
    if (targetShip[1] - targetShip[0] === 1){
      nextShot.push(targetShip[3] + (targetShip[1] - targetShip[0]))
    }
    if (targetShip[1] - targetShip[0] === -1){
      nextShot.push(targetShip[3] + (targetShip[1] - targetShip[0]))
    }
    if (targetShip[1] - targetShip[0] === 10){
      nextShot.push(targetShip[3] + (targetShip[1] - targetShip[0]))
    }
    if (targetShip[1] - targetShip[0] === -10){
      nextShot.push(targetShip[3] - (targetShip[1] - targetShip[0]))    
    } else {
      console.log('damn')
    }
  }










  // function hunterCheckSunk(){
  //   if (targetShip[0].sunk){
  //     console.log('got him')
  //     hunterRef = []
  //     chooseNextShot()
  //   }
  // }
  





  



  function chooseNextShot (){
    console.log(hunterRef)
    if (hunterRef === 1){
      hunterOne()
    }
    if (hunterRef === 2){
      hunterTwo()
    }
    if (hunterRef === 3){
      hunterThree()
    }
    if (hunterRef === 4){
      hunterFour()
      
    } else {
      console.log('whhhhy')
      nextShot.push(availableCompShots[Math.floor(Math.random() * availableCompShots.length)])
    }
  }
  
  
  
  
  // ,12,13,14,15,27,37,47,56,66,42,52,62,72,85,86,32,33,34,87,10
  
  let nextShot = [15]
  
  getFullShotList()
  
  function computerShot (){
    console.log(nextShot)
    filterCompShots()
    const shot = nextShot[0]
    nextShot.splice(0,1)
    
    compShotsTaken.push(shot)
    filterCompShots()
    checkHit(shot)
    playerHit()
    if (playerCells[shot].classList.contains('ship')){
      console.log('ship hit')
      compHits.push(shot)
      compResults.push('hit')
      playHitLocations.push(shot)
      getShipType(shot)
      hunterRef += 1
      console.log(compHits)
      targetShip.push(shot)
    } else {
      playerCells[shot].classList.add('miss')
      compResults.push('miss')
      console.log('ship miss')
      
    }
    chooseNextShot()

    checkPlaySunk()
    checkCompWin()

  }

  shotBtn.addEventListener('click',computerShot)


  

  // ? PLAYER SHOT ----------------------------------------------------

  // * Function

  const fullPlayShots = []

  function playerShot(){ 
    let shot = parseInt(event.target.innerHTML)
    if (fullPlayShots.includes(shot)){
      alert('captain, it may be the rum but we already fired there')
      shot = []
    } else {
      checkCompHit(shot)
      compHit()
      console.log(compCells[shot])
      if (compCells[shot].classList.contains('ship')){
        compHitLocations.push(shot)
        console.log('ship hit')
      } else {
        event.target.classList.add('miss')
        console.log('ship miss')
      }
      checkCompSunk()
      computerShot()
      checkPlayWin()
      fullPlayShots.push(shot)
    }
  }
    

  // ? GAME LOOP ----------------------------------------------------

  const startBtn = document.querySelector('.start-btn')

  
  // Make this disappear after it has been clicked
  function startGame (){
    createCompShips()
    createPlayShips()
    allPlayShipLocate()
    compCells.forEach(cell => cell.addEventListener('click',playerShot))
  }
  startBtn.addEventListener('click',startGame)
  

  //* POWER BUTTON FUCTIONALITY---------------------------------


    
  const startTimerBtn = document.querySelector('.start-timer-btn')




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



  //* PLAYER SHIP MOVEMENT FUNCTION BEFORE BATTLE---------------------------------
  let shipToBeMoved = ''


  // ? MOVE PLAYER SHIP RIGHT FUNCTION--------------------------------------------

  const moveRightBtn = document.querySelector('#move-right-btn')

  function moveShipRight(){ 
    const tempShip = shipToBeMoved.location.map(location => {
      return location += 1
    })
    const tempPlayShipLocations = allPlayShipLocations.filter(location => {
      return !shipToBeMoved.location.includes(location)
    })
    if (tempPlayShipLocations.some(num => {
      return tempShip.includes(num)
    })){
      window.alert('there is s a ship there dumb dumb')
    } else { 
      if (shipToBeMoved.location[shipToBeMoved.location.length - 1] % width < width - 1){   
        approvedNewShipLocationProcess(tempShip)
      }
    }
  }

  moveRightBtn.addEventListener('click',moveShipRight)



  // ? MOVE PLAYER SHIP LEFT FUNCTION-------------------------------------------

  const moveLeftBtn = document.querySelector('#move-left-btn')

  function moveShipLeft(){ 
    const tempShip = shipToBeMoved.location.map(location => {
      return location -= 1
    })
    const tempPlayShipLocations = allPlayShipLocations.filter(location => {
      return !shipToBeMoved.location.includes(location)
    })
    if (tempPlayShipLocations.some(num => {
      return tempShip.includes(num)
      
    })){
      window.alert('there is s a ship there dumb dumb')
    } else { 
      if (shipToBeMoved.location[0] % width > 0){   
        approvedNewShipLocationProcess(tempShip)
      }
    }
  }

  moveLeftBtn.addEventListener('click',moveShipLeft)


  // ? MOVE PLAYER SHIP UP FUNCTION-------------------------------------------

  const moveUpBtn = document.querySelector('#move-up-btn')

  function moveShipUp(){ 
    const tempShip = shipToBeMoved.location.map(location => {
      return location -= width
    })
    const tempPlayShipLocations = allPlayShipLocations.filter(location => {
      return !shipToBeMoved.location.includes(location)
    })
    if (tempPlayShipLocations.some(num => {
      return tempShip.includes(num)
      
    })){
      window.alert('there is a ship there dumb dumb')
    } else { 
      if (shipToBeMoved.location[0] > width - 1){   
        approvedNewShipLocationProcess(tempShip)
      } 
    }
  }

  moveUpBtn.addEventListener('click',moveShipUp)



  // ? MOVE PLAYER SHIP DOWN FUNCTION-------------------------------------------

  const moveDownBtn = document.querySelector('#move-down-btn')

  function moveShipDown(){ 
    console.log(shipToBeMoved)
    const tempShip = shipToBeMoved.location.map(location => {
      return location += width
    })
    const tempPlayShipLocations = allPlayShipLocations.filter(location => {
      return !shipToBeMoved.location.includes(location)
    })
    if (tempPlayShipLocations.some(num => {
      return tempShip.includes(num)
    
    })){
      window.alert('there is a ship there dumb dumb')
    } else { 
      if (shipToBeMoved.location[shipToBeMoved.location.length - 1] < cellCount - width){   
        approvedNewShipLocationProcess(tempShip)
      }
    }
  }

  moveDownBtn.addEventListener('click',moveShipDown)



  // ? ROTATE PLAYER SHIP DOWN FUNCTION-------------------------------------------

  const rotateBtn = document.querySelector('#rotate-btn')

  function rotateShip(){ 
    let shipRef = shipToBeMoved.location[0]
    let tempShip = []
    if (shipToBeMoved.location[1] - shipToBeMoved.location[0] === 1){
      shipToBeMoved.location.forEach(() =>{
        return tempShip.push((shipRef += 10) - 10)
      })

      const tempPlayShipLocations = allPlayShipLocations.filter(location => {
        return !shipToBeMoved.location.includes(location)
      })
      if (tempPlayShipLocations.some(num => {
        return tempShip.includes(num)
      })){
        window.alert('there is a ship there dumb dumb')
      } else { 
        if (tempShip[tempShip.length - 1] < cellCount - 1) {   
          approvedNewShipLocationProcess(tempShip)
          tempShip = []
        }
      }


    } else {
      shipToBeMoved.location.forEach(() =>{
        return tempShip.push((shipRef += 1) - 1)
      })
    
      const tempPlayShipLocations = allPlayShipLocations.filter(location => {
        return !shipToBeMoved.location.includes(location)
      })
      if (tempPlayShipLocations.some(num => {
        return tempShip.includes(num)
      })){
        window.alert('there is a ship there dumb dumb')
      } else { 
        if (tempShip[0] % width < width - 2){   
          approvedNewShipLocationProcess(tempShip)
          tempShip = []
        }
      }
    }
  }

  rotateBtn.addEventListener('click',rotateShip)


  // ? CONFIRM LOCATIONS BUTTON-------------------------------------------

  const confirmBtn = document.querySelector('#confirm-btn')

  function confirmLocations(){ 
    shipToBeMoved = ''
    playShipOptions.forEach(ship => 
      ship.location.forEach(location =>
        console.log((location)  
        )
      ))
  }

  confirmBtn.addEventListener('click',confirmLocations)


  // ? ADDITIONAL MOVE SHIP FUNCTION

  function approvedNewShipLocationProcess(tempShip){
    removePlayShips()
    shipToBeMoved.location = []
    tempShip.forEach(location => {
      shipToBeMoved.location.push(location)
    })
    formatPlayShips()
    allPlayShipLocations = []
    allPlayShipLocate()
  }















  // ? SHIP SELECT TO MOVE FUNCTIONS-----------------------------------------------------

  const shipSelectBtns = document.querySelectorAll('.ship-selector')
  
  function shipSelected (){
    shipToBeMoved = playShipOptions[event.target.value]
  }
  
  shipSelectBtns.forEach(ship => {
    ship.addEventListener('click',shipSelected)
  })




  
  
}
window.addEventListener('DOMContentLoaded', init)