import React, { JSX, useEffect, useState } from "react";
import { Box, Button, Grid, GridItem, Text, useToast } from "@chakra-ui/react";

interface SquareProps {
  value: string;
  handleSquareClick: (index: number) => void;
  index: number;
  isWinningSquare: boolean;
}

const SymbolPlaceholder = ({
  value,
  handleSquareClick,
  index,
  isWinningSquare,
}: SquareProps): JSX.Element => {
  return (
    <Button
      width={{ base: "80px", sm: "100px" }}
      height={{ base: "80px", sm: "100px" }}
      margin="5px"
      bg={isWinningSquare ? "green.300" : "gray.100"}
      color={isWinningSquare ? "white" : "black"}
      fontSize={{ base: "24px", sm: "30px", md: "36px" }}
      onClick={() => handleSquareClick(index)}
      isDisabled={!!value}
      borderRadius="md"
      border="2px solid"
      borderColor={isWinningSquare ? "green.500" : "gray.400"}
      _hover={{
        bg: isWinningSquare ? "green.400" : "gray.200",
        transform: "scale(1.1)",
        transition: "all 0.2s",
      }}
      _active={{
        bg: isWinningSquare ? "green.400" : "gray.300",
      }}
      boxShadow="md"
    >
      {value}
    </Button>
  );
};

interface TicTacToeProps {
  mode: string;
  turn: string;
}

const TicTacToe: React.FC<TicTacToeProps> = ({ mode, turn }) => {
  const [player, setPlayer] = useState(turn);
  const [squaresValueMap, setSquaresValueMap] = useState(new Array(9).fill(""));
  const [matchStatus, setMatchStatus] = useState(`${player} turn`);
  const [wonMatch, setWonMatch] = useState({
    isWon: false,
    player: "",
    winningIndexes: [] as number[],
  });
  const winingIndexes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const toast = useToast();

  const handleSquareClick = (index: number) => {
    if (wonMatch.isWon) {
      return;
    }

    let squaremap = squaresValueMap.slice();
    squaremap[index] = player;
    setSquaresValueMap(squaremap);
    checkWinningStatus(squaremap);
  };

  const reloadGame = () => {
    if (mode === "computer") {
      setPlayer("X");
      setMatchStatus(`X turn`);
    }

    setSquaresValueMap(new Array(9).fill(""));
    setPlayer("O");
    setWonMatch({
      isWon: false,
      player: "",
      winningIndexes: [],
    });
    setMatchStatus(`O turn`);
  };

  function checkWinningStatus(squaresValueMap: string[]) {
    let wonMatchConfig = {
      isWon: false,
      player: "",
      winningIndexes: [] as number[],
    };
    winingIndexes.forEach((elem) => {
      if (
        squaresValueMap[elem[0]] === squaresValueMap[elem[1]] &&
        squaresValueMap[elem[0]] === squaresValueMap[elem[2]] &&
        squaresValueMap[elem[0]] !== ""
      ) {
        wonMatchConfig.isWon = true;
        wonMatchConfig.player = squaresValueMap[elem[0]];
        wonMatchConfig.winningIndexes = elem;
      }
    });

    if (wonMatchConfig.isWon) {
      setWonMatch(wonMatchConfig);
      setMatchStatus(`${wonMatchConfig.player} won match 🎉🎉`);
      toast({
        title: `${wonMatchConfig.player} won match 🎉🎉`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else if (!squaresValueMap.includes("")) {
      setMatchStatus(`match draw`);
      toast({
        title: "Match Draw",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      let newTurn = player === "O" ? "X" : "O";
      setPlayer(newTurn);
      setMatchStatus(`${newTurn} turn`);
    }
  }

  function computerMode() {
    if (mode === "computer" && player === "X") {
      let index = Math.floor(Math.random() * 9);

      if (!squaresValueMap[index]) {
        setTimeout(() => {
          handleSquareClick(index);
        }, 1000);
      } else {
        computerMode();
      }
    }
  }

  useEffect(() => {
    computerMode();
  }, [player, mode]);

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      gap="20px"
      padding="20px"
      bg="white"
      boxShadow="xl"
      borderRadius="md"
      maxWidth="400px"
      margin="0 auto"
    >
      {/* Heading */}
      <Text
        fontSize={{ base: "24px", sm: "36px", md: "48px" }}
        fontWeight="bold"
        color="gray.800"
        textAlign="center"
        mb={6}
      >
        Tic Tac Toe
      </Text>

      <Box
        bg={wonMatch.isWon ? "green.400" : "yellow.300"}
        padding="10px"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="white"
        fontWeight="semibold"
        fontSize={{ base: "14px", sm: "16px", md: "18px" }}
        borderRadius="md"
      >
        <Text
          fontSize={{ base: "14px", sm: "16px", md: "18px" }}
          color="gray.800"
        >
          {matchStatus}
        </Text>
      </Box>

      <Grid
        templateColumns={{ base: "repeat(3, 1fr)", sm: "repeat(3, 1fr)" }}
        gap={3}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
          const isWinningSquare = wonMatch.winningIndexes.includes(index);
          return (
            <GridItem key={index}>
              <SymbolPlaceholder
                value={squaresValueMap[index]}
                handleSquareClick={handleSquareClick}
                index={index}
                isWinningSquare={isWinningSquare}
              />
            </GridItem>
          );
        })}
      </Grid>

      <Button
        bg="orange.400"
        width="100%"
        padding="10px"
        borderRadius="md"
        onClick={reloadGame}
        _hover={{
          bg: "orange.500",
        }}
        _active={{
          bg: "orange.600",
        }}
        boxShadow="lg"
        fontSize={{ base: "12px", sm: "14px", md: "16px" }}
      >
        <Text color="white" fontSize="md">
          Reload Game
        </Text>
      </Button>

      {mode === "computer" && (
        <Box
          display="flex"
          flexDirection="row"
          gap="20px"
          justifyContent="center"
        >
          <Text
            fontSize={{ base: "12px", sm: "14px", md: "16px" }}
            color="gray.800"
          >
            O : You
          </Text>
          <Text
            fontSize={{ base: "12px", sm: "14px", md: "16px" }}
            color="gray.800"
          >
            X : Computer
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default TicTacToe;
