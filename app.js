const tileDisplay = document.querySelector('.tile-container')
const messageDisplay = document.querySelector('.message-container')
const keyboard = document.querySelector('.keyboard-container')

let wordle

const getWordle = () => {
  fetch('http://localhost:3000/word')
    .then(response => response.json())
    .then(json =>  {
      console.log(json)
      wordle = json.toUpperCase()
    })
    .catch(err => console.log(err))
}
getWordle()

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
let isGameOver = false

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

  if (currentTile > 4) {
    console.log(`guess is ${guess}, wordle is ${wordle}`);
    flipTiles()
    if (wordle == guess) {
      showMessage('Magnificent!')
      isGameOver = true
      return
    } else {
      if (currentRow >= 5) {
        isGameOver = true
        showMessage('Game Over!')
        return
      } else {
        currentRow++
        currentTile = 0
      }
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

const addColorToKey = (keyLetter, color) => {
  const key = document.getElementById(keyLetter)
  key.classList.add(color)
}

const flipTiles = () => {
  const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
  let checkWordle = wordle
  const guess = []

  rowTiles.forEach((tile) => {
    guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay' })
  })

  guess.forEach((guess) => {
    if (checkWordle.includes(guess.letter)) {
      guess.color = 'yellow-overlay'
      checkWordle = checkWordle.replace(guess.letter, '')
    }
  })

  guess.forEach((guess, index) => {
    if (guess.letter == wordle[index]) {
      guess.color = 'green-overlay'
      checkWordle = checkWordle.replace(guess.letter, '')
    }
  })

  rowTiles.forEach((tile, index) => {
    const dataLetter = tile.getAttribute('data')
    setTimeout(() => {
      tile.classList.add('flip')
      tile.classList.add(guess[index].color)
      addColorToKey(guess[index].letter, guess[index].color)
    }, 250 * index);

  })
}
