import LightDesktopImg from "../images/bg-desktop-light.jpg";
import LightMobileImg from "../images/bg-mobile-light.jpg";
import DarkDesktopImg from "../images/bg-desktop-dark.jpg";
import DarkMobileImg from "../images/bg-mobile-dark.jpg";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
  font-family: "Kumbh Sans", sans-serif;
  background-image: ${(props) =>
    props.displayMode === "light"
      ? `url(${LightDesktopImg})`
      : `url(${DarkDesktopImg})`};
  background-repeat: no-repeat;
  background-color: ${(props) =>
    props.displayMode === "light" ? "white" : "hsl(235, 24%, 19%)"};
  background-position: top;
  @media (max-width: 375px) {
    background-image: ${(props) =>
      props.displayMode === "light"
        ? `url(${LightMobileImg})`
        : `url(${DarkMobileImg})`};
  }
  }
`;

export default GlobalStyle;
