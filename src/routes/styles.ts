import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.greenPrimary};
`;

export const ImageLogo = styled.Image`
  height: 200px;
  width: 200px;
`;

export const ViewAnimate = styled.View`
  position: absolute;
  bottom: 1px;
  right: 1px;
`;
