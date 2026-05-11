// users.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.state';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(
  selectUsersState,
  (state: UsersState) => state.users
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  (state: UsersState) => state.loading
);

export const selectUsersLoaded = createSelector(
  selectUsersState,
  (state: UsersState) => state.loaded
);

export const selectUsersError = createSelector(
  selectUsersState,
  (state: UsersState) => state.error
);

export const selectTeamLeaderDropdown = createSelector(
  selectAllUsers,
  selectUsersLoading,
  (users, loading) => {

    if (loading && users.length === 0) {
      return [
        {
          id: -1,
          val: 'Loading...'
        }
      ];
    }

    return users
      .filter(u => u.roleName === 'TeamLeader')
      .map(u => ({
        id: u.id,
        val: u.userName
      }));
  }
);

export const selectSegmentLeaders = createSelector(
  selectAllUsers,
  selectUsersLoading,
  (users, loading) => {

    if (loading && users.length === 0) {
      return [
        {
          id: -1,
          val: 'Loading...'
        }
      ];
    }

    return users
      .filter(u => u.roleName === 'SegmentLeader')
      .map(u => ({
        id: u.id,
        val: u.userName
      }));
  }
);