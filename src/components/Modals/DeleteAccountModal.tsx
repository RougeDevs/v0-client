import React, { useState } from "react";
import Image from "next/image";
import googleLogo from "../../assets/googleLogo.png";
import githubLogo from "../../assets/github-logo.png";
import twitterLogo from "../../assets/twitterLogo.png";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  ModalBody,
  ModalCloseButton,
  Card,
  Text,
  Checkbox,
  Tooltip,
  Box,
  NumberInput,
  NumberInputField,
  Portal,
  Input,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSetAtom } from "jotai";
import { userAtom } from "../../store/user.atom";

const DeleteAccountModal = ({ buttonText, ...restProps }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [inputAmount, setinputAmount] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [buttonId, setButtonId] = useState(0);
  const fetchCall = async () => {
    const res = await axios.get(
      "https://a4c9-103-215-237-73.ngrok-free.app/auth/login"
    );
  };
  const router = useRouter();

  return (
    <div>
      <Button onClick={onOpen} {...restProps}>
        {buttonText}
      </Button>
      <Portal>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={{ width: "700px", height: "120px" }}
          isCentered
        >
          <ModalOverlay bg="rgba(244, 242, 255, 0.5);"/>
          <ModalContent
            color="white"
            borderRadius="md"
            maxW="462px"
            zIndex={1}
            mt="8rem"
            className="modal-content"
          >
            <ModalHeader
              mt="1rem"
              fontSize="14px"
              fontWeight="600"
              fontStyle="normal"
              lineHeight="20px"
              color="black"
              textAlign="center"
            >
              Delete Account
            </ModalHeader>
            <ModalCloseButton mt="1rem" mr="1rem" />
            <ModalBody>
              <Box
                color="black"
                display="flex"
                flexDirection="column"
                gap="1rem"
                mb="1rem"
              >
                <Box>
                    <Text>
                        Please remember this is a permanent process and it cannot be reversed
                    </Text>
                    <Input
                    type="text"
                    placeholder="please enter delete name"
                    mt="0.5rem"
                    />
                    <Button mt="1rem" bg="red" width="100%">
                        Delete Account
                    </Button>
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Portal>
    </div>
  );
};
export default DeleteAccountModal;
