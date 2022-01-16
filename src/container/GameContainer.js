import styled from 'styled-components'
import SquareOption from '../components/Square'
import { useState, useEffect } from 'react'

const Container = styled.section`
  background-color: white;
  width: 500px;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
`

function GameContainer() {
  const [squares, setSquares] = useState([])
  const [activedSquares, setAS] = useState([])
  const [lostGame, setLostGame] = useState(false)

  useEffect(() => {
    fillContainer()
  }, [])

  const fillContainer = (n = 10) => {
    const array = Array(n)
    let cont = 0
    let bombs = Math.floor(Math.random() * 35) + 15

    for (let i = 0; i < n; i++) {
      array[i] = Array(n)
      for (let j = 0; j < n; j++) {
        const putBomb = Math.floor(Math.random() * 10) >= 7 ? true : false
        array[i][j] = {
          id: cont,
          putBomb: putBomb && bombs > 0 ? true : false,
          nearestBombs: 0,
        }
        if (putBomb) bombs -= 1
        cont += 1
      }
    }

    setSquares(getNearestBomb(array, n))
  }

  const showBombs = () => {
    setLostGame(true)
  }

  const getNearestBomb = (array, n) => {
    let isLastBomb = false

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === 0) {
          if (j !== 0) {
            if (array[i][j].putBomb) {
              array[i][j - 1]['nearestBombs'] += 1
              isLastBomb = true
            } else {
              if (isLastBomb) {
                array[i][j]['nearestBombs'] += 1
                isLastBomb = false
              }
            }
          } else isLastBomb = array[i][j]['putBomb']
        } else {
          if (j !== 0 && j !== n - 1) {
            if (array[i][j].putBomb) {
              //left
              array[i][j - 1]['nearestBombs'] = !isLastBomb
                ? array[i][j - 1]['nearestBombs'] + 1
                : array[i][j - 1]['nearestBombs']
              //up-left
              array[i - 1][j - 1]['nearestBombs'] = !array[i - 1][j - 1][
                'putBomb'
              ]
                ? array[i - 1][j - 1]['nearestBombs'] + 1
                : array[i - 1][j - 1]['nearestBombs']
              //up
              array[i - 1][j]['nearestBombs'] = !array[i - 1][j]['putBomb']
                ? array[i - 1][j]['nearestBombs'] + 1
                : array[i - 1][j]['nearestBombs']
              //up-right
              array[i - 1][j + 1]['nearestBombs'] = !array[i - 1][j + 1][
                'putBomb'
              ]
                ? array[i - 1][j + 1]['nearestBombs'] + 1
                : array[i - 1][j + 1]['nearestBombs']

              isLastBomb = true
            } else {
              //left
              array[i][j]['nearestBombs'] = isLastBomb
                ? array[i][j]['nearestBombs'] + 1
                : array[i][j]['nearestBombs']
              //up-left
              array[i][j]['nearestBombs'] = array[i - 1][j - 1]['putBomb']
                ? array[i][j]['nearestBombs'] + 1
                : array[i][j]['nearestBombs']
              //up
              array[i][j]['nearestBombs'] = array[i - 1][j]['putBomb']
                ? array[i][j]['nearestBombs'] + 1
                : array[i][j]['nearestBombs']
              //up-right
              array[i][j]['nearestBombs'] = array[i - 1][j + 1]['putBomb']
                ? array[i][j]['nearestBombs'] + 1
                : array[i][j]['nearestBombs']

              isLastBomb = false
            }
          } else if (j === n - 1) {
            if (array[i][j].putBomb) {
              //left
              array[i][j - 1]['nearestBombs'] = !isLastBomb
                ? array[i][j - 1]['nearestBombs'] + 1
                : array[i][j - 1]['nearestBombs']
              //up-left
              array[i - 1][j - 1]['nearestBombs'] = !array[i - 1][j - 1][
                'putBomb'
              ]
                ? array[i - 1][j - 1]['nearestBombs'] + 1
                : array[i - 1][j - 1]['nearestBombs']
              //up
              array[i - 1][j]['nearestBombs'] = !array[i - 1][j]['putBomb']
                ? array[i - 1][j]['nearestBombs'] + 1
                : array[i - 1][j]['nearestBombs']

              isLastBomb = true
            } else {
              //left
              array[i][j]['nearestBombs'] = isLastBomb
                ? array[i][j]['nearestBombs'] + 1
                : array[i][j]['nearestBombs']
              //up-left
              array[i][j]['nearestBombs'] = array[i - 1][j - 1]['putBomb']
                ? array[i][j]['nearestBombs'] + 1
                : array[i][j]['nearestBombs']
              //up
              array[i][j]['nearestBombs'] = array[i - 1][j]['putBomb']
                ? array[i][j]['nearestBombs'] + 1
                : array[i][j]['nearestBombs']

              isLastBomb = false
            }
          } else {
            if (array[i][j].putBomb) {
              //up
              array[i - 1][j]['nearestBombs'] = !array[i - 1][j]['putBomb']
                ? array[i - 1][j]['nearestBombs'] + 1
                : array[i - 1][j]['nearestBombs']
              //up-right
              array[i - 1][j + 1]['nearestBombs'] = !array[i - 1][j + 1][
                'putBomb'
              ]
                ? array[i - 1][j + 1]['nearestBombs'] + 1
                : array[i - 1][j + 1]['nearestBombs']

              isLastBomb = true
            } else {
              //up
              array[i][j]['nearestBombs'] = array[i - 1][j]['putBomb']
                ? array[i][j]['nearestBombs'] + 1
                : array[i][j]['nearestBombs']
              //up-right
              array[i][j]['nearestBombs'] = array[i - 1][j + 1]['putBomb']
                ? array[i][j]['nearestBombs'] + 1
                : array[i][j]['nearestBombs']

              isLastBomb = false
            }
          }
        }
      }
    }

    return array
  }

  const onClickSquare = async (i, j) => {
    let arrayActiveSquares = []
    if (squares[i][j]['nearestBombs'] === 0) {
      await findZerosSquare(i, j, i, j, arrayActiveSquares)
    } else arrayActiveSquares.push(`${i}${j}`)

    setAS(activedSquares.concat(arrayActiveSquares))
    console.log(activedSquares)
  }

  const findZerosSquare = async (i, j, k = i, l = j, array) => {
    if (
      k >= 0 &&
      k < 10 &&
      l >= 0 &&
      l < 10 &&
      !array.includes(`${k}${l}`) &&
      squares[k][l]['nearestBombs'] === 0
    ) {
      array.push(`${k}${l}`)
      findZerosSquare(i, j, k - 1, l, array)
      findZerosSquare(i, j, k, l - 1, array)
      findZerosSquare(i, j, k, l + 1, array)
      findZerosSquare(i, j, k + 1, l, array)
    } else if (
      k >= 0 &&
      k < 10 &&
      l >= 0 &&
      l < 10 &&
      !array.includes(`${k}${l}`) &&
      squares[k][l]['nearestBombs'] !== 0
    ) {
      array.push(`${k}${l}`)
    }
  }

  return (
    <Container>
      {squares.map((row, i) =>
        row.map((square, j) => {
          return (
            <SquareOption
              key={square.id}
              bomb={square.putBomb}
              onLostGame={showBombs}
              lostGame={lostGame}
              nearestBombs={square.nearestBombs}
              action={onClickSquare}
              i={i}
              j={j}
              activate={activedSquares.includes(`${i}${j}`) ? true : false}
            />
          )
        })
      )}
    </Container>
  )
}

export default GameContainer
