import styled from 'styled-components/native';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const FlatStyle = styled.FlatList`
  padding-horizontal: 20px;
`;

export const LoadingStyle = styled.View`
  height: 300px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const CardStyle = styled.View`
  height: 60px;
  width: 100%;
  flex-direction: row;
  padding: 5px;
  margin-vertical: 5px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const CardImg = styled.Image`
  height: 50px;
  width: 50px;
  margin-right: 5px;
`;

export const CardInfo = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const CardInfoName = styled.Text`
  font-size: 18px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const CardInfoAction = styled.View`
  flex-direction: row;
`;

export const CardInfoClub = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
`;

export const CardInfoClubImg = styled.Image`
  height: 20px;
  width: 20px;
  margin-left: 3px;
`;

export const CardInfoClubName = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colors.textGray3};
  font-family: 'SairaSemiCondensed-Medium';
`;

export const CardInfoActionButton = styled.TouchableOpacity`
  height: 20px;
  width: 80px;
  border-radius: 10px;
  elevation: 2;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.bluePrimary};
`;

export const CardInfoActionButtonText = styled.Text`
  font-size: 10px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.textWhite};
`;

export const ActivityStyle = styled.ActivityIndicator`
  color: ${(props) => props.theme.colors.greenPrimary};
`;
