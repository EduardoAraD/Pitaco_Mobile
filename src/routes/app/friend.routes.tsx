import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FriendShow from '../../screens/app/FriendShow';
import FriendsUser from '../../screens/app/FriendsUser';
import SearchFriend from '../../screens/app/SearchFriend';
import Header from '../../components/HeaderComponent';

const Stack = createStackNavigator();

export default function FriendRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FriendUser"
        component={FriendsUser}
        options={{ header: () => <Header title="Amigos" border /> }}
      />
      <Stack.Screen
        name="FriendShow"
        component={FriendShow}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchFriend"
        component={SearchFriend}
        options={{
          header: () => <Header title="Procurar Amigos" back border />,
        }}
      />
    </Stack.Navigator>
  );
}
