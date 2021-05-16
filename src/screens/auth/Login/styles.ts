import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const Scroll = styled.ScrollView`
  padding-horizontal: 20px;
  width: 100%;
`;

export const ImageLeague = styled.Image`
  height: 250px;
  width: 250px;
  margin: 20px;
  align-self: center;
`;

export const ViewLeagueContainer = styled.View`
  width: 100%;
  margin-bottom: 5px;
  justify-content: space-between;
  flex-direction: row;
`;

export const TextLink = styled.Text`
  color: ${(props) => props.theme.colors.textGray2};
  font-family: SairaSemiCondensed-Light;
`;
