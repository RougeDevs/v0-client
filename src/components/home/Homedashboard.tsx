import { Contributor, Project } from "@/interfaces/interface";
import { keyframes } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SignInModal from "../Modals/SignInModal";
import axios from "axios";
import { atom, useAtom } from "jotai";
import { userAtom } from "../../store/user.atom";
import { projectsAtom } from "../../store/project.atom";
import kremaraLogo from "../../assets/kremaraLogo-1.png";
const Homedashboard = () => {
  // const [projects, setProjects] = useState<Project[]>([
  //   {
  //     id: "95246531-4539-4a07-8c7b-8b567adbf5fc",
  //     projectTitle: "test",
  //     projectDescription: "test-description",
  //     projectThumbnail: "testThumbnail",
  //     websiteLink: null,
  //     contactEmail: "abc@gmail.com",
  //     category: "defi",
  //     githubRepository: null,
  //     ownerId: "0d2a4384-e3ec-42de-b4d7-449d54721fb2",
  //     verificationMethod: 3,
  //     socialMediaHandles: [],
  //     toolsAndTech: null,
  //     socialMediaDetails: null,
  //     additionalInfo: null,
  //     mailSent: null,
  //     signedMessage: null,
  //     checksAgreed: null,
  //     owner: {
  //       id: "0d2a4384-e3ec-42de-b4d7-449d54721fb2",
  //       email: "arijeet@hashstack.finance",
  //       firstName: " Arijeet",
  //       lastName: "Ghosh",
  //       image:
  //         "https://lh3.googleusercontent.com/a/ACg8ocL_6-r6Kz_viaaQu2Cbja0ej4BqQVpSbM1MNbXFh3WK3nbUhg=s96-c",
  //     },
  //     moderators: [],
  //   },
  //   {
  //     id: "95246531-4539-4a07-8c7b-8b567adbf5fc",
  //     projectTitle: "test",
  //     projectDescription: "test-description",
  //     projectThumbnail: "testThumbnail",
  //     websiteLink: null,
  //     contactEmail: "abc@gmail.com",
  //     category: "defi",
  //     githubRepository: null,
  //     ownerId: "0d2a4384-e3ec-42de-b4d7-449d54721fb2",
  //     verificationMethod: 3,
  //     socialMediaHandles: [],
  //     toolsAndTech: null,
  //     socialMediaDetails: null,
  //     additionalInfo: null,
  //     mailSent: null,
  //     signedMessage: null,
  //     checksAgreed: null,
  //     owner: {
  //       id: "0d2a4384-e3ec-42de-b4d7-449d54721fb2",
  //       email: "arijeet@hashstack.finance",
  //       firstName: " Arijeet",
  //       lastName: "Ghosh",
  //       image:
  //         "https://lh3.googleusercontent.com/a/ACg8ocL_6-r6Kz_viaaQu2Cbja0ej4BqQVpSbM1MNbXFh3WK3nbUhg=s96-c",
  //     },
  //     moderators: [],
  //   },
  // ]);
  const [contributors, setcontributors] = useState<Contributor[]>([]);
  const [recentActivity, setrecentActivity] = useState([
    {
      id: 1,
      text: "A user has landed on the product with best intrest",
      routeLink: "link",
    },
    {
      id: 2,
      text: "value",
      routeLink: "link",
    },
    {
      id: 2,
      text: "value",
      routeLink: "link",
    },
    {
      id: 2,
      text: "value",
      routeLink: "link",
    },
    {
      id: 2,
      text: "value",
      routeLink: "link",
    },
  ]);
  const [infoCodeUpdated, setinfoCodeUpdated] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useAtom(userAtom);
  const [projects, setProjects] = useAtom(projectsAtom);
  const scroll = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`;
  const fadeInText = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
  const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
  
`;

  useEffect(() => {
    try {
      const fetchTopContributors = async () => {};
      fetchTopContributors();
    } catch (error) {
      console.log(error, "err in fetching top contributors");
    }
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/project/all`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        if (res?.data) {
          setProjects(res?.data?.projects);
        }
      } catch (error) {
        console.log(error, "error in fetching projects");
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/activity`
        );
        if (res?.data) {
          setrecentActivity(res?.data?.data);
        }
      } catch (error) {
        console.log(error, "error in fetching recent activity");
      }
    };
    // fetchRecentActivity()
  }, []);

  useEffect(() => {
    try {
      const userLoginToken = localStorage.getItem("userLoginCode");
      if (userLoginToken && !userData) {
        const fetchUserData = async () => {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/user`,
            {
              headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${userLoginToken}`,
              },
            }
          );
          if (res?.data) {
            setUserData(res?.data?.data);
          }
        };
        fetchUserData();
      }
    } catch (error) {
      console.log(error, "erro in fetching code");
    }
  }, [infoCodeUpdated]);

  useEffect(() => {
    try {
      if (router.query.code) {
        const fetchuserInfo = async () => {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/get-token?code=${router.query.code}`,
            {
              headers: {
                "ngrok-skip-browser-warning": "69420",
              },
            }
          );
          console.log(res?.data, "user ccheck sign in");
          if (res?.data) {
            localStorage.setItem("userLoginCode", res?.data?.token as string);
            setinfoCodeUpdated(true);
          }
        };
        const userLoginToken = localStorage.getItem("userLoginCode");
        if (!userLoginToken && !userData) {
          fetchuserInfo();
        }
      }
    } catch (error) {
      console.log(error, "error in generating code");
    }
  }, [router.query.code]);

  return (
    <Box padding="4rem">
      <Box width="100%" display="flex" gap="2rem">
        <Box width="70%">
          <Box
            bg="#1E1E1E"
            padding="1.5rem"
            borderRadius="10px"
            display="flex"
            mt="2rem"
            alignItems="center"
            gap="1.5rem"
            justifyContent="center"
            boxShadow="lg"
          >
            <Image
              src={kremaraLogo}
              alt="Logo"
              width={100}
              height={100}
              style={{ borderRadius: "6px" }}
            />

            <Text flex="1" fontSize="lg" color="white" fontWeight="bold">
              Discover Kremara: The Future of Web3 Creativity 🌟🚀 .Step into
              Kremara, the cutting-edge platform transforming the way creative
              talent and Web3 projects connect. Designed to ignite innovation,
              Kremara offers a unique environment where your creativity meets
              opportunity.
            </Text>

            <Button
              as={Link}
              href="/products"
              target="_blank"
              bg="#FF9800"
              color="black"
              _hover={{ bg: "yellow.300" }}
              _focus={{ outline: "none" }}
              boxShadow="md"
              fontWeight="bold"
              px="1.5rem"
              py="1rem"
              borderRadius="8px"
            >
              Click here
            </Button>
          </Box>
          {!userData && (
            <Box
              padding="2rem"
              mt="1rem"
              bg="purple.400"
              borderRadius="12px"
              textAlign="center"
              boxShadow="lg"
              // maxW="600px"
              animation={`${fadeIn} 1s ease-out`}
            >
              <Text fontSize="2xl" color="white" fontWeight="bold" mb="1rem">
                Ready to Join the Future of Web3?
              </Text>
              <Text fontSize="lg" color="white" mb="2rem">
                Sign up now to start your journey with Kremara and be part of
                the next big thing in creative innovation. 🚀
              </Text>
              <SignInModal
                buttonText="Sign Up Now"
                bg="yellow.400"
                color="black"
                _hover={{ bg: "yellow.300" }}
                _focus={{ outline: "none" }}
                px="1.5rem"
                py="1rem"
                borderRadius="8px"
                fontWeight="bold"
                size="lg"
              />
            </Box>
          )}
          <Box
            bg="#262626"
            mt="1rem"
            height={userData ? "590px" : "350px"} // Fixed height
            padding="2rem"
            color="white"
            borderRadius="6px"
            display="flex"
            flexDirection="column"
          >
            <Box>
              <Text fontSize="24px">Top trending projects</Text>
            </Box>
            <Box overflowY="auto" mt="1rem" flex="1">
              {projects.map((project: Project, index: number) => (
                <Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt="2rem"
                    key={index}
                  >
                    <Box display="flex" gap="1rem">
                      <Avatar src={project.projectThumbnail as string} />
                      <Box>
                        <Text fontSize="18px" fontWeight="700">
                          {project.projectTitle}
                        </Text>
                        <Text maxW="650px">{project.projectDescription}</Text>
                      </Box>
                    </Box>
                    <Box>
                      <Button
                        cursor="pointer"
                        onClick={() => {
                          router.push(`/project/${project?.id}`);
                        }}
                        bg="#FF4081"
                      >
                        Click for project
                      </Button>
                    </Box>
                  </Box>
                  <Box
                    borderBottom="1px solid white"
                    width="100%" // Change width to 100% for full width
                    mt="1rem"
                    height="1px"
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box width="30%" mt="2rem">
          <Box
            bg="linear-gradient(135deg, rgba(44, 44, 44, 0.6), rgba(0, 0, 0, 0.4))" // Semi-transparent gradient
            color="white"
            padding="1.5rem"
            borderRadius="12px" // Slightly larger border radius for smoother glass feel
            height="400px" // Same fixed height as the first box
            display="flex"
            flexDirection="column"
            boxShadow="0 8px 32px rgba(0, 0, 0, 0.37)" // Depth shadow
            backdropFilter="blur(10px)" // Frosted glass effect
            border="1px solid rgba(255, 255, 255, 0.18)" // Light border
          >
            <Text fontSize="24px" fontWeight="bold" mb="1rem">
              Top Contributors
            </Text>
            <Box height="100%" overflowY="auto" mt="1rem">
              <Table variant="unstyled" size="sm">
                {" "}
                {/* Unstyled table for a cleaner glass look */}
                <Thead>
                  <Tr>
                    <Th color="rgba(255, 255, 255, 0.8)">Contributor</Th>
                    <Th color="rgba(255, 255, 255, 0.8)">Contributions</Th>
                    <Th color="rgba(255, 255, 255, 0.8)">Rewards</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Array(100)
                    .fill(0)
                    .map((_, index) => (
                      <Tr
                        key={index}
                        cursor="pointer"
                        _hover={{ background: "rgba(255, 255, 255, 0.2)" }} // Subtle hover effect
                        onClick={() => {
                          router.push(`/profile/${index + 1}`);
                        }}
                      >
                        <Td>Name {index + 1}</Td>
                        <Td>{index * 2}</Td>
                        <Td>{index + 2}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </Box>
          </Box>

          <Box
            padding="1.5rem"
            bg="rgba(255, 255, 255, 0.2)" // Semi-transparent white background
            borderRadius="8px"
            fontSize="18px"
            overflow="hidden"
            maxH="349px"
            boxShadow="0 8px 32px rgba(0, 0, 0, 0.37)" // Soft shadow for depth
            backdropFilter="blur(10px)" // Glassmorphism effect
            border="1px solid rgba(255, 255, 255, 0.18)" // Light border for frosted effect
            position="relative"
            mt="1rem"
          >
            {/* Title */}
            <Text fontSize="20px" fontWeight="bold" color="white" mb="1rem">
              Recent Activity
            </Text>

            {/* Scrolling Content */}
            <Box
              as="div"
              overflow="hidden"
              height="calc(100% - 3rem)" // Adjust height to stay below title
              position="relative"
            >
              <Box
                as="div"
                display="flex"
                flexDirection="column"
                gap="1rem"
                animation={`${scroll} 20s linear infinite`}
                _hover={{ animationPlayState: "paused" }}
              >
                {recentActivity.map((activity, index) => (
                  <Box
                    key={index}
                    bg="rgba(255, 255, 255, 0.2)"
                    p="1rem"
                    borderRadius="6px"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    color="white"
                    fontSize="16px"
                    _hover={{
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      color: "black",
                    }}
                    cursor="pointer"
                  >
                    {activity?.text || "No recent activity available"}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display="flex" gap="1rem" mt="3rem" width="100%">
        {/* First Box for Trending Projects */}

        {/* Second Box for Contributors with Scrollable Table */}
      </Box>
    </Box>
  );
};

export default Homedashboard;
