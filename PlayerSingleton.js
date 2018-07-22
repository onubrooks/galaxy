/**
 * this is a singleton class that keeps a reference all newly created player instances
 * the reason for this class is to be able to control all players so that only one player is playing
 * at a time. once one player is played, all others that are playing are paused
 * a singleton pattern is used so that on creation of a new instance of this class, the same object is
 * returned. this implies that anywhere in this app that an instance of this class exists, they all point
 * to the same object. this enables the code to track all playing instances at any point in time
 * 
 * author: Onu Abah
 * created: 22/07/2018
 */

export class PlayerSingleton {
  static instance;

  constructor() {
    if (this.instance) {
      return instance;
    }

    this.state = {
      players: []
    }
    this.instance = this;
  }
  addPlayer = (player) => {
    this.state.players = this.state.players.concat(player);
  }

  stopAll = () => {
    this.state.players.forEach(player => {
      try {
        player.getStatusAsync().then((status) => {
          if (status.isPlaying) player.pauseAsync();
        });
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  // render() {
  //   return (
  //     <PlayerContext.Provider value={this.state}>
  //       { this.props.children }
  //     </PlayerContext.Provider>
  //   );
  // }
}