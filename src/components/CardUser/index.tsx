import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { User } from '../../models/User';

import {
  CardImage,
  CardInfoClube,
  CardInfoClubeImage,
  CardInfoClubeName,
  CardInfoName,
  CardInfoView,
  CardTouch,
} from './styles';

interface Props {
  user: User;
}

export default function CardUser({ user }: Props) {
  const navigate = useNavigation();

  function handleNavigateFriendShow() {
    navigate.navigate('FriendShow', { friend: user });
  }

  return (
    <CardTouch onPress={handleNavigateFriendShow}>
      <CardImage resizeMode="contain" source={{ uri: user.avatar }} />
      <CardInfoView>
        <CardInfoName numberOfLines={1}>@{user.name}</CardInfoName>
        <CardInfoClube>
          <CardInfoClubeName>{user.heartClub.name}</CardInfoClubeName>
          <CardInfoClubeImage
            resizeMode="contain"
            source={{ uri: user.heartClub.logo }}
          />
        </CardInfoClube>
      </CardInfoView>
    </CardTouch>
  );
}
