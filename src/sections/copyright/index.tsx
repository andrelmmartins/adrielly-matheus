import { Box, Center, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Copyright() {
  return (

      <Center as="section" bg="pinkDark" h={150}>
        <Text color="white" fontFamily="mono" fontSize={"sm"}>
          Desenvolvido por{" "}
          <Link
            asChild
            color="white"
            textDecoration="underline"
            textUnderlineOffset="4px"
            _hover={{ opacity: 0.85 }}
          >
            <NextLink href="https://github.com/andrelmmartins/" target="_blank">
              André Martins
            </NextLink>
          </Link>
        </Text>
      </Center>
  );
}
