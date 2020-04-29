// import User from './user';

// const hasWindow = typeof window !== 'undefined';

export interface AppStateProps {
  // user: User
}

/*
 * This is the entry point for the app's state. All stores should go here.
 */
class AppState implements AppStateProps {
  // user: User;

  // constructor() {
  //   // this.user = new User();
  // }

  reload(store: AppStateProps) {
    Object.assign(this, store);
    return this;
  }

  unload() {
    return this;
  }
}

export default AppState;
