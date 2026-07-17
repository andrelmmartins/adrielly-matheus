import { Box } from "@chakra-ui/react";
import Cta from "@/sections/cta";
import Info from "@/sections/info";
import Gifts from "@/sections/gifts";
import Confirmation from "@/sections/confirmation";
import Copyright from "@/sections/copyright";

export default function HomePage() {
  return (
    <Box>
      <Cta />
      <Info />
      <Gifts />
      <Confirmation />
      <Copyright />
    </Box>
  );
}
