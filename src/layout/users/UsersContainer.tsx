import React from 'react';
import {AppStateType} from '../../redux/reduxStore';
import {UserType} from '../../redux/storeAllPropsType';
import axios from 'axios';
import {connect} from 'react-redux';
import {UsersNew} from './UsersNew';
import {
  follow, setCurrentPage, setTotalUsersCount,
  setUsers, toggleIsFetching,
  unfollow
} from '../../redux/usersReducer';
import {Preloader} from "../../common/Preloader";

type MSTPType = {
  users: Array<UserType>
  pageSize: number
  totalCount: number
  currentPage: number
  isFetching: boolean
};
type MDTPType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  setUsers: (users: Array<UserType>) => void
  setCurrentPage: (pageNumber: number) => void
  setTotalUsersCount: (totalUsersCount: number) => void
  toggleIsFetching: (isFetching: boolean) => void
};

export type UsersPagePropsType = MSTPType & MDTPType

class UsersContainer extends React.Component<UsersPagePropsType, {}> {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    axios.get<{
      totalCount: number,
      items: UserType[]
    }>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {withCredentials: true})
      .then(response => {
        this.props.setUsers(response.data.items)
        this.props.setTotalUsersCount(response.data.totalCount)
        this.props.toggleIsFetching(false)
      })
  }

  onPageChanged = (pageNumber: number) => {
    this.props.toggleIsFetching(true);
    this.props.setCurrentPage(pageNumber);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`, {withCredentials: true} )
      .then(response => {
        this.props.setUsers(response.data.items)
        this.props.toggleIsFetching(false)
      })
  }

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader/> : null}
        <UsersNew totalCount={this.props.totalCount}
                  pageSize={this.props.pageSize}
                  currentPage={this.props.currentPage}
                  onPageChanged={this.onPageChanged}
                  users={this.props.users}
                  follow={this.props.follow}
                  unfollow={this.props.unfollow}
                  setCurrentPage={this.props.setCurrentPage}
                  setTotalUsersCount={this.props.setTotalUsersCount}
                  setUsers={this.props.setUsers}
                  isFetching={this.props.isFetching}
                  toggleIsFetching={this.props.toggleIsFetching}
        />
      </>
    )
  }
}


const MSTP = (state: AppStateType): MSTPType => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalCount: state.usersPage.totalCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching
  }
}
// const MDTP = (dispatch: Dispatch): MDTPType => {
//   return {
//     follow: (userId: number) => {
//       dispatch(followAC(userId))
//     },
//     unfollow: (userId: number) => {
//       dispatch(unfollowAC(userId))
//     },
//     setUsers: (users: Array<UserPropsType>) => {
//       dispatch(setUsersAC(users))
//     },
//     setCurrentPage: (pageNumber: number) => {
//       dispatch(setCurrentPageAC(pageNumber))
//     },
//     setTotalUsersCount: (totalCount: number) => {
//       dispatch(setTotalUsersCountAC(totalCount))
//     },
//     toggleIsFetching: (isFetching) => {
//       dispatch(toggleIsFetchingAC(isFetching))
//     }
//   }
// }

export default connect(MSTP, {
  follow, unfollow, setUsers, setCurrentPage,
  setTotalUsersCount, toggleIsFetching
})(UsersContainer)