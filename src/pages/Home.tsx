import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Radio,
  RadioGroup,
  Button,
  Heading,
  VStack,
  Center,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Option {
  value: string;
  label: string;
}

interface OptionSelectorProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const AnimatedRadioBox = motion(Box);

function OptionSelector({
  options,
  value,
  onChange,
  label,
}: OptionSelectorProps) {
  const boxBg = useColorModeValue("white", "gray.800");

  return (
    <VStack align="start">
      <Text
        fontWeight="semibold"
        fontSize={{ base: "lg", sm: "xl" }}
        mb={3}
        color={useColorModeValue("gray.700", "gray.300")}
      >
        {label}
      </Text>
      <RadioGroup onChange={onChange} value={value}>
        <Flex gap={4} wrap="wrap">
          {options.map((option) => (
            <AnimatedRadioBox
              key={option.value}
              borderWidth="2px"
              borderRadius="xl"
              p={4}
              width={{ base: "100%", sm: "140px", md: "200px" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg={boxBg}
              borderColor={useColorModeValue("gray.200", "gray.700")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              cursor="pointer"
              onClick={() => onChange(option.value)}
            >
              <Flex flexDir={"row"} gap={2} justifyContent={"space-between"}>
                <Text fontWeight="medium" fontSize={{ base: "sm", sm: "md" }}>
                  {option.label}
                </Text>
                <Radio value={option.value} size="md" colorScheme="orange" />
              </Flex>
            </AnimatedRadioBox>
          ))}
        </Flex>
      </RadioGroup>
    </VStack>
  );
}

function Home() {
  const turnOptions: Option[] = [
    { value: "X", label: "X" },
    { value: "O", label: "O" },
  ];

  const gameTypeOptions: Option[] = [
    { value: "computer", label: "vs Computer" },
    { value: "friend", label: "vs Friend" },
  ];

  const [selectedTurn, setSelectedTurn] = useState<string>("");
  const [selectedGameType, setSelectedGameType] = useState<string>("");
  const navigate = useNavigate();

  const handleTurnChange = (value: string) => {
    setSelectedTurn(value);
  };

  const handleGameTypeChange = (value: string) => {
    setSelectedGameType(value);
  };

  const handleStartGame = () => {
    navigate(`/game?turn=${selectedTurn}&mode=${selectedGameType}`);
  };

  return (
    <Center height="100vh">
      <Box
        p={8}
        borderRadius="2xl"
        boxShadow="xl"
        bg={useColorModeValue("white", "gray.800")}
        width={{ base: "90%", md: "500px" }}
      >
        <VStack spacing={8}>
          <Heading
            textAlign="center"
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            fontWeight="bold"
            color={useColorModeValue("gray.800", "white")}
          >
            Tic Tac Toe
          </Heading>
          <Stack spacing={6} width="full">
            <OptionSelector
              options={gameTypeOptions}
              value={selectedGameType}
              onChange={handleGameTypeChange}
              label="Game Type"
            />
            {selectedGameType != "computer" && (
              <OptionSelector
                options={turnOptions}
                value={selectedTurn}
                onChange={handleTurnChange}
                label="Select Your Turn"
              />
            )}
          </Stack>
          <Button
            _hover={{
              bg: "orange.500",
            }}
            _active={{
              bg: "orange.600",
            }}
            bg={"orange.500"}
            color="white"
            onClick={handleStartGame}
            width="full"
            fontWeight="semibold"
            size="lg"
            borderRadius="full"
            fontSize={{ base: "md", sm: "lg" }}
            padding={{ base: "12px", sm: "14px", md: "16px" }}
          >
            Start Game
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default Home;
