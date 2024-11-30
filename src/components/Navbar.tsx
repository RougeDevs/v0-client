import { Avatar, Box, Text } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import SignInModal from "./Modals/SignInModal";
import Image from "next/image";
import { userAtom } from "../store/user.atom";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { BellIcon } from "@chakra-ui/icons";
import kremaraLogo from "../assets/kremaraLogo.png";
import { Notification } from "@/interfaces/interface";
import axios from "axios";
const Navbar = () => {
  const router = useRouter();
  const [profileDropdownSelected, setprofileDropdownSelected] = useState(false);
  const userData = useAtomValue<any>(userAtom);
  const [loading, setloading] = useState(true);
  const setUserData = useSetAtom(userAtom);
  const [notificationCenter, setnotificationCenter] = useState<boolean>(false);
  const [notifications, setnotifications] = useState<Notification[]>([]);

  useEffect(()=>{
    try {
      const fetchNotification=async()=>{
        const userLoginToken = localStorage.getItem("userLoginCode");
        if(userLoginToken){
          const res=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/notification`,{
            headers: {
              "ngrok-skip-browser-warning": "69420",
              Authorization: `Bearer ${userLoginToken}`
            },
          })
          setnotifications(res.data.notifications)
        }
      }
      fetchNotification() 
    } catch (error) {
      console.log(error,'err in notification')
    }
  },[])
  console.log(notifications,'notii ')
  //   {
  //     "name": "Sahitya Nijhawan",
  //     "email": "sahityanijhawan@gmail.com",
  //     "image": "https://lh3.googleusercontent.com/a/ACg8ocI69TCXC9_BxAFH_sKiTzRsFquvkapnMIas7SO-Y_drqvIHVw=s96-c"
  // }
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      padding="16px 32px"
      bg="#1E1E1E"
      width="100%"
      zIndex="100"
      position="fixed"
    >
      <Box display="flex" gap="2rem">
        <Box
          cursor="pointer"
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={() => {
            router.push("/");
          }}
        >
          <Image src={kremaraLogo} alt="" width={100} height={100} />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
          cursor="pointer"
          fontSize="20px"
        >
          <Box
            onClick={() => {
              router.push("/");
            }}
            color={router.pathname == "/" ? "#FFFFFF" : "#FFFFFF"}
          >
            Home
          </Box>
          <Box
            onClick={() => {
              router.push("/projects");
            }}
            color={router.pathname == "/projects" ? "#fff" : "#fff"}
            cursor="pointer"
          >
            Projects
          </Box>
          <Box
            onClick={() => {
              router.push("/rewards");
            }}
            color='#fff'
            cursor="pointer"
          >
            Rewards
          </Box>
        </Box>
      </Box>
      <Box display="flex" gap="1rem" mr="2rem">
        <Box
          fontSize="20px"
          cursor="pointer"
          onClick={() => {
            setprofileDropdownSelected(false);
            if (notifications.length > 0) {
              setnotificationCenter(!notificationCenter);
            }
          }}
        >
          <BellIcon color="white" />
        </Box>
        {notificationCenter && (
          <Box
            width="200px"
            position="fixed"
            right="4%"
            zIndex={100}
            top="16"
            bg="#2C2C2C"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            gap="18px"
            padding="0.7rem 1rem"
            boxShadow="1px 2px 8px rgba(0, 0, 0, 0.5), 4px 8px 24px #010409"
            borderRadius="6px"
            border="1px solid rgba(103, 109, 154, 0.30)"
            className="dropdown-container"
            userSelect="none"
          >
            {notifications.map((notification: any, index: number) => (
              <Box key={index}>
                <Text color="white">
                  {notification.message}
                </Text>
              </Box>
            ))}
          </Box>
        )}

        {userData && (
          <Box
            onClick={() => {
              setnotificationCenter(false);
              setprofileDropdownSelected(!profileDropdownSelected);
            }}
          >
            <Box
              cursor="pointer"
              display="flex"
              justifyContent="center"
              border="1px solid #CCCCCC"
              padding="6px 10px"
              borderRadius="6px"
              gap="0.5rem"
            >
              <Image
                src={userData?.image}
                alt=""
                width={24}
                height={24}
                style={{ borderRadius: "20px" }}
              />
              <Text color="#CCCCCC">{userData?.firstName +" "+ (userData?.lastName ?userData.lastName:"")}</Text>
            </Box>
            {profileDropdownSelected && (
              <Box
                position="fixed"
                zIndex="200"
                right="4%"
                gap="1rem"
                mt="0.65rem"
                // width="200px"
                padding="16px"
                borderRadius="6px"
                display="flex"
                flexDirection="column"
                bg="#2C2C2C"
              >
                <Box
                  display="flex"
                  padding="6px"
                  borderRadius="6px"
                  gap="0.5rem"
                >
                  <Image
                    src={userData?.image}
                    alt=""
                    width={24}
                    height={24}
                    style={{ borderRadius: "20px" }}
                  />
                  <Text color="#CCCCCC">{userData?.firstName +" "+ (userData?.lastName ?userData.lastName:"")}</Text>
                </Box>
                <Box
                  onClick={() => {
                    setprofileDropdownSelected(!profileDropdownSelected);
                    router.push("/settings");
                  }}
                  color=
                  "white"
                  cursor="pointer"
                >
                  Settings
                </Box>
                <Box
                  onClick={() => {
                    setprofileDropdownSelected(!profileDropdownSelected);
                    router.push(`profile/sahi`);
                  }}
                  color="white"
                  cursor="pointer"
                >
                  Public Profile
                </Box>
                <Box
                  onClick={() => {
                    localStorage.setItem("userLoginCode", "");
                    setUserData(null)
                  }}
                  cursor="pointer"
                  color="red.600"
                >
                  Log out
                </Box>
              </Box>
            )}
          </Box>
        )}
        {!userData && <SignInModal buttonText="Sign In" />}
      </Box>
    </Box>
  );
};

export default Navbar;
