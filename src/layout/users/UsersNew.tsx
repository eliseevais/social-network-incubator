import {Styles} from "./Users_Styles";
import UserPhoto from "../../accets/img/user.png";
import React from "react";
import {UsersPagePropsType} from "./UsersContainer";
import {NavLink} from "react-router-dom";
import axios from "axios";

type onPageChanged = {
  onPageChanged: (p: number) => void
}

export const UsersNew = (props: UsersPagePropsType & onPageChanged) => {

  let pagesCount = Math.ceil(props.totalCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  return (
    <div>
      <div>
        {pages.map(p => {
          return props.currentPage === p
            ? <Styles.SelectedPage
              key={`pagination-page-${p}`}
            >
              {p}</Styles.SelectedPage>
            : <Styles.Page key={`pagination-page-${p}`}
                           onClick={() => {
                             props.onPageChanged(p)
                           }}>{p}</Styles.Page>
        })}
      </div>

      <Styles.UsersListWrapper>
        {
          props.users.map(u => <Styles.UserWrapper key={u.id}>
              <Styles.PhotoAndButton>
                <NavLink to={`/profile/${u.id}`}>
                  <Styles.UserAvatar src={
                    u.photos.small !== null
                      ? u.photos.small
                      : UserPhoto}/>
                </NavLink>
                <div>
                  {
                    u.followed
                      ? <Styles.ButtonFollowUnfollow onClick={() => {
                        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                          withCredentials: true,
                          headers: {
                            "API-KEY": "7baa0947-f1d6-498f-bd5d-ed507ad6475a"
                          }
                        })
                          .then(response => {
                            if (response.data.resultCode === 0) {
                              props.unfollow(u.id)
                            }
                          })
                      }}>Unfollow</Styles.ButtonFollowUnfollow>
                      : <Styles.ButtonFollowUnfollow onClick={() => {
                        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                          withCredentials: true,
                          headers: {
                            "API-KEY": "7baa0947-f1d6-498f-bd5d-ed507ad6475a"
                          }
                        })
                          .then(response => {
                            if (response.data.resultCode === 0) {
                              props.follow(u.id)
                            }
                          })
                      }}>Follow</Styles.ButtonFollowUnfollow>
                  }
                </div>
              </Styles.PhotoAndButton>
              <Styles.UserPreview>
                <Styles.NameAndStatus>
                  <div>{u.name}</div>
                  <div>{u.status}</div>
                </Styles.NameAndStatus>
                <Styles.Location>
                  <div>{u.location?.country}</div>
                  <div>{u.location?.city}</div>
                </Styles.Location>
              </Styles.UserPreview>

            </Styles.UserWrapper>
          )
        }
      </Styles.UsersListWrapper>
    </div>
  )
}