import styled, { css } from 'styled-components'
import { useState } from 'react'
import flag from '../img/flag.png'
import bomb from '../img/bomb.jpeg'

const Square = styled.div`
  height: 50px;
  width: 50px;
  border: 1px solid #0006;
  background-color: white;
  color: black;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.bomb &&
    css`
      background-image: url(${bomb});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;


    `}

  ${(props) =>
    props.active &&
    css`
      background-color: #0006;
    `}

  ${(props) =>
    props.flag &&
    css`
      background-image: url(${flag});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    `}
`

function SquareOption({
  activate = false,
  bomb,
  lostGame,
  onLostGame,
  nearestBombs,
  action,
  i,
  j,
}) {
  const [isFlag, setFlag] = useState(false)
  const [isBomb, setBomb] = useState(bomb || false)

  if (lostGame) {
    return (
      <Square active={activate} bomb={isBomb}>
        {nearestBombs}
      </Square>
    )
  }

  const onClickSquare = (e) => {
    if (bomb) onLostGame()

    if (!activate && !isFlag) {
      if (bomb) {
        alert('Perdisteeeeeeee')
      } else {
        action(i, j)
      }
    }
  }

  const onRightClick = (e) => {
    e.preventDefault()
    if (!activate) setFlag(!isFlag)
  }

  return (
    <Square
      active={activate}
      flag={isFlag}
      onClick={onClickSquare}
      onContextMenu={onRightClick}
    >
      {activate && nearestBombs !== 0 ? nearestBombs : ''}
    </Square>
  )
}

export default SquareOption
