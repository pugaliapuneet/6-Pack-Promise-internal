const Images = {
  Intro: [
    require('@assets/intro-slides/Intro1.png'),
    require('@assets/intro-slides/Intro2.png'),
    require('@assets/intro-slides/Intro3.png'),
    require('@assets/intro-slides/Intro4.png'),
    require('@assets/intro-slides/Intro5.png'),
    require('@assets/intro-slides/Intro6.png'),
  ],
  workoutTypes: {
    bodyweight: require('@assets/workout-types/bodyweight.jpg'),
    chinup_bar: require('@assets/workout-types/chinup_bar.jpg'),
    dumbbell: require('@assets/workout-types/dumbbell.jpg'),
    physioball: require('@assets/workout-types/physioball.jpg'),
    resistance_band: require('@assets/workout-types/resistance_band.jpg'),
    tennis_ball: require('@assets/workout-types/tennis_ball.jpg'),
  },
  equipments: [
    require('@assets/equipments/BODYWEIGHT.png'),
    require('@assets/equipments/TENNIS_BALL.png'),
    require('@assets/equipments/CHINUP_BAR.png'),
    require('@assets/equipments/DUMBBELL.png'),
    require('@assets/equipments/RESISTANCE_BAND.png'),
    require('@assets/equipments/PHYSIOBALL.png')
  ],
  fitnessLevels: [
    require('@assets/fitness-level/level_1.png'),
    require('@assets/fitness-level/level_2.png'),
    require('@assets/fitness-level/level_3.png'),
    require('@assets/fitness-level/level_4.png')
  ],
  setting: require('@assets/home/setting.png'),
  search: require('@assets/home/search.png'),
  logo: require('@assets/logo.png'),
  subscribe: require('@assets/subscribe/ads.png'),
  eat: require('@assets/home/eat.png'),
  favorites: require('@assets/home/favorites.png'),
  learn: require('@assets/home/learn.png'),
  shuffle: require('@assets/home/shuffle.png'),
  track: require('@assets/home/track.png'),
  selfiles: require('@assets/home/selfiles.png'),
  checked: require('@assets/checked.png'),
  unchecked: require('@assets/unchecked.png'),
  play: require('@assets/play.png'),
  eatShuffle: require('@assets/eat/eat_shuffle.png'),
  eatDot: require('@assets/eat/eat_dot.png'),
  eatAlram: require('@assets/eat/eat_alram.png'),
  eatBanner: require('@assets/eat/eat_banner.png'),
  equipment: require('@assets/equipment.png'),
  brag: require('@assets/selfies/brag.png'),
  camera: require('@assets/selfies/camera.png'),
  close: require('@assets/close.png'),
  videoPlay: require('@assets/video_play.png'),
  lock: require('@assets/lock.png'),
  success: require('@assets/round.png'),
  upgradePro: require('@assets/upgrade_pro.png'),
  favorite: (status = false) =>
    status
      ? require('@assets/star_red.png')
      : require('@assets/star.png'),
  switchIcon: (status) =>
    status
      ? require('@assets/on_off_green.png')
      : require('@assets/on_off.png'),
  refreshWorkout: require('@assets/workout/refresh_workout.png'),
  workoutPlay: (status) =>
    status
      ? require('@assets/workout/play_workout.png')
      : require('@assets/workout/pause_workout.png'),
  unlockBanner: require('@assets/unlock_banner.png'),
  review: require('@assets/review.png'),
};

export default Images;
