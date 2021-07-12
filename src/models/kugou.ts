import Toast from '@src/panels/KugouMusic/panel-default/components/Toast/Toast';

const tmeSdk: TMESDK = window.h5PanelSdk.TMESdk.h5;

export function checkLoginAuth() {
  return tmeSdk.checkDeviceAuth();
}

export function login() {
  return tmeSdk.login();
}

export function getRecommendSong() {
  return tmeSdk.requestKugouApi('RecommendDaily');
}

export function getRecommendPlayList(page, size) {
  return tmeSdk.requestKugouApi('RecommendPlayList', {
    page,
    size,
  });
}

export function getSingerAlbums(page: number, size: number, singer_id: string, sort: number) {
  return tmeSdk.requestKugouApi('SingerAlbums', {
    page,
    size,
    singer_id,
    sort,
  });
}

export function getSongsByAlbum(page: number, size: number, album_id: string) {
  return tmeSdk.requestKugouApi('GetSongsByAlbum', {
    page,
    size,
    album_id,
  });
}

export function getSongsByPlaylist(page: number, size: number, playlist_id: string) {
  return tmeSdk.requestKugouApi('GetSongsByPlaylist', {
    page,
    size,
    playlist_id,
  });
}

export function getSongUrl(song_id: string) {
  return tmeSdk.requestKugouApi('GetSongUrl', {
    song_id,
  });
}

export function getSongsInfo(songs_id) {
  return tmeSdk.requestKugouApi('GetSongsInfo', {
    songs_id,
  });
}

export async function getSongData(song_id: string): Promise<Song> {
  const res = await Promise.all([getSongUrl(song_id), getSongsInfo([song_id])]);
  const songUrl = res[0].data;
  const songInfo = res[1].data.songs[0];
  return Object.assign({}, songUrl, songInfo);
}

export function getNewSongs(page: number, size: number, top_id: number) {
  return tmeSdk.requestKugouApi('GetNewSongs', {
    page,
    size,
    top_id,
  });
}

export function controlCurMusicList(action: string, params) {
  return tmeSdk.setCurPlayList(action, params);
}

export function controlSetCurSongId(song_id: string) {
  return tmeSdk.setCurSongId(song_id);
}

export function controlPlayNext() {
  return tmeSdk.nextSong();
}

export function controlPlayPre() {
  return tmeSdk.preSong();
}

export function controlPlay() {
  return tmeSdk.play();
}

export function controlPause() {
  return tmeSdk.pause();
}

export function controlPlayMode(play_mode: 0 | 1 | 2) {
  return tmeSdk.setPlayMode(play_mode);
}

export function controlPlayPosition(play_position: number) {
  return tmeSdk.setPlayPosition(play_position);
}

export function controlVolume(volume: number) {
  return tmeSdk.setVolume(volume);
}

export function controlQuality(quality: 0 | 1 | 2) {
  return tmeSdk.setPlayQuality(quality);
}

export async function controlDevice(controlFn: (...args) => Promise<any>, ...args) {
  if (window.h5PanelSdk.deviceStatus === 0) {
    Toast.open('设备已离线，暂时不能播放哦~');
    return Promise.reject();
  }
  window.h5PanelSdk.tips.showLoading('同步设备中');
  try {
    const res = await controlFn(...args);
    window.h5PanelSdk.tips.hideLoading();
    return res;
  } catch (err) {
    console.error('控制设备出错', err);
    window.h5PanelSdk.tips.hideLoading();
    window.h5PanelSdk.tips.alert(err.error_msg);
    return Promise.reject();
  }
}
