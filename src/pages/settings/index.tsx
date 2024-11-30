import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/particleBackground/Particlebackground";
import SettingDashboard from "../../components/settings/settingDashboard";
import { Box, Input, Text } from "@chakra-ui/react";
import React from "react";

const Index = () => {
  return (
    <Box>
      <Navbar />
      <ParticleBackground/>
      <SettingDashboard/>
    </Box>
  );
};

export default Index;
