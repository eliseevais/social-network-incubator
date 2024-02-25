import React from "react";
import {Redirect, Route} from "react-router-dom";
import {Friends} from "../friends/Friends";
import {Melodies} from "../melodies/Melodies";
import {MyPostsContainer} from "./myPosts/MyPostsContainer";
import {InboxContainer} from "../inbox/InboxContainer";
import {Styles} from "./ContentWindow_Styles";
import {Feeds} from "../feeds/Feeds";

export const WrapperForContent = () => {
  return (
    <Styles.WrapperForContent>
      <Redirect from='/' to='/myprofile'/>
      <Route path='/myprofile' render={() => <MyPostsContainer/>}/>
      <Route path='/inbox' render={() => <InboxContainer/>}/>
      <Route path='/friends' component={Friends}/>

      <Route path='/melodies' component={Melodies}/>

      {/*<Route path='/feeds' render={*/}
      {/*  () => <Feeds feeds={props.state.feedsPage.feeds}/>}/>*/}

    </Styles.WrapperForContent>
  )
}
