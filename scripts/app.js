function init(){
  
  // ?GRID VARIABLES---------------------------------------------------------------
  const width = 10
  const cellCount = width * width 
  
  // ?CREATE COMP CELLS---------------------------------------------------------------
  const grid = document.querySelector('.grid')
  const compCells = []
  
  function createCompCells() {
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      compCells.push(cell)
    }
  }

  createCompCells()

  // ?CREATE PLAYER CELLS---------------------------------------------------------------
  const playerGrid = document.querySelector('.player-grid')
  const playerCells = []
  
  function createPlayerCells() {
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.textContent = i
      playerGrid.appendChild(cell)
      playerCells.push(cell)
    }
  }
  createPlayerCells()

  // ? COMP AND PLAYER SHIP LISTS--------------------------------------------------------------------

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
    sunk: false

  }
  const playBattleship = {
    type: 'battleship',
    length: 4,
    location: [32,42,52,62],
    hit: [],
    sunk: []

  }
  const playDestroyer = {
    type: 'destroyer',
    length: 3,
    location: [85,86,87],
    hit: [],
    sunk: []

  }
  const playSubmarine = {
    type: 'submarine',
    length: 3,
    location: [27,37,47],
    hit: [],
    sunk: []

  }
  const playPatrolboat = {
    type: 'patrolboat',
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

  // ? CREAT HORIZONTAL OR VERTICAL COMP SHIP


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

  // ? CREAT COMP SHIPS AND ADD FORMATTING-----------------
  
  function createCompShips(){
    compShipOptions.forEach(ship => {
      createShip(ship)
    })
    compShipOptions.forEach(ship => {
      ship.location.forEach(location => { 
        compCells[location].classList.add('ship')
      })
    })
  }
  
  // ? CREAT PLAY SHIPS AND ADD FORMATTING-----------------

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
      playerWonDelay()
      console.log('You have won')
    }
  }
  

  let playSunkShips = []

  function checkCompWin(){
    playSunkShips = []
    playShipOptions.forEach(ship => {
      playSunkShips.push(ship.sunk)
    })
    if (playSunkShips.every(ship =>{
      return ship === true
    }
    )){
      console.log(playSunkShips)
      playerLostDelay()
      console.log('Computer has won')
    }
  }


  // ? COMP SHOT TAKING CALCS---------------------------------------------

  // * Computer Shot Calcs
  const fullCompShots = []
  const compShotsTaken = []
  const compHits = []
  const compResults = []
  let availableCompShots = []

  function getFullShotList () {
    for (let i = 0 ; i < cellCount ; i++){
      fullCompShots.push(i)
      if ((((i - (i % width)) / width) % 2) === 0){
        i % 2 === 0 ? fullCompShots.push(i) : ''
      } else {
        i % 2 === 0 ? '' : fullCompShots.push(i)
      }
    }
  }
  
  function filterCompShots(){
    availableCompShots = fullCompShots.filter(shot => !compShotsTaken.includes(shot))
    // console.log(availableCompShots)
  }
  
  // ? CHECK COMP AND PLAYER HIT FUNCTIONS------------------------------------------------

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
        playHitShips.push(ship.type)
      }
    }
    )
  }

  const playHitShips = []
  let hunterRef = []
  let targetShip = []

  // * hunterOne sends the four cells around the hit cell to the next shot array, this is then cleared when there is a second hit and hunterRef is increased by one to call hunterTwo which focuses on the direction of the ship

  function hunterOne (){
    
    if (targetShip[0] < width - 1){
      nextShot.push(targetShip[0] - 1)
      nextShot.push(targetShip[0] + width)
      nextShot.push(targetShip[0] + 1)
    } if (targetShip[0] % width === 0){
      nextShot.push(targetShip[0] - width)
      nextShot.push(targetShip[0] + width)
      nextShot.push(targetShip[0] + 1)
    } if (targetShip[0] % width === width - 1){
      nextShot.push(targetShip[0] - 1)
      nextShot.push(targetShip[0] - width)
      nextShot.push(targetShip[0] + width)
    } if (targetShip[0] > cellCount - width){
      nextShot.push(targetShip[0] - 1)
      nextShot.push(targetShip[0] - width)
      nextShot.push(targetShip[0] + 1)
    } else {
      nextShot.push(targetShip[0] - 1)
      nextShot.push(targetShip[0] - width)
      nextShot.push(targetShip[0] + width)
      nextShot.push(targetShip[0] + 1)
    }
    // nextShot = []
  }
  
  function hunterTwo(){
    nextShot = []
    let hunterTwoShot = []
    if (targetShip[1] % width === 0 && (targetShip[1] - targetShip[0] === 1 || targetShip[1] - targetShip[0] === -1)){
      hunterRef.push(1)
      hunterRevOne()
    } if (targetShip[1] <= width - 1 && (targetShip[1] - targetShip[0] === 10 || targetShip[1] - targetShip[0] === -10)){
      hunterRef.push(1)
      hunterRevOne()
    } else {
  
      if (targetShip[1] - targetShip[0] === 1){
        hunterTwoShot.push(targetShip[1] + (targetShip[1] - targetShip[0]))
      } if (targetShip[1] - targetShip[0] === -1){
        hunterTwoShot.push(targetShip[1] + (targetShip[1] - targetShip[0]))
      } if (targetShip[1] - targetShip[0] === 10){
        hunterTwoShot.push(targetShip[1] + (targetShip[1] - targetShip[0]))
      } if (targetShip[1] - targetShip[0] === -10){
        hunterTwoShot.push(targetShip[1] + (targetShip[1] - targetShip[0]))        
      } 
      if (targetShip[1] === cellCount - 1){
        hunterTwoShot = targetShip[1]
      }
      if (compResults[compResults.length - 1] === 'miss' || playerCells[hunterTwoShot].classList.contains('miss')){
        hunterRef.push(1)
        hunterRevOne()
      } else {
        nextShot.push(parseInt(hunterTwoShot))
      }
    }
  }

  function hunterThree(){
    nextShot = []
    let hunterThreeShot = []

    if (targetShip[2] % width === 0 && (targetShip[1] - targetShip[0] === 1 || targetShip[1] - targetShip[0] === -1)){
      hunterRevOne()
    } if (targetShip[2] <= width - 1 && (targetShip[1] - targetShip[0] === 10 || targetShip[1] - targetShip[0] === -10)){
      hunterRevOne()
    } if (targetShip[2] === cellCount - 1){
      hunterThreeShot = targetShip[2]
      nextShot = []
    } else {
      if (targetShip[1] - targetShip[0] === 1){
        hunterThreeShot.push(targetShip[2] + (targetShip[1] - targetShip[0]))
      } if (targetShip[1] - targetShip[0] === -1){
        hunterThreeShot.push(targetShip[2] + (targetShip[1] - targetShip[0]))
      } if (targetShip[1] - targetShip[0] === 10){
        hunterThreeShot.push(targetShip[2] + (targetShip[1] - targetShip[0]))
      } if (targetShip[1] - targetShip[0] === -10){
        hunterThreeShot.push(targetShip[2] + (targetShip[1] - targetShip[0]))    
      }
      if (compResults[compResults.length - 1] === 'miss' || playerCells[hunterThreeShot].classList.contains('miss')){
        hunterRevOne()
      } else {
        nextShot.push(parseInt(hunterThreeShot))
      }
    }
  }

  function hunterFour(){
    nextShot = []
    let hunterFourShot = []
    
    if (targetShip[3] % width === 0 && (targetShip[1] - targetShip[0] === 1 || targetShip[1] - targetShip[0] === -1)){
      hunterRevOne()
    } if (targetShip[3] <= width - 1 && (targetShip[1] - targetShip[0] === 10 || targetShip[1] - targetShip[0] === -10)){
      hunterRef.push(1)
      hunterRevOne()
    } if (targetShip[3] === cellCount - 1){
      hunterFourShot = targetShip[3]
      nextShot = []
    } else {
      if (targetShip[1] - targetShip[0] === 1){
        hunterFourShot.push(targetShip[3] + (targetShip[1] - targetShip[0]))
      } if (targetShip[1] - targetShip[0] === -1){
        hunterFourShot.push(targetShip[3] + (targetShip[1] - targetShip[0]))
      } if (targetShip[1] - targetShip[0] === 10){
        hunterFourShot.push(targetShip[3] + (targetShip[1] - targetShip[0]))
      } if (targetShip[1] - targetShip[0] === -10){
        hunterFourShot.push(targetShip[3] - (targetShip[1] - targetShip[0]))    
      }
      if (compResults[compResults.length - 1] === 'miss' || playerCells[hunterFourShot].classList.contains('miss')){
        hunterRef.push(1)
        hunterRevOne()
      } else {
        nextShot.push(parseInt(hunterFourShot))
      }  
    }
  }

  // *When the hunter function either hits the edge of the map or a cell with the class missed - hunterRev is called

  function hunterRevOne() {
    console.log('hunterOneRev')
    const hunterRevOneShot = []
    nextShot = []
    if (targetShip[1] - targetShip[0] === 1){
      hunterRevOneShot.push(targetShip[0] - (targetShip[1] - targetShip[0]))
    } 
    if (targetShip[1] - targetShip[0] === -1){
      hunterRevOneShot.push(targetShip[0] - (targetShip[1] - targetShip[0]))
    }
    if (targetShip[1] - targetShip[0] === 10){
      hunterRevOneShot.push(targetShip[0] - (targetShip[1] - targetShip[0]))
    }
    if (targetShip[1] - targetShip[0] === -10){
      hunterRevOneShot.push(targetShip[0] - (targetShip[1] - targetShip[0]))    
    } else {
      console.log('damn')
    }
    nextShot.push(parseInt(hunterRevOneShot))
    hunterRef.push(1,1,1,1,1,1,1,1,1)
    console.log(hunterRef)
    console.log(hunterRevOneShot)
    console.log(nextShot)
  }
  
  function hunterRevTwo() {
    console.log('hunterTwoRev')
    console.log(nextShot)
  
    const hunterRevTwoShot = []
    nextShot = []
    if (targetShip[1] - targetShip[0] === 1){
      hunterRevTwoShot.push(targetShip[0] - (targetShip[1] - targetShip[0]) * 2)
    } if (targetShip[1] - targetShip[0] === -1){
      hunterRevTwoShot.push(targetShip[0] - (targetShip[1] - targetShip[0]) * 2)
    } if (targetShip[1] - targetShip[0] === 10){
      hunterRevTwoShot.push(targetShip[0] - (targetShip[1] - targetShip[0]) * 2)
    } if (targetShip[1] - targetShip[0] === -10){
      hunterRevTwoShot.push(targetShip[0] - (targetShip[1] - targetShip[0]) * 2)    
    } else {
      console.log('damn damn')
    }
    nextShot.push(parseInt(hunterRevTwoShot))

  }

  function hunterRevThree() {
    console.log('hunterThreeRev')
    nextShot = []
    if (targetShip[1] - targetShip[0] === 1){
      nextShot.push(targetShip[0] - (targetShip[1] - targetShip[0]) * 3)
    } if (targetShip[1] - targetShip[0] === -1){
      nextShot.push(targetShip[0] - (targetShip[1] - targetShip[0]) * 3)
    } if (targetShip[1] - targetShip[0] === 10){
      nextShot.push(targetShip[0] - (targetShip[1] - targetShip[0]) * 3)
    } if (targetShip[1] - targetShip[0] === -10){
      nextShot.push(targetShip[0] - (targetShip[1] - targetShip[0]) * 3)    
    } else {
      console.log('damn damn damn')
    }

  }

  function chooseNextShot (){
    console.log(hunterRef)
    if (hunterRef.length === 1){
      hunterOne()
    } else if (hunterRef.length === 2){
      hunterTwo()
    } else if (hunterRef.length === 3){
      hunterThree()
    } else if (hunterRef.length === 4){
      hunterFour()
    } else if (hunterRef.length === 13){
      hunterRevTwo()
    } else if (hunterRef.length === 14){
      hunterRevThree()
    }  else if (hunterRef.length === 0){
      nextShot.push(availableCompShots[Math.floor(Math.random() * availableCompShots.length)])
    }
  }
    
  let nextShot = []

  getFullShotList()
  
  function computerShot (){    
    filterCompShots()
    if (compShotsTaken.includes(nextShot[0])){
      nextShot.splice(0,1)
    }
    if (nextShot[0] < 0 || nextShot[0] === 100){
      nextShot.splice(0,1)
    }
    if (nextShot.length === 0){
      chooseNextShot()
    }
    const shot = nextShot[0]
    nextShot.splice(0,1)
    compShotsTaken.push(shot)
    checkHit(shot)
    playerHit()
    if (playerCells[shot].classList.contains('ship')){
      console.log('ship hit')
      compHits.push(shot)
      compResults.push('hit')
      playHitLocations.push(shot)
      hunterRef.push(1)
      targetShip.push(shot)
      nextShot = []
      compHitPlayer() 
    } else {
      playerCells[shot].classList.add('miss')
      compResults.push('miss')
      console.log('ship miss')
      // compMissPlayer()
    }
    getShipType(shot)
    chooseNextShot()
    filterCompShots()
    checkPlaySunk()
    checkCompWin()
    if (playerCells[shot].classList.contains('sunk')){
      hunterRef = []
      nextShot.push(availableCompShots[Math.floor(Math.random() * availableCompShots.length)])
      targetShip = []
      console.log('ship sunk')
    }
  }

  // ? PLAYER SHOT ----------------------------------------------------

  const fullPlayShots = []

  function playerShot(){ 
    let shot = parseInt(event.target.innerHTML)
    if (fullPlayShots.includes(shot)){
      alreadyShot()
      shot = []
    } else {
      checkCompHit(shot)
      compHit()
      if (compCells[shot].classList.contains('ship')){
        compHitLocations.push(shot)
        playerHitComp()
      } else {
        event.target.classList.add('miss')
      }
      checkCompSunk()
      checkPlayWin()
      fullPlayShots.push(shot)
      computerShotDelay()
    }
  }
    
  function computerShotDelay(){
    setTimeout(computerShot,1000)
  }

  // ? GAME LOOP ----------------------------------------------------

  const startBtn = document.querySelector('.start-btn')

  function startGame (){
    createCompShips()
    createPlayShips()
    allPlayShipLocate()
    compCells.forEach(cell => cell.addEventListener('click',playerShot))
  }
  startBtn.addEventListener('click',startGame)

  // ? RESET FUNCTION ----------------------------------------------------

  const resetBtn = document.querySelector('.reset-button')

  function gameReset(){
    window.location.reload()
  }

  resetBtn.addEventListener('click',gameReset)

  //* POWER BUTTON FUCTIONALITY---------------------------------

  // function shotModifier(tempShot){
  //   return tempShot + 1
  // }
    
  // const startTimerBtn = document.querySelector('.start-timer-btn')

  // startTimerBtn.addEventListener('mousedown',start)
  // startTimerBtn.addEventListener('mouseup',stop)
  
  // let startTime = []
  // let endTime = []
  // let timeTaken = []

  // function start(){
  //   startTime = new Date()
  // }

  // function stop(){
  //   endTime = new Date()
  //   timeTaken = endTime - startTime
  //   console.log(timeTaken)
  //   if (timeTaken > 1500 && timeTaken < 2500){
  //     console.log('fuckin bring it on')
  //   } else {
  //     console.log('close')
  //   }
  // }

  // console.log(timeTaken)



  //? PLAYER SHIP MOVEMENT FUNCTION BEFORE BATTLE---------------------------------
  // * Ship select buttons call the ship which its location is to be modified, for each function, the desired move/new location is pushed into tempShip so that this can be checked against the sides of the grid and other ships. If tempShip is clear of ships and in the grid, then the array is push to the selected ship and reformatted so it appears in the new location. tempShip is cleared when a new ship is selected.
  
  
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

  // ? ROTATE PLAYER SHIP FUNCTION-------------------------------------------

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
        window.alert('There is a ship there Captain')
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
    shipToBeMoved.location.forEach(location =>{
      location.classList.add('tempship')
    })
    console.log(shipToBeMoved)
  }
  shipSelectBtns.forEach(ship => {
    ship.addEventListener('click',shipSelected)
  })

  // ?  INTRO DISAPPEAR AND BRING UP SHIP LOCATOR---------------------------------------------------

  const nameSubmit = document.getElementById('name-submit')
  const introScreen = document.getElementById('intro')
  const secondScreen = document.getElementById('grids')
  const gameButtons = document.getElementById('game-buttons')
  const instructions = document.getElementById('instructions-div')
  const main = document.getElementById('main')

  function introDisappearDelay (){
    setTimeout(introDisappear, 500)
  }

  function introDisappear() {
    introScreen.style.display = 'none'
    secondScreen.style.display = 'flex'
    gameButtons.style.display = 'flex'
    instructions.style.display = 'flex'

  }

  nameSubmit.addEventListener('click',introDisappearDelay)


  // ? SHIP LOCATOR DISAPPEAR ----------------------------------------------------

  const confirmShips = document.getElementById('confirm-btn')
  const compGrid = document.getElementById('comp-grid')
  const tauntBox = document.getElementById('taunts')

  function toWarDelay(){
    setTimeout(toWar,500)
  }

  function toWar(){
    gameButtons.style.display = 'none'
    instructions.style.display = 'none'  
    compGrid.style.display = 'flex'
    tauntBox.style.display = 'flex'
    // barbossa.style.display = 'none'
    main.style.justifyContent = 'center'

  }
  confirmShips.addEventListener('click',toWarDelay)

  // ? TAUNTS BOX ----------------------------------------------------

  const tauntsBox = document.getElementById('taunt-text')
  const jackHead = document.getElementById('jack-sparrow-head')
  const barbossaHead = document.getElementById('barbossa-head')

  function alreadyShot(){
    tauntsBox.style.display = 'flex'
    jackHead.style.display = 'flex'
    tauntsBox.innerHTML = 'Captain, it may be the rum but we already fired there. Have another try'
    tauntDisappearDelay()

  }

  function playerHitComp(){
    tauntsBox.style.display = 'flex'
    jackHead.style.display = 'flex'
    barbossaHead.style.display = 'none'
    tauntsBox.innerHTML = playerHitTaunts[Math.floor(Math.random() * playerHitTaunts.length)]
    tauntDisappearDelay()
  }

  function compHitPlayer(){
    tauntsBox.style.display = 'flex'
    jackHead.style.display = 'none'
    barbossaHead.style.display = 'flex'
    tauntsBox.innerHTML = compHitTaunts[Math.floor(Math.random() * compHitTaunts.length)]
    tauntDisappearDelay()
  }

  function tauntDisappear(){
    tauntsBox.style.display = 'none'
    jackHead.style.display = 'none'
    barbossaHead.style.display = 'none'
  }

  function tauntDisappearDelay(){
    setTimeout(tauntDisappear,2000)
  }

  const playerHitTaunts = ['Good shot Captain, rum to celebrate?','More like that please Captain','DONT LET THEM TAKE MY RUM','You got her right in the stern','Are you Master Baites?','That got me timbers shivering','Get your plank out','Is that your peg leg Captain?','Why fight when we can negotiate?','BUT WHY IS THE RUM GONE','Wherever we want to go, we’ll go'
  ]


  const compHitTaunts = ['Told ye! The Pearl will be mine!','No hard feelings, aye Captain','Jack, take that land lubber back to Tortuga','This is too easy, let me put on a blindfold','Say hello to Davy Jones','Did you remember to put cannon balls in?','The pirate life is not for you','Get the rum out, this will be over shortly','Like taking candy from a child','Like taking rum from Jack Sparrow','Sometimes I feel like dancing','Ready to dance a gallows jig, Jack?','Tharrr she blows','Want to scrub my poop deck?','Roger, the Cabin Boy?'
  ]

  // ? FINISH SCREEN ----------------------------------------------------
  
  const playerWins = document.getElementById('player-won')
  
  function playerWonDelay(){
    setTimeout(playerWon,1000)
  }

  function playerWon(){
    secondScreen.style.display = 'none'
    tauntBox.style.display = 'none'
    playerWins.style.display = 'flex'
  }

  const playerLoses = document.getElementById('player-lost')

  function playerLostDelay(){
    setTimeout(playerLost,1000)
  }

  function playerLost(){
    secondScreen.style.display = 'none'
    tauntBox.style.display = 'none'
    playerLoses.style.display = 'flex'
  }
  
  
}
window.addEventListener('DOMContentLoaded', init)