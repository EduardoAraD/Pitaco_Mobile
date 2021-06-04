import styled from 'styled-components/native';

interface Props {
  principal?: boolean;
}

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const ScrollStyle = styled.ScrollView`
  flex: 1;
  padding-horizontal: 20px;
`;

export const InfoUser = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

export const InfoImg = styled.Image`
  height: 100px;
  width: 100px;
  margin-right: 10px;
`;

export const InfoUserData = styled.View`
  flex: 1;
  justify-content: space-between;
  border-radius: 20px;
  align-items: center;
`;

export const InfoUserDataPoint = styled.View`
  flex-direction: row;
  width: 90%;
  justify-content: space-between;
`;

export const TextInfoPoint = styled.Text`
  font-family: SairaSemiCondensed-Medium;
  font-size: 16px;
  flex: 3;
  color: ${(props) => props.theme.colors.greenPrimary};
`;

export const TextInfoPointVal = styled.Text`
  font-family: SairaSemiCondensed-Medium;
  font-size: 16px;
  flex: 1;
  text-align: right;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const InfoUserButton = styled.TouchableOpacity`
  border-radius: 15px;
  height: 30px;
  elevation: 3;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.greenSecundary};
`;

export const TextInfoButton = styled.Text`
  font-family: SairaSemiCondensed-Medium;
  font-size: 14px;
  color: ${(props) => props.theme.colors.whitePrimary};
`;

export const TextTitle = styled.Text<Props>`
  font-size: 20px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) =>
    props.principal
      ? props.theme.colors.greenPrimary
      : props.theme.colors.textGray2};
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

export const ViewCardsLeague = styled.ScrollView`
  margin-top: 15px;
`;
