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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSetAtom } from "jotai";
import { userAtom } from "../../store/user.atom";

const SignInModal = ({ buttonText, ...restProps }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [inputAmount, setinputAmount] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [buttonId, setButtonId] = useState(0);
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
              Welcome
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
                <Box
                  display="flex"
                  justifyContent="space-around"
                  cursor="pointer"
                  border="1px solid grey"
                  borderRadius="6px"
                  padding="8px"
                  onClick={() => {
                    // signIn('google')
                    router.push(
                      `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`
                    );
                  }}
                >
                  <Box display="flex" gap="0.5rem">
                    <Image src={googleLogo} alt="" width={24} height={24} />
                    <Text>Sign in with Google</Text>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-around"
                  cursor="not-allowed"
                  border="1px solid grey"
                  borderRadius="6px"
                  padding="8px"
                  opacity={0.5}
                  // filter="blur(1px)"
                  pointerEvents="none"
                >
                  <Box display="flex" gap="0.5rem">
                    <Image src={twitterLogo} alt="" width={24} height={24} />
                    <Text>Sign in with Twitter (Coming Soon)</Text>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-around"
                  cursor="not-allowed"
                  border="1px solid grey"
                  borderRadius="6px"
                  padding="8px"
                  opacity={0.5}
                  // filter="blur(1px)"
                  pointerEvents="none"
                >
                  <Box display="flex" gap="0.5rem">
                    <Image src={githubLogo} alt="" width={24} height={24} />
                    <Text>Sign in with Github (Coming soon)</Text>
                  </Box>
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Portal>
    </div>
  );
};
export default SignInModal;
