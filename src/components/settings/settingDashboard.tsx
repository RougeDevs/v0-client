import {
    Avatar,
    Box,
    Button,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    Tooltip,
    VStack,
    Wrap,
    WrapItem,
  } from "@chakra-ui/react";
  import { useRouter } from "next/router";
  import React, { use, useEffect, useRef, useState } from "react";
  import DeleteAccountModal from "../Modals/DeleteAccountModal";
  import STRKLogo from "@/assets/icons/strk";
  import Image from "next/image";
  import TelegramIcon from "../../assets/telegramIcon.png";
  import { useAtom } from "jotai";
  import { userAtom } from "../../store/user.atom";
  import axios from "axios";
  import { toast } from "react-toastify";
  const SettingDashboard = () => {
    const router = useRouter();
    const [userData, setuserData] = useAtom(userAtom);
    const [skillSetDropdown, setskillSetDropdown] = useState<boolean>(false);
    const [categoryDropdownSelected, setcategoryDropdownSelected] =
      useState<boolean>(false);
    const [userCatgory, setuserCatgory] = useState([
      "Desginer",
      "Content Creator",
      "Developer Relations",
      "Growth/Marketing",
    ]);
    const [userCategorySelected, setuserCategorySelected] = useState("Select a category")
    const [userSelectedCategory, setuserSelectedCategory] = useState<any>([]);
    const [suggestionScreenshotFilename, setSuggestionScreenshotFilename] =
      useState("");
    const [skillSet, setskillSet] = useState([
      "Public Speaking",
      "Community Management",
      "Content Creation",
      "Technical Documentation",
      "API Design",
      "GitHub",
      "Event Planning",
      "Social Media Management",
      "Developer Advocacy",
      "Open Source Contribution",
      "UX Design",
      "UI Design",
      "Figma",
      "Photoshop",
      "Illustrator",
      "Sketch",
      "Wireframing",
      "Prototyping",
      "Responsive Design",
      "Color Theory",
      "SEO",
      "Video Editing",
      "Content Strategy",
      "Copywriting",
      "Podcasting",
      "Social Media Marketing",
      "Canva",
      "Final Cut Pro",
      "Hootsuite",
      "Analytics",
    ]);
    const [profileUpdated, setprofileUpdated] = useState(false)
  
    const [formData, setFormData] = useState({
      email: "",
      firstName: "",
      lastName: "",
      image: "",
      bio: "",
      tgHandle: "",
      experienceLevel: "",
      bestsuitedCategory: "",
      skillSet: [],
      socialMediaHandles: {
        twitter: "",
        linkedin: "",
        telegram: "",
        instagram: "",
        discord: "",
        youtube: "",
        reddit: "",
        behance: "",
        figma: "",
        dribbble: "",
        tiktok: "",
        facebook: "",
      },
      paymentWalletAddress: "",
    });
  
    useEffect(() => {
      if (userData !== null) {
        // Destructure userData and exclude unwanted fields
        const { projectsOwned, projectsModerated,ownedProjects,moderatedProjects, ...filteredData  }:any = userData;
        setFormData(filteredData);
      }
    }, [userData]);
  
    useEffect(()=>{
      try {
        const userLoginToken = localStorage.getItem("userLoginCode");
        if (userLoginToken && profileUpdated) {
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
              setuserData(res?.data?.data);
              setprofileUpdated(false)
            }
          };
          fetchUserData();
        }
      } catch (error) {
        console.log(error, "erro in fetching code");
      }
    },[profileUpdated])
    
  
    const areObjectsEqual = (obj1:any, obj2:any) => {
      // Replace 'socialMediaHandles' with an empty object in both objects
      const normalizedObj1 = {
        ...obj1,
        socialMediaHandles: {},
        moderatedProjects: [],
        ownedProjects:[],
        projectsModerated:[],
        projectsOwned:[]
      };
      const normalizedObj2 = {
        ...obj2,
        socialMediaHandles: {},
        moderatedProjects: [],
        ownedProjects:[],
        projectsModerated:[],
        projectsOwned:[]
      };
    
      // Use lodash's isEqual for a deep comparison
      return normalizedObj1===normalizedObj2;
    };
  
    useEffect(()=>{
      areObjectsEqual(userData,formData)
      
    },[formData])
  
  
  
    const [selectedSkillSet, setSelectedSkillSet] = useState<any>([]);
    const [contentCreatorTabSelected, setcontentCreatorTabSelected] =
      useState(false);
    const [designerTabSelected, setdesignerTabSelected] = useState(false);
    const [suggestionUrl, setSuggestionUrl] = useState("");
    const [starknetWalletAddress, setstarknetWalletAddress] = useState("");
    const suggestioninputref: any = useRef();
    const [count, setCount] = useState(0);
    const ApplicationList = [
      {
        id: 1,
        name: "Reddit",
      },
      {
        id: 2,
        name: "TikTok",
      },
      {
        id: 3,
        name: "LinkedIn",
      },
      {
        id: 4,
        name: "Pinterest",
      },
      {
        id: 5,
        name: "Starknet",
      },
    ];
    const [applicationDropdownSelected, setapplicationDropdownSelected] =
      useState(false);
    const [
      applicationDropdownIndexSelected,
      setapplicationDropdownIndexSelected,
    ] = useState<number>(0);
    const [selectedApplications, setSelectedApplications] = useState<any>({});
    const handleApplicationSelect = (index: any, name: any, id: any) => {
      setSelectedApplications((prev: any) => ({
        ...prev,
        [index]: { name, id },
      }));
      setapplicationDropdownSelected(false); // Close dropdown on selection
    };
    // console.log(formData,'applications')
    const handleImageUploadSugegstion = (e: any) => {
      const file = e.target.files[0];
  
      if (file) {
        setSuggestionScreenshotFilename(file.name);
        // Read the selected image file as a base64 string
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event?.target?.result) {
            setSuggestionUrl(event.target.result as string);
            setFormData((prevData: any) => ({
              ...prevData,
              image: event?.target?.result, 
            }));
            //    //console.log("base64:-",event.target.result);
            ////console.log("sugg  url(upload):-=",event.target.result)
          }
        };
        reader.readAsDataURL(file);
      } else {
      }
    };
    const [level, setLevel] = useState(0); // 0: Beginner, 1: Intermediate, 2: Advanced
    const levels = ["Beginner", "Intermediate", "Advanced"];
    const [experienceLevel, setexperienceLevel] = useState(
      "Select your exp level"
    );
    const [experienceLevelDropdown, setexperienceLevelDropdown] = useState(false);
    const [socialMediaIds, setSocialMediaIds] = useState<any>({
      twitter: "",
      linkedin: "",
      telegram: "",
      instagram: "",
      discord: "",
      youtube: "",
      reddit: "",
      behance: "",
      figma: "",
      dribbble: "",
      tiktok: "",
      facebook: "",
    });
  
    const handlesocialMediaIdsocialLinksChange = (e: any) => {
      const { name, value } = e.target;
      setSocialMediaIds((prev: any) => ({ ...prev, [name]: value }));
    };
  
    const baseUrls: any = {
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/in/",
      telegram: "https://t.me/",
      instagram: "https://instagram.com/",
      discord: "https://discord.com/users/",
      youtube: "https://youtube.com/@",
      reddit: "https://reddit.com/user/",
      behance: "https://behance.net/",
      figma: "https://figma.com/@",
      dribbble: "https://dribbble.com/",
      tiktok: "https://tiktok.com/@",
      facebook: "https://facebook.com/",
    };
  
    useEffect(() => {
      setFormData((prevData: any) => ({
        ...prevData,
        socialMediaHandles: socialMediaIds,
      }));
    }, [socialMediaIds]);
  
    const handleInputChange = (e: any) => {
      const { name, value, type, checked, files } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]:
          type === "checkbox" ? checked : type === "file" ? files[0] : value,
      }));
    };
  
    const handleSelectOption = (option: any, dropdown: any) => {
      if (dropdown === "category") {
        if (!userSelectedCategory.includes(option)) {
          setuserSelectedCategory([...userSelectedCategory, option]);
          setuserCatgory(userCatgory.filter((opt) => opt !== option));
        }
      } else if (dropdown === "skills") {
        if (!selectedSkillSet.includes(option)) {
          setSelectedSkillSet([...selectedSkillSet, option]);
          setskillSet(skillSet.filter((opt) => opt !== option));
        }
      }
    };
  
    const removeOption = (option: any, dropdown: any) => {
      if (dropdown === "category") {
        setuserSelectedCategory(
          userSelectedCategory.filter((opt: any) => opt !== option)
        );
        setuserCatgory([...userCatgory, option]);
      } else if (dropdown === "skills") {
        setSelectedSkillSet(
          selectedSkillSet.filter((opt: any) => opt !== option)
        );
        setskillSet([...skillSet, option]);
      }
    };
  
    const handleSubmit = async() => {
      try {
        const userLoginToken = localStorage.getItem("userLoginCode");
        const res=await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API}/user`,formData,{
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${userLoginToken}`,
          },
        })
        toast.success("Profile updated successfully",{
          position:'bottom-right'
        })
        setprofileUpdated(true)
      } catch (error) {
        toast.error("Error in updating profile",{
          position:'bottom-right'
        })
        console.log(error,'err in send request')
      }
      // fetch("/api/socialMedia", {
      //   method: "POST",
      //   body: JSON.stringify(fullLinks),
      //   headers: {
      //     "Content-Type": "application/json"
      //   }
      // });
    };
  
    useEffect(() => {
        setFormData((prevData: any) => ({
          ...prevData,
          skillSet: selectedSkillSet,
        }));
    }, [selectedSkillSet]);
  
    return (
      <Box display="flex" padding="64px" gap="4rem">
        <Box
          display="flex"
          flexDirection="column"
          gap="1rem"
          width="100%"
          mt="2rem"
        >
          <Box>
            <Text fontSize="24px">Settings</Text>
          </Box>
          <Box>
            <Tabs>
              <TabList>
                <Tab>Profile</Tab>
                <Tab>Payment Info</Tab>
              </TabList>
              <TabPanels>
                <TabPanel p="0" m="0" mt="2rem">
                  <Box bg="grey" padding="2rem" borderRadius="6px">
                    <Text fontSize="24px">Profile Details</Text>
                    <Text>Info on the profile details</Text>
                    <Box
                      mt="1rem"
                      bg="beige"
                      borderRadius="6px"
                      width="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text ml="1rem" whiteSpace="nowrap">
                        Avatar
                      </Text>
                      <Avatar
                        name="Dan Abrahmov"
                        src="https://bit.ly/dan-abramov"
                        size="sm"
                        ml="1rem"
                      />
                      <Input
                        type="file"
                        accept="image/*"
                        style={{
                          paddingTop: "0.3rem",
                          marginLeft: "0.4rem",
                          border: "none",
                        }}
                        name="image"
                        onChange={handleImageUploadSugegstion}
                      />
                    </Box>
                    <Box display="flex" gap="1rem">
                      <Box
                        mt="1rem"
                        bg="beige"
                        borderRadius="6px"
                        width="100%"
                        display="flex"
                        alignItems="center"
                      >
                        <Text ml="1rem" whiteSpace="nowrap">
                          First Name
                        </Text>
                        <Input
                          placeholder="Add a title"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          border="0px"
                          outline="none"
                          _focus={{
                            outline: "0",
                            boxShadow: "none",
                          }}
                        />
                      </Box>
                      <Box
                        mt="1rem"
                        bg="beige"
                        borderRadius="6px"
                        width="100%"
                        display="flex"
                        alignItems="center"
                      >
                        <Box ml="1rem" whiteSpace="nowrap">
                          Last Name
                        </Box>
                        <Input
                          placeholder="Add a title"
                          required
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          border="0px"
                          outline="none"
                          _focus={{
                            outline: "0",
                            boxShadow: "none",
                          }}
                        />
                      </Box>
                    </Box>
                    <Box
                      mt="1rem"
                      bg="beige"
                      borderRadius="6px"
                      width="100%"
                      display="flex"
                      alignItems="center"
                    >
                      <Text ml="1rem" whiteSpace="nowrap">
                        Email
                      </Text>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        border="0px"
                        outline="none"
                        _focus={{
                          outline: "0",
                          boxShadow: "none",
                        }}
                      />
                    </Box>
                    <Box
                      mt="1rem"
                      bg="beige"
                      borderRadius="6px"
                      width="100%"
                      display="flex"
                      alignItems="center"
                    >
                      <Text ml="1rem" whiteSpace="nowrap">
                        Bio
                      </Text>
                      <Input
                        placeholder="Add a title"
                        required
                        border="0px"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        outline="none"
                        _focus={{
                          outline: "0",
                          boxShadow: "none",
                        }}
                      />
                    </Box>
                    <Box
                      mt="1rem"
                      bg="beige"
                      borderRadius="6px"
                      width="100%"
                      display="flex"
                      alignItems="center"
                    >
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Image
                            src={TelegramIcon}
                            alt="telegram"
                            width={60}
                            height={60}
                          />
                          {/* Alternatively, you can use width and height explicitly */}
                          {/* width="20px" height="20px" */}
                        </InputLeftElement>
                        <Input
                          type="text"
                          placeholder="Enter your telegram handle"
                          ml="0.7rem"
                          name="tgHandle"
                          value={formData.tgHandle}
                          onChange={handleInputChange}
                          outline="none"
                          border="0px"
                          _focus={{
                            outline: "0",
                            boxShadow: "none",
                          }}
                        />
                      </InputGroup>
                    </Box>
                  </Box>
                  <Box
                    mt="1rem"
                    bg="grey"
                    borderRadius="6px"
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    padding="2rem"
                  >
                    <Box>
                      <Text fontSize="24px">
                        How Would You Describe Your Experience?
                      </Text>
                      <Text>
                        Help us understand your expertise to tailor your
                        experience.
                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                      justifyContent="space-between"
                      py="2"
                      pl="3"
                      pr="3"
                      bg="beige"
                      // mb="1rem"
                      // mt="0.3rem"
                      mt="1rem"
                      borderRadius="md"
                      className="navbar"
                      cursor="pointer"
                      fontSize="sm"
                      position="relative"
                      onClick={() => {
                        setexperienceLevelDropdown(!experienceLevelDropdown);
                        // setapplicationDropdownSelected(
                        //   !applicationDropdownSelected
                        // );
                        // setapplicationDropdownIndexSelected(index);
                      }}
                    >
                      <Box display="flex" gap="1" userSelect="none">
                        <Text color="black">{experienceLevel}</Text>
                      </Box>
  
                      <Box pt="1" className="navbar-button">
                        Drop
                      </Box>
  
                      {experienceLevelDropdown && (
                        <Box
                          position="absolute"
                          top="100%" // Align below the button
                          left="0"
                          mt="0.2rem"
                          zIndex="1000" // Ensure it appears on top
                          bg="beige"
                          borderRadius="6px"
                          border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                          py="2"
                          className="dropdown-container"
                          boxShadow="dark-lg"
                          height="120px"
                          overflowY="auto"
                          userSelect="none"
                          width="100%" // Ensure it has the same width as the button
                        >
                          {levels?.map((level, indexList) => {
                            return (
                              <Box
                                key={indexList}
                                as="button"
                                w="full"
                                alignItems="center"
                                gap="1"
                                pr="2"
                                display="flex"
                                onClick={() => {
                                  setexperienceLevel(level);
                                  setFormData((prevData: any) => ({
                                    ...prevData,
                                    experienceLevel: level,
                                  }));
                                }}
                              >
                                <Box
                                  w="full"
                                  display="flex"
                                  py="5px"
                                  px="6px"
                                  gap="1"
                                  justifyContent="space-between"
                                  borderRadius="md"
                                  _hover={{ bg: "#676D9A4D" }}
                                  ml=".4rem"
                                >
                                  <Text color="black" ml=".6rem">
                                    {level}
                                  </Text>
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Box
                    mt="1rem"
                    bg="grey"
                    borderRadius="6px"
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    padding="2rem"
                  >
                    <Box>
                      <Text fontSize="24px">Describe your skillset</Text>
                      <Text>
                        Help us understand your expertise to tailor your
                        experience.
                      </Text>
                    </Box>
                    <Box mt="1rem" mb="0.4rem">
                      <Text fontWeight="500">
                        Please tell us what describes you best
                      </Text>
                    </Box>
                    <Box width="100%">
                      <Box
                        display="flex"
                        border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                        justifyContent="space-between"
                        py="2"
                        pl="3"
                        pr="3"
                        borderRadius="md"
                        bg="beige"
                        mb="1rem"
                        className="navbar"
                        cursor="pointer"
                        fontSize="sm"
                        position="relative"
                        onClick={() => {
                          setcategoryDropdownSelected(!categoryDropdownSelected);
                          setskillSetDropdown(false);
                        }}
                      >
                        <Box display="flex" gap="1" userSelect="none">
                          <Text color="black">{userCategorySelected}</Text>
                        </Box>
  
                        <Box pt="1" className="navbar-button">
                          Drop
                        </Box>
  
                        {categoryDropdownSelected && userCatgory.length !== 0 && (
                          <Box
                            position="absolute"
                            top="100%" // Align below the button
                            left="0"
                            zIndex="1000" // Ensure it appears on top
                            bg="beige"
                            mt="0.4rem"
                            borderRadius="6px"
                            border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                            py="2"
                            className="dropdown-container"
                            boxShadow="dark-lg"
                            height="120px"
                            overflowY="auto"
                            userSelect="none"
                            width="100%" // Ensure it has the same width as the button
                          >
                            {userCatgory?.map((category, indexList) => {
                              return (
                                <Box
                                  key={indexList}
                                  as="button"
                                  w="full"
                                  alignItems="center"
                                  gap="1"
                                  pr="2"
                                  display="flex"
                                  onClick={() => {
                                    setuserCategorySelected(category)
                                    setFormData((prevData: any) => ({
                                      ...prevData,
                                      bestsuitedCategory: category, 
                                    }));
                                  }}
                                >
                                  <Box
                                    w="full"
                                    display="flex"
                                    py="5px"
                                    px="6px"
                                    gap="1"
                                    justifyContent="space-between"
                                    borderRadius="md"
                                    _hover={{ bg: "#676D9A4D" }}
                                    ml=".4rem"
                                  >
                                    <Text color="black" ml=".6rem">
                                      {category}
                                    </Text>
                                  </Box>
                                </Box>
                              );
                            })}
                          </Box>
                        )}
                      </Box>
                      <Box mt="1rem" mb="0.4rem">
                        <Text fontWeight="500">Please select your skills</Text>
                      </Box>
  
                      <Box
                        display="flex"
                        border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                        justifyContent="space-between"
                        py="2"
                        pl="3"
                        pr="3"
                        bg="beige"
                        borderRadius="md"
                        className="navbar"
                        cursor="pointer"
                        fontSize="sm"
                        position="relative"
                        onClick={() => {
                          setskillSetDropdown(!skillSetDropdown);
                          setcategoryDropdownSelected(false);
                        }}
                      >
                        <Box display="flex" gap="1" userSelect="none">
                          <Text color="black">Select Tags</Text>
                        </Box>
  
                        <Box pt="1" className="navbar-button">
                          Drop
                        </Box>
  
                        {skillSetDropdown && skillSet.length !== 0 && (
                          <Box
                            position="absolute"
                            top="100%" // Align below the button
                            left="0"
                            zIndex="1000" // Ensure it appears on top
                            bg="beige"
                            mt="0.4rem"
                            borderRadius="6px"
                            border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                            py="2"
                            className="dropdown-container"
                            boxShadow="dark-lg"
                            height="120px"
                            overflowY="auto"
                            userSelect="none"
                            width="100%" // Ensure it has the same width as the button
                          >
                            {skillSet?.map((skill, indexList) => {
                              return (
                                <Box
                                  key={indexList}
                                  as="button"
                                  w="full"
                                  alignItems="center"
                                  gap="1"
                                  pr="2"
                                  display="flex"
                                  onClick={() => {
                                    handleSelectOption(skill, "skills");
                                  }}
                                >
                                  <Box
                                    w="full"
                                    display="flex"
                                    py="5px"
                                    px="6px"
                                    gap="1"
                                    justifyContent="space-between"
                                    borderRadius="md"
                                    _hover={{ bg: "#676D9A4D" }}
                                    ml=".4rem"
                                  >
                                    <Text color="black" ml=".6rem">
                                      {skill}
                                    </Text>
                                  </Box>
                                </Box>
                              );
                            })}
                          </Box>
                        )}
                      </Box>
  
                      {/* Selected tags displayed below the dropdown */}
                      {selectedSkillSet.length > 0 && (
                        <Wrap spacing={2} mt={4}>
                          {selectedSkillSet.map((option: any, index: number) => (
                            <WrapItem key={index}>
                              <Tag
                                size="md"
                                colorScheme="blue"
                                borderRadius="full"
                              >
                                <TagLabel>{option}</TagLabel>
                                <TagCloseButton
                                  onClick={() => removeOption(option, "skills")}
                                />
                              </Tag>
                            </WrapItem>
                          ))}
                        </Wrap>
                      )}
  
                      {/* Button to remove all selected tags */}
                      {selectedSkillSet.length > 0 && (
                        <Button
                          mt={4}
                          colorScheme="red"
                          onClick={() => {
                            // Add all selected items back to skillSet
                            setskillSet((prev) => [...prev, ...selectedSkillSet]);
  
                            // Clear the selectedSkillSet array
                            setSelectedSkillSet([]);
                          }}
                        >
                          Remove All Tags
                        </Button>
                      )}
                    </Box>
                  </Box>
                  <Box bg="grey" padding="2rem" borderRadius="6px" mt="1rem">
                    <Text fontSize="24px" fontWeight="500">
                      More contact info
                    </Text>
                    <Text>
                      Please provide us with some of your social Media handles
                    </Text>
                    {
                      <Box>
                        <Box width="100%" display="flex" gap="1rem">
                          <Box
                            mt="1rem"
                            bg="beige"
                            borderRadius="6px"
                            width="100%"
                          >
                            <InputGroup>
                              <InputLeftElement pointerEvents="none">
                                Icon
                              </InputLeftElement>
                              <Input
                                type="number"
                                name="whatsapp"
                                placeholder="WhatsApp"
                                border="none"
                                outline="none"
                                _focus={{
                                  outline: "0",
                                  boxShadow: "none",
                                }}
                                value={socialMediaIds.whatsapp}
                                onChange={handlesocialMediaIdsocialLinksChange}
                              />
                            </InputGroup>
                          </Box>
                          <Box
                            mt="1rem"
                            bg="beige"
                            borderRadius="6px"
                            width="100%"
                          >
                            <InputGroup>
                              <InputLeftElement pointerEvents="none">
                                Icon
                              </InputLeftElement>
                              <Input
                                type="text"
                                name="twitter"
                                placeholder="Twitter"
                                border="none"
                                outline="none"
                                _focus={{
                                  outline: "0",
                                  boxShadow: "none",
                                }}
                                value={socialMediaIds.twitter}
                                onChange={handlesocialMediaIdsocialLinksChange}
                              />
                            </InputGroup>
                          </Box>
                        </Box>
  
                        <Box display="flex" width="100%" gap="1rem">
                          <Box
                            mt="1rem"
                            bg="beige"
                            borderRadius="6px"
                            width="100%"
                          >
                            <InputGroup>
                              <InputLeftElement pointerEvents="none">
                                Icon
                              </InputLeftElement>
                              <Input
                                type="text"
                                name="discord"
                                placeholder="Discord"
                                border="none"
                                outline="none"
                                _focus={{
                                  outline: "0",
                                  boxShadow: "none",
                                }}
                                value={socialMediaIds.discord}
                                onChange={handlesocialMediaIdsocialLinksChange}
                              />
                            </InputGroup>
                          </Box>
                          <Box
                            mt="1rem"
                            bg="beige"
                            borderRadius="6px"
                            width="100%"
                          >
                            <InputGroup>
                              <InputLeftElement pointerEvents="none">
                                Icon
                              </InputLeftElement>
                              <Input
                                type="text"
                                name="medium"
                                placeholder="Medium"
                                border="none"
                                outline="none"
                                _focus={{
                                  outline: "0",
                                  boxShadow: "none",
                                }}
                                value={socialMediaIds.medium}
                                onChange={handlesocialMediaIdsocialLinksChange}
                              />
                            </InputGroup>
                          </Box>
                        </Box>
  
                        <Box display="flex" width="100%" gap="1rem">
                          <Box
                            mt="1rem"
                            bg="beige"
                            borderRadius="6px"
                            width="100%"
                          >
                            <InputGroup>
                              <InputLeftElement pointerEvents="none">
                                Icon
                              </InputLeftElement>
                              <Input
                                type="text"
                                name="youtube"
                                placeholder="YouTube"
                                border="none"
                                outline="none"
                                _focus={{
                                  outline: "0",
                                  boxShadow: "none",
                                }}
                                value={socialMediaIds.youtube}
                                onChange={handlesocialMediaIdsocialLinksChange}
                              />
                            </InputGroup>
                          </Box>
                          <Box
                            mt="1rem"
                            bg="beige"
                            borderRadius="6px"
                            width="100%"
                          >
                            <InputGroup>
                              <InputLeftElement pointerEvents="none">
                                Icon
                              </InputLeftElement>
                              <Input
                                type="text"
                                name="figma"
                                border="none"
                                outline="none"
                                _focus={{
                                  outline: "0",
                                  boxShadow: "none",
                                }}
                                placeholder="Figma"
                                value={socialMediaIds.figma}
                                onChange={handlesocialMediaIdsocialLinksChange}
                              />
                            </InputGroup>
                          </Box>
                        </Box>
                      </Box>
                    }
                    {
                      <Box
                        bg="black"
                        alignItems="center"
                        gap="1rem"
                        width="100%"
                        mt="1rem"
                        borderRadius="6px"
                      >
                        {[...Array(count)].map((_, index) => (
                          <Box
                            key={index}
                            display="flex"
                            alignItems="center"
                            gap="1rem"
                            padding="1rem"
                          >
                            <Box minWidth="277px">
                              <Box
                                color="#676D9A"
                                display="flex"
                                alignItems="center"
                                userSelect="none"
                              ></Box>
  
                              <Box
                                display="flex"
                                border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                                justifyContent="space-between"
                                py="2"
                                pl="3"
                                pr="3"
                                // mb="1rem"
                                // mt="0.3rem"
                                ml="0.4rem"
                                borderRadius="md"
                                className="navbar"
                                cursor="pointer"
                                fontSize="sm"
                                position="relative"
                                onClick={() => {
                                  setapplicationDropdownSelected(
                                    !applicationDropdownSelected
                                  );
                                  setapplicationDropdownIndexSelected(index);
                                }}
                              >
                                <Box display="flex" gap="1" userSelect="none">
                                  <Text color="white">
                                    {selectedApplications[index]?.name ||
                                      "Select Application"}
                                  </Text>
                                </Box>
  
                                <Box pt="1" className="navbar-button">
                                  chack
                                </Box>
  
                                {applicationDropdownSelected &&
                                  index === applicationDropdownIndexSelected && (
                                    <Box
                                      position="absolute"
                                      top="100%" // Align below the button
                                      left="0"
                                      zIndex="1000" // Ensure it appears on top
                                      bg="beige"
                                      border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                                      py="2"
                                      color="black"
                                      className="dropdown-container"
                                      boxShadow="dark-lg"
                                      height="120px"
                                      overflowY="auto"
                                      userSelect="none"
                                      width="100%" // Ensure it has the same width as the button
                                    >
                                      {ApplicationList?.filter(
                                        (app) =>
                                          !Object.values(
                                            selectedApplications
                                          ).some(
                                            (selectedApplications: any) =>
                                              selectedApplications.name ===
                                              app.name
                                          )
                                      ).map(({ name, id }, indexList) => {
                                        return (
                                          <Box
                                            key={index}
                                            as="button"
                                            w="full"
                                            alignItems="center"
                                            gap="1"
                                            pr="2"
                                            display="flex"
                                            onClick={() =>
                                              handleApplicationSelect(
                                                index,
                                                name,
                                                id
                                              )
                                            }
                                          >
                                            <Box
                                              w="full"
                                              display="flex"
                                              py="5px"
                                              px="6px"
                                              gap="1"
                                              justifyContent="space-between"
                                              borderRadius="md"
                                              _hover={{ bg: "#676D9A4D" }}
                                              ml=".4rem"
                                            >
                                              <Text color="black" ml=".6rem">
                                                {name}
                                              </Text>
                                            </Box>
                                          </Box>
                                        );
                                      })}
                                    </Box>
                                  )}
                              </Box>
                            </Box>
  
                            <Box width="full">
                              <Box>
                                <Input
                                  border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                                  placeholder={"Enter your user handle"}
                                  fontSize="sm"
                                  name={selectedApplications[index]?.name}
                                  value={
                                    socialMediaIds[
                                      selectedApplications[index]?.name
                                    ]
                                  }
                                  onChange={handlesocialMediaIdsocialLinksChange}
                                  _placeholder={{ color: "#676D9A" }}
                                  color="#f2f2f2"
                                />
                              </Box>
                            </Box>
  
                            <Box
                              mt=".3rem"
                              display="flex"
                              alignItems="center"
                              gap=".5rem"
                            >
                              <Button
                                backgroundColor="#676D9A1A"
                                border="1px solid #676D9A4D"
                                _hover={{ backgroundColor: "transparent" }}
                                color="#f2f2f2"
                                onClick={() => {
                                   setCount(count - 1);
                                }}
                                // isDisabled={count === 1}
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13 1L7 7M7 7L1 13M7 7L13 13M7 7L1 1"
                                    stroke="#F0F0F5"
                                    stroke-width="1.31"
                                    stroke-linecap="round"
                                  />
                                </svg>
                              </Button>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    }
  
                    {
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                        gap=".8rem"
                        mt=".8rem"
                      >
                        <Button
                          backgroundColor="transparent"
                          border="1px solid #676D9A4D"
                          _hover={{ backgroundColor: "#676D9A1A" }}
                          color="#f2f2f2"
                          display="flex"
                          alignItems="center"
                          justifyContent="flex-start"
                          width="16rem"
                          height="2.3rem"
                          alignSelf="flex-start"
                          onClick={() => {
                            count < 7 && setCount(count + 1);
                          }}
                          _disabled={{ opacity: "0.5", cursor: "not-allowed" }}
                          isDisabled={count >= 7}
                        >
                          <svg
                            style={{ marginRight: ".3rem" }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 6L12 12M12 12V18M12 12H18M12 12H6"
                              stroke="#F0F0F5"
                              stroke-width="1.37"
                              stroke-linecap="round"
                            />
                          </svg>
                          <Text fontSize="14px">Connect Another Social</Text>
                        </Button>
                      </Box>
                    }
                  </Box>
                  {userData && <Box bg="grey" padding="2rem" borderRadius="6px" mt="2rem">
                    <Text fontSize="24px">Danger Zone</Text>
                    <Text>Only come into this area if you are depressed</Text>
                    <DeleteAccountModal
                      buttonText="Delete Account"
                      bg="red"
                      mt="1rem"
                    />
                  </Box>}
                </TabPanel>
                <TabPanel p="0" m="0" mt="2rem">
                  <Box bg="grey" padding="2rem" borderRadius="6px">
                    <Text fontSize="24px">Payment Info details</Text>
                    <Text>Info on the payment details</Text>
                    <Box display="flex" gap="1rem">
                      <Box
                        mt="1rem"
                        bg="beige"
                        borderRadius="6px"
                        width="100%"
                        display="flex"
                        // alignItems="center"
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          ml="0.5rem"
                          gap="0.3rem"
                        >
                          <STRKLogo width={16} height={16} />
                          <Text whiteSpace="nowrap">Starknet Wallet address</Text>
                        </Box>
                        <Input
                          placeholder="Add your starknet wallet address"
                          required
                          border="0px"
                          outline="none"
                          name="paymentWalletAddress"
                          value={formData.paymentWalletAddress}
                          onChange={handleInputChange}
                          _focus={{
                            outline: "0",
                            boxShadow: "none",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
            <Box
              bg="grey"
              display="flex"
              justifyContent="space-between"
              gap="2rem"
              padding="2rem"
              mt="1rem"
              borderRadius="6px"
              width="100%"
            >
              {<Box>{!areObjectsEqual(userData,formData)?"Changes Made":"No Updates"}</Box>}
              <Box display="flex" gap="2rem">
                <Box>
                  <Button
                    onClick={() => {
                      window.open("/profile/id", "_blank");
                    }}
                  >
                    Review Profile
                  </Button>
                </Box>
                <Box>
                  <Button
                    onClick={() => {
                      handleSubmit();
                    }}
                    isDisabled={areObjectsEqual(userData,formData)}
                  >
                    Make Changes
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default SettingDashboard;
  