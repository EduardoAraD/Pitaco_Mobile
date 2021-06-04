import styled from 'styled-components/native';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const ScrollStyle = styled.ScrollView`
  padding-horizontal: 20px;
`;

export const ScrollButtonContainer = styled.View`
  margin-top: 10px;
  elevation: 2;
  flex-direction: row;
  justify-content: center;
`;

export const ScrollButtonLeft = styled.View`
  height: 50px;
  width: 140px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export const ScrollButtonRigth = styled.View`
  height: 50px;
  width: 140px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export const ScrollButtonText = styled.Text`
  font-size: 20px;
  font-family: SairaSemiCondensed-Bold;
`;

export const CardStyle = styled.View`
  width: 100%;
  margin-vertical: 10px;
  border-radius: 20px;
  elevation: 3;
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const CardTitle = styled.View`
  height: 40px;
  padding: 5px;
  padding-horizontal: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.textGray4};
`;

export const CardTitleText = styled.Text`
  font-size: 18px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.greenPrimary};
`;

export const LoadingStyle = styled.View`
  height: 300px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const TextNotMatch = styled.Text`
  font-size: 16px;
  font-family: SairaSemiCondensed-Medium;
  text-align: center;
  color: ${(props) => props.theme.colors.textGray4};
`;

export const ActivityStyle = styled.ActivityIndicator`
  color: ${(props) => props.theme.colors.greenPrimary};
`;
