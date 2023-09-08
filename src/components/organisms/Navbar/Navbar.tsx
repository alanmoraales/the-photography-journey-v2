import Heading from "@atoms/Heading";
import Grid from "@atoms/Grid";
import Flex from "@atoms/Flex";
import PageLimitContainer from "@atoms/PageLimitContainer";
import { NavbarLogo, NavbarLink } from "@atoms/Navbar";
import Link from "next/link";

const Navbar = () => {
  return (
    <PageLimitContainer>
      <Grid
        gap="lg"
        gridTemplateColumns={{
          base: "1fr",
          sm: "auto 1fr",
        }}
        alignItems="center"
      >
        <Link href="/">
          <Flex gap="md" alignItems="center">
            <NavbarLogo />
            <Heading>The Photography Journey</Heading>
          </Flex>
        </Link>
        {/** No index pages yet */}
        {/* <Flex
          gap="lg"
          alignItems="center"
          flexWrap="wrap"
          justifySelf={{
            base: "flex-start",
            sm: "flex-end",
          }}
          paddingLeft={{
            base: "41px",
            sm: "0",
          }}
        >
          <NavbarLink href="/prints">Prints</NavbarLink>
          <NavbarLink href="/posts">Blog</NavbarLink>
          <NavbarLink href="/gallery">Gallery</NavbarLink>
        </Flex> */}
      </Grid>
    </PageLimitContainer>
  );
};

export default Navbar;
