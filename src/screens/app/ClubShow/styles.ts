import styled from 'styled-components/native';

interface Props {
  colorGreen?: boolean;
}

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const Container = styled.View`
  flex: 1;
  margin: 20px;
  justify-content: space-around;
  align-items: center;
`;

export const ImgStyle = styled.Image`
  margin-top: 10px;
  height: 200px;
  width: 200px;
`;

export const TextStyle = styled.Text<Props>`
  font-family: SairaSemiCondensed-Bold;
  font-size: 22;
  margin-bottom: 20px;
  color: ${(props) =>
    props.colorGreen
      ? props.theme.colors.greenPrimary
      : props.theme.colors.textGray2};
`;

export const CardStyle = styled.View`
  height: 40px;
  padding: 5px;
  margin-vertical: 5px;
  align-items: center;
  border-radius: 10px;
  flex-direction: row;
  elevation: 1;
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const CardImg = styled.Image`
  height: 30px;
  width: 30px;
  margin-horizontal: 5px;
`;

export const CardText = styled.Text`
  font-size: 18px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const ViewInfo = styled.View`
  border-top-width: 1px;
  width: 100%;
  border-top-color: ${(props) => props.theme.colors.textGray4};
`;

export const TitleTextInfo = styled.Text`
  margin-top: 10px;
  font-size: 20px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.greenPrimary};
`;

export const LoadingStyle = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
