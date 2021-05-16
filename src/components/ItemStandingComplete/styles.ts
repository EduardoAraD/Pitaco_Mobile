import styled from 'styled-components/native';

interface StyleProps {
  color: string;
}

export const Container = styled.View<StyleProps>`
  padding-horizontal: 4px;
  width: 100%;
  height: 40px;
  flex-direction: row;
  align-items: center;
  border-top-width: 1px;
  border-left-width: 3px;
  background-color: ${(props) => props.theme.colors.whitePrimary};
  border-top-color: ${(props) => props.theme.colors.textGray4};
  border-left-color: ${(props) => props.color};
`;

export const TextPos = styled.Text`
  width: 23px;
  text-align: right;
  font-size: 16px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const ImageContent = styled.Image`
  margin-horizontal: 3px;
  margin-vertical: 5px;
  height: 30px;
  width: 30px;
  align-self: center;
`;

export const AreaValor = styled.View`
  flex-direction: column;
  flex: 1;
`;

export const AreaVariacao = styled.View`
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  flex: 1;
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
  justify-content: flex-end;
`;

export const TextValor = styled.Text`
  width: 20px;
  text-align: center;
  font-size: 11px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.textGray2};
`;
