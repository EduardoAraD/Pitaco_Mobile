import styled from 'styled-components/native';

interface StyleProps {
  color: string;
}

export const Container = styled.View<StyleProps>`
  width: 100%;
  height: 40px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-left-width: 3px;
  background-color: ${(props) => props.theme.colors.whitePrimary};
  border-bottom-color: ${(props) => props.theme.colors.textGray4};
  border-left-color: ${(props) => props.color};
`;

export const TextPos = styled.Text`
  width: 25px;
  text-align: right;
  font-size: 16px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const ImageContent = styled.Image`
  margin: 3px;
  height: 34px;
  width: 34px;
  align-self: center;
`;

export const AreaValor = styled.View`
  display: flex;
  flex-direction: column;
  height: 40px;
  width: 100%;
`;

export const AreaVariacao = styled.View`
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  width: 40%;
`;

export const TextName = styled.Text`
  flex: 1;
  font-size: 14px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const AreaText = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const TextValor = styled.Text`
  width: 20px;
  text-align: center;
  font-size: 12px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.textGray2};
`;
