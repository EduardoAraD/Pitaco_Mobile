import styled from 'styled-components/native';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const ScrollStyle = styled.ScrollView`
  padding-horizontal: 20px;
`;

export const CardStanding = styled.View`
  margin-vertical: 10px;
  width: 100%;
  border-radius: 20px;
  elevation: 2;
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const CardTitleStanding = styled.View`
  height: 40px;
`;

export const CardTitleText = styled.Text`
  flex: 1;
  font-size: 14px;
  align-content: center;
  margin: 3px;
  margin-left: 10px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const CardSubs = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  background-color: ${(props) => props.theme.colors.greenPrimary};
`;

export const CardSubsText = styled.Text`
  width: 20px;
  text-align: center;
  font-size: 11px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.whitePrimary};
`;

export const CardTitleMatch = styled.View`
  height: 40px;
  padding: 5px;
  padding-horizontal: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.textGray4};
`;

export const CardTitleMatchText = styled.Text`
  font-size: 20px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.greenPrimary};
`;

export const LoadingStyle = styled.View`
  height: 300px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
