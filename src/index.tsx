import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {fetchGithubUser, fetchMoreGithubUser, GitHubUserState} from './api';
import {RootState, useAppDispatch} from './api/store';
import {useSelector} from 'react-redux';
import GitHubUser from './api/types';

export default () => {
  const dispatch = useAppDispatch();
  const {githubUser, loading, nextUrl} = useSelector<
    RootState,
    GitHubUserState
  >(state => state.githubUser);

  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    dispatch(fetchGithubUser());
  }, []);

  const isCloseToBottom = ({
    nativeEvent: {layoutMeasurement, contentOffset, contentSize},
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const paddingToBottom = 40;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCloseToBottom(event) && currentUrl !== nextUrl) {
      setCurrentUrl(nextUrl);
      dispatch(fetchMoreGithubUser(nextUrl));
    }
  };

  const renderItem = ({item: g_user}: {item: GitHubUser}) => {
    return (
      <View key={g_user.id} style={styles.user}>
        <Text style={styles.userName}>{g_user.login}</Text>
        <Image src={g_user.avatar_url} style={styles.avatar_url} />
        <Text style={styles.userName}>{JSON.stringify(g_user)}</Text>
      </View>
    );
  };

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={githubUser}
      onScroll={onScroll}
      renderItem={renderItem}
      keyExtractor={item => String(item.id)}
      ListFooterComponent={
        loading === 'pending' ? <ActivityIndicator size={'large'} /> : null
      }
    />
  );
};

const styles = StyleSheet.create({
  user: {alignSelf: 'center', alignItems: 'center', padding: 20},
  userName: {},
  avatar_url: {width: 120, height: 120, borderRadius: 60, marginVertical: 8},
});
