import styled from 'styled-components/native';

interface StyleProps {
  bool: boolean;
}

export const Container = styled.View`
  height: 40px;
  padding: 5px;
  padding-horizontal: 10px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  border-top-width: 1px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-color: ${(props) => props.theme.colors.textGray4};
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const TextStyle = styled.Text`
  font-size: 14px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const ImageStyle = styled.Image`
  height: 30px;
  width: 30px;
  margin-horizontal: 5px;
`;

export const TextName = styled.Text<StyleProps>`
  font-family: SairaSemiCondensed-Bold;
  font-size: 16px;
  flex: 1;
  margin-right: 10px;
  color: ${(props) =>
    props.bool
      ? props.theme.colors.greenPrimary
      : props.theme.colors.textGray2};
`;

export const TextPoint = styled.Text`
  font-size: 17px;
  font-family: SairaSemiCondensed-Medium;
  color: ${(props) => props.theme.colors.greenPrimary};
`;
