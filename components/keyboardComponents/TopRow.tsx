import { Button } from "react-bootstrap";
import RowSpellingInterface from "../../interfaces/RowData";

const TopRow = ({
  letter,
  index,
  currentRow,
  changeRow,
  keysUsedAlready,
  keyBackgroundColors,
  btnSize,
  wordToSpell,
  preventKeyboardClick,
  startGame,
  hasGameStarted,
}: {
  letter: string;
  index: number;
  currentRow: RowSpellingInterface;
  changeRow: React.Dispatch<React.SetStateAction<RowSpellingInterface>>;
  keysUsedAlready: string[];
  keyBackgroundColors: string[];
  btnSize: string[];
  wordToSpell: string;
  preventKeyboardClick: boolean;
  startGame: React.Dispatch<React.SetStateAction<boolean>>;
  hasGameStarted: boolean;
}) => {
  //USER CAN CLICK ON KEYS
  if (preventKeyboardClick == false) {
    //NOT COLOR CODED
    if (keysUsedAlready.indexOf(letter) == -1) {
      return (
        <Button
          key={index}
          style={{
            padding: "0px",
            fontSize: btnSize[2],
            marginRight: "5px",
            width: btnSize[0],
            height: btnSize[1],
            backgroundColor: "#d3d6da",
            color: "black",
            border: "none",
          }}
          onClick={(e) => {
            if (hasGameStarted == false) {
              startGame(true);
            }

            //user has not hit enter button on last char of row
            if (currentRow.charIndex == wordToSpell.length) {
            } else {
              const k = e.target as HTMLButtonElement;
              const keyCode: string = k.innerText;

              //NEW ROW
              if (currentRow.charIndex == wordToSpell.length) {
                //GAME OVER
                if (currentRow.rowIndex == 5) {
                  alert("game over");
                  location.reload();
                } else {
                  const y = { ...currentRow };
                  y.rowIndex += 1;
                  y.charIndex = 0;

                  const x = [...y.spellings[y.rowIndex]];
                  x.splice(y.charIndex, 1, keyCode);
                  y.spellings[y.rowIndex] = x;
                  y.charIndex += 1;

                  changeRow(y);
                }
              } else {
                const x = [...currentRow.spellings[currentRow.rowIndex]];
                x.splice(currentRow.charIndex, 1, keyCode);

                const y = { ...currentRow };
                y.spellings[currentRow.rowIndex] = x;
                y.charIndex += 1;

                changeRow(y);
              }
            }
          }}
        >
          {letter}
        </Button>
      );
    }
    //COLOR CODED
    else {
      //find index of where in keysAlreadyUsed
      const keyBGColor = keysUsedAlready.indexOf(letter);

      return (
        <Button
          key={index}
          style={{
            padding: "0px",

            fontSize: btnSize[2],
            marginRight: "5px",
            width: btnSize[0],
            height: btnSize[1],
            backgroundColor: keyBackgroundColors[keyBGColor],
            color: "black",
            border: "none",
          }}
          onClick={(e) => {
            if (currentRow.charIndex == wordToSpell.length) {
            } else {
              const k = e.target as HTMLButtonElement;
              const keyCode: string = k.innerText;

              //on char index 5
              //NEW ROW
              if (currentRow.charIndex == wordToSpell.length) {
                //GAME OVER
                if (currentRow.rowIndex == 5) {
                  alert("game over");
                  location.reload();
                } else {
                  const y = { ...currentRow };
                  y.rowIndex += 1;
                  y.charIndex = 0;

                  const x = [...y.spellings[y.rowIndex]];
                  x.splice(y.charIndex, 1, keyCode);
                  y.spellings[y.rowIndex] = x;
                  y.charIndex += 1;

                  changeRow(y);
                }
              } else {
                const x = [...currentRow.spellings[currentRow.rowIndex]];
                x.splice(currentRow.charIndex, 1, keyCode);

                const y = { ...currentRow };
                y.spellings[currentRow.rowIndex] = x;
                y.charIndex += 1;

                changeRow(y);
              }
            }
          }}
        >
          {letter}
        </Button>
      );
    }
  }
  //USER CANNOT CLICK ON KEYS WHILE CHECKING IF CURRENT WORD JUST GUSSED IS BEING VALIDATED BY API
  else {
    //NOT COLOR CODED
    if (keysUsedAlready.indexOf(letter) == -1) {
      return (
        <Button
          key={index}
          style={{
            opacity: ".3",
            padding: "0px",
            fontSize: btnSize[2],
            marginRight: "5px",
            width: btnSize[0],
            height: btnSize[1],
            backgroundColor: "#d3d6da",
            color: "black",
            border: "none",
          }}
        >
          {letter}
        </Button>
      );
    }
    //COLOR CODED
    else {
      //find index of where in keysAlreadyUsed
      const keyBGColor = keysUsedAlready.indexOf(letter);

      return (
        <Button
          key={index}
          style={{
            padding: "0px",
            opacity: ".3",
            fontSize: btnSize[2],
            marginRight: "5px",
            width: btnSize[0],
            height: btnSize[1],
            backgroundColor: keyBackgroundColors[keyBGColor],
            color: "black",
            border: "none",
          }}
        >
          {letter}
        </Button>
      );
    }
  }
};

export default TopRow;
