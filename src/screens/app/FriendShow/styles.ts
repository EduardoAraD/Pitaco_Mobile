import styled from 'styled-components/native';

interface Props {
  principal?: boolean;
}

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const ScrollBody = styled.ScrollView`
  flex: 1;
  padding-horizontal: 20px;
`;

export const TextTitle = styled.Text`
  font-size: 20px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.greenPrimary};
`;

export const ViewClub = styled.View`
  padding-vertical: 10px;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-bottom-color: ${(props) => props.theme.colors.textGray4};
`;

export const ViewClubName = styled.Text`
  font-size: 20px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const ViewClubImg = styled.Image`
  height: 50px;
  width: 50px;
`;

export const ScrollHorizontal = styled.ScrollView`
  margin-vertical: 10px;
  padding-bottom: 5px;
`;

export const ViewCards = styled.View`
  margin-top: 15px;
`;

export const ButtonStyle = styled.TouchableOpacity`
  height: 22px;
  width: 150px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonStyleNot = styled.TouchableOpacity`
  height: 22px;
  width: 150px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const TextButtonStyle = styled.Text`
  font-size: 10px;
  font-family: SairaSemiCondensed-Light;
`;

export const CardStyle = styled.View`
  height: 50px;
  width: 100%;
  flex-direction: row;
  padding: 5px;
  margin-vertical: 5px;
  border-radius: 10px;
  elevation: 1;
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const CardImg = styled.Image`
  height: 40px;
  width: 40px;
`;

export const CardInfo = styled.View`
  flex: 1;
  justify-content: space-between;
  margin-left: 10px;
`;

export const CardInfoTitle = styled.Text`
  font-size: 16px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.greenPrimary};
`;

export const CardInfoDono = styled.Text<Props>`
  font-size: 12px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) =>
    props.principal
      ? props.theme.colors.yellowPrimary
      : props.theme.colors.textGray3};
`;
