const tileDisplay = document.querySelector('.tile-container')
const messageDisplay = document.querySelector('.message-container')
const keyboard = document.querySelector('.keyboard-container')

const wordle = 'TEEMO'
const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'ENTER',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  '«',
]

const guessRows = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
]

let currentRow = 0
let currentTile = 0

guessRows.forEach((guessRow, guessRowIndex) => {
  const rowElement = document.createElement('div')
  rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
  guessRow.forEach((guess, guessIndex) => {
    const tileElement = document.createElement('div')
    tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
    tileElement.classList.add('tile')
    rowElement.append(tileElement)
  })
  tileDisplay.append(rowElement)
})

keys.forEach((key) => {
  const buttonElement = document.createElement('button')
  buttonElement.textContent = key
  buttonElement.setAttribute('id', key)
  buttonElement.addEventListener('click', () => handleClick(key))
  keyboard.append(buttonElement)
})

const handleClick = (key) => {
  console.log('clicked', key);
  if (key == '«') {
    console.log('delete letter')
    deleteLetter()
    return
  }
  if (key == 'ENTER') {
    checkRow()
    return
  }
  addLetter(key)
}

const addLetter = (letter) => {
  if (currentTile < 5 && currentRow < 6) {
    const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
    tile.textContent = letter
    tile.setAttribute('data', letter)
    guessRows[currentRow][currentTile] = letter
    currentTile++
    console.log('guessRows', guessRows);
  } else {
    console.log('reached limit');
  }
}

const deleteLetter = () => {
  if (currentTile > 0) {
    currentTile--
    const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
    tile.textContent = ''
    tile.setAttribute('data', '')
    guessRows[currentRow][currentTile] = ''
  }


}

const checkRow = () => {
  const guess = guessRows[currentRow].join('')
  if (currentTile === 5) {
    console.log(`guess is ${guess}, wordle is ${wordle}`);
    if (wordle == guess) {
      showMessage('Magnificent!')
    }
  }
}

const showMessage = (message) => {
  const messageElement = document.createElement('p')
  messageElement.textContent = message
  messageDisplay.append(messageElement)
  setTimeout(() => {
    messageDisplay.removeChild(messageElement)
  }, 2000)
}
