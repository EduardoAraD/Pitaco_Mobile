import styled from 'styled-components/native';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const ScrollStyle = styled.ScrollView`
  padding-horizontal: 20px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.textGray4};
`;

export const CardView = styled.View`
  height: 90px;
  border-radius: 10px;
  margin-vertical: 5px;
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const CardInfo = styled.View`
  padding: 5px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.textGray4};
`;

export const CardInfoImg = styled.Image`
  margin-horizontal: 5px;
  height: 50px;
  width: 50px;
`;

export const CardInfoUser = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const CardInfoUserName = styled.Text`
  font-size: 18px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const CardInfoUserClub = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const CardInfoUserClubeName = styled.Text`
  font-size: 12px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.textGray3};
`;

export const CardInfoUserClubeImg = styled.Image`
  height: 20px;
  width: 20px;
  margin-horizontal: 3px;
`;

export const CardAction = styled.View`
  padding: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface Props {
  principal?: boolean;
}

export const CardActionButton = styled.TouchableOpacity<Props>`
  height: 20px;
  width: 120px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.principal
      ? props.theme.colors.bluePrimary
      : props.theme.colors.textRed};
`;

export const CardActionButtonText = styled.Text`
  font-size: 10px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.textWhite};
`;
