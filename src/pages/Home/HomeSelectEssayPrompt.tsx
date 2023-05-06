import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Icon,
  Stack,
  Text,
  HStack,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaCheckCircle, FaRandom, FaRegCircle } from "react-icons/fa";
import { SearchInput } from "../../components/SearchInput";
import { Essays, EssayType } from "../../context/Context";
import { padIdLeft } from "../../utils/format";

export type HomeSelectEssayPromptProps = {
  type: EssayType;
  essays: Essays;
  onClose: () => void;
  onSelect: (type: EssayType, essayId: string) => void;
};

export const HomeSelectEssayPrompt = (props: HomeSelectEssayPromptProps) => {
  const [search, setSearch] = useState("");
  const [essayId, setEssayId] = useState("");

  const filteredEssays = props.essays.filter(
    (essay) =>
      padIdLeft(essay.id).includes(search) ||
      essay.prompt.toLowerCase().includes(search.toLowerCase())
  );

  const convertToTitleCase = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const onSelect = (id: string) => {
    setEssayId(id);
  };

  const onRandom = () => {
    const essaysByType = props.essays.filter(
      (essay) => essay.type === props.type
    );

    const randomIndex = Math.floor(Math.random() * essaysByType.length);
    const randomEssay = essaysByType[randomIndex];

    setSearch("");

    document.getElementById(`essay-prompt-${randomEssay.id}`)?.scrollIntoView({
      behavior: "auto",
      block: "start",
    });

    setEssayId(randomEssay.id);
  };

  const title = `Select ${convertToTitleCase(props.type)} Essay Prompt`;

  return (
    <Drawer isOpen onClose={props.onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader color="blue.300" pb="0">
          {title}
          <HStack my="3">
            <SearchInput
              value={search}
              onChange={setSearch}
              color="white"
              borderColor="gray.600"
              width="100%"
            />
            <Tooltip label="Select Random Prompt">
              <IconButton
                icon={<FaRandom />}
                aria-label="Select Random Prompt"
                onClick={onRandom}
              />
            </Tooltip>
          </HStack>
        </DrawerHeader>
        <DrawerBody py="0">
          <Stack overflow="scroll" spacing="3">
            {filteredEssays.map((essay) => (
              <Stack
                id={`essay-prompt-${essay.id}`}
                key={essay.id}
                onClick={() => onSelect(essay.id)}
                borderWidth="2px"
                borderColor={essay.id === essayId ? "blue.300" : "gray.600"}
                borderRadius="md"
                bg={essay.id === essayId ? "blue.800" : "transparent"}
                padding="3"
                cursor="pointer"
              >
                <HStack justify="space-between">
                  <Text
                    fontSize="sm"
                    color={essay.id === essayId ? "blue.300" : "gray.500"}
                    fontWeight="extrabold"
                    fontFamily="Monaco"
                  >
                    {padIdLeft(essay.id)}
                  </Text>
                  <Icon
                    as={essay.id === essayId ? FaCheckCircle : FaRegCircle}
                    color={essay.id === essayId ? "blue.300" : "gray.500"}
                  />
                </HStack>
                <Text
                  fontWeight="medium"
                  noOfLines={essay.id === essayId ? 100 : 4}
                  color={essay.id === essayId ? "blue.300" : "gray.300"}
                >
                  {essay.prompt}
                </Text>
              </Stack>
            ))}
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="solid" mr="3" onClick={props.onClose}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            isDisabled={!essayId}
            onClick={() => props.onSelect(props.type, essayId)}
          >
            Select
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

// import {
//   Button,
//   Drawer,
//   DrawerBody,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   Icon,
//   Stack,
//   Text,
//   HStack,
//   IconButton,
//   Tooltip,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { FaCheckCircle, FaRandom, FaRegCircle } from "react-icons/fa";
// import { SearchInput } from "../../components/SearchInput";
// import { Essays, EssayType } from "../../context/Context";
// import { theme } from "../../theme";
// import { padIdLeft } from "../../utils/format";

// export type HomeSelectEssayPromptProps = {
//   type: EssayType;
//   essays: Essays;
//   onClose: () => void;
//   onSelect: (type: EssayType, essayId: string) => void;
// };

// export const HomeSelectEssayPrompt = (props: HomeSelectEssayPromptProps) => {
//   const [search, setSearch] = useState("");
//   const [essayId, setEssayId] = useState("");

//   const filteredEssays = props.essays.filter(
//     (essay) =>
//       padIdLeft(essay.id).includes(search) ||
//       essay.prompt.toLowerCase().includes(search.toLowerCase())
//   );

//   const convertToTitleCase = (text: string) => {
//     return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
//   };

//   const onSelect = (id: string) => {
//     setEssayId(id);
//   };

//   const onRandom = () => {
//     const essaysByType = props.essays.filter(
//       (essay) => essay.type === props.type
//     );

//     const randomIndex = Math.floor(Math.random() * essaysByType.length);
//     const randomEssay = essaysByType[randomIndex];

//     setSearch("");

//     document.getElementById(`essay-prompt-${randomEssay.id}`)?.scrollIntoView({
//       behavior: "auto",
//       block: "start",
//     });

//     setEssayId(randomEssay.id);
//   };

//   const title = `Select ${convertToTitleCase(props.type)} Essay Prompt`;

//   return (
//     <Drawer isOpen onClose={props.onClose} size="md">
//       <DrawerOverlay />
//       <DrawerContent>
//         <DrawerCloseButton />
//         <DrawerHeader color="blue.300" pb="0">
//           {title}
//           <HStack my="3">
//             <SearchInput
//               value={search}
//               onChange={setSearch}
//               color="white"
//               borderColor="gray.600"
//               width="100%"
//             />
//             <Tooltip label="Select Random Prompt">
//               <IconButton
//                 icon={<FaRandom />}
//                 aria-label="Select Random Prompt"
//                 onClick={onRandom}
//               />
//             </Tooltip>
//           </HStack>
//         </DrawerHeader>
//         <DrawerBody py="0">
//           <Stack overflow="scroll" spacing="3">
//             {filteredEssays.map((essay) => (
//               <Stack
//                 id={`essay-prompt-${essay.id}`}
//                 key={essay.id}
//                 onClick={() => onSelect(essay.id)}
//                 borderWidth="2px"
//                 borderColor={essay.id === essayId ? "blue.300" : "gray.600"}
//                 borderRadius="md"
//                 bg={essay.id === essayId ? "blue.300" : "transparent"}
//                 padding="3"
//                 cursor="pointer"
//               >
//                 <HStack justify="space-between">
//                   <Text
//                     fontSize="sm"
//                     color={essay.id === essayId ? "gray.800" : theme.grayColor}
//                     fontWeight="extrabold"
//                     fontFamily="Monaco"
//                   >
//                     {padIdLeft(essay.id)}
//                   </Text>
//                   <Icon
//                     as={essay.id === essayId ? FaCheckCircle : FaRegCircle}
//                     color={essay.id === essayId ? "gray.800" : "gray.500"}
//                   />
//                 </HStack>
//                 <Text
//                   fontWeight="semibold"
//                   noOfLines={essay.id === essayId ? 100 : 4}
//                   color={essay.id === essayId ? "gray.800" : "white"}
//                 >
//                   {essay.prompt}
//                 </Text>
//               </Stack>
//             ))}
//           </Stack>
//         </DrawerBody>
//         <DrawerFooter>
//           <Button variant="solid" mr="3" onClick={props.onClose}>
//             Close
//           </Button>
//           <Button
//             colorScheme="blue"
//             isDisabled={!essayId}
//             onClick={() => props.onSelect(props.type, essayId)}
//           >
//             Select
//           </Button>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   );
// };
