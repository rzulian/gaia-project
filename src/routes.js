import Singleplayer from './components/singleplayer';
import Multiplayer from './components/multiplayer';

const routes = [
  {
    path: '/singleplayer',
    text: 'Singleplayer',
    component: Singleplayer
  },
  {
    path: '/multiplayer',
    text: 'Multiplayer',
    component: Multiplayer
  }
];

export default routes;