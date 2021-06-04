import styled from 'styled-components/native';

interface Props {
  principal?: boolean;
}

export const CardTouch = styled.TouchableOpacity`
  height: 70px;
  width: 100%;
  flex-direction: row;
  padding-horizontal: 10px;
  padding-vertical: 5px;
  margin-vertical: 10px;
  border-radius: 20px;
  elevation: 3;
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const CardImage = styled.Image`
  height: 60px;
  width: 60px;
`;

export const CardInfoView = styled.View`
  flex: 1;
  justify-content: space-between;
  margin-left: 10px;
  color: ${(props) => props.theme.colors.greenPrimary};
`;

export const CardInfoTitle = styled.Text`
  font-size: 15px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.greenPrimary};
`;

export const CardInfoDono = styled.Text<Props>`
  font-size: 10px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) =>
    props.principal
      ? props.theme.colors.yellowPrimary
      : props.theme.colors.textGray3};
`;

export const CardInfoUserView = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
`;

export const CardInfoUserPos = styled.Text`
  font-size: 13px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.textGray3};
`;

export const CardInfoUserName = styled.Text`
  margin-left: 2px;
  font-size: 15px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.textGray1};
`;

export const CardInfoUserPoint = styled.Text`
  font-size: 15px;
  font-family: SairaSemiCondensed-Bold;
  flex: 1;
  text-align: right;
  color: ${(props) => props.theme.colors.greenPrimary};
`;
