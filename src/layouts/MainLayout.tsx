import { ReactNode } from "react";
import styled from "styled-components";
import bgOffice from "../assets/bg-office.png";

interface MainLayoutProps {
  children: ReactNode;
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-image: url(${bgOffice});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  min-height: 100vh;
  width: 100%;
`;

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <LayoutContainer>
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutContainer>
  );
};

export default MainLayout;
