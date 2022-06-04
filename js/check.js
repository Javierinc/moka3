export function checkInput(e) {
  const keyPressed = e.key;
  const keyPressedIsNumber =
  Number.isInteger(parseInt(keyPressed));
  
  const keyPressedNotSupported = 
    keyPressed != 'ArrowDown' &&
    keyPressed != 'ArrowUp' &&
    keyPressed != 'ArrowLeft' &&
    keyPressed != 'ArrowRight' &&
    keyPressed != 'Backspace' &&
    keyPressed != 'Delete' &&
    keyPressed != 'Enter' &&
    !keyPressedIsNumber;
  const startsAtZero = 
    e.target.value.length === 0 &&
    keyPressed == 0;

  if (keyPressedNotSupported || startsAtZero) {
    e.preventDefault(); 
  }
}