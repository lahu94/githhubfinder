import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS, CLEAR_LOADING } from '../types'; 
import { stat } from 'fs';

const GithubState = props => {
  const initalState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initalState);

  // search user
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=#{process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=#{process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  }

  const clearUsers = () => dispatch({type: CLEAR_USERS, })

  const getUser = async (login) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${login}?client_id=#{process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=#{process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  }

  const getUserRepos = async (login) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=#{process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=#{process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  }

  // Get user

  const setLoading = (loading) => dispatch({type: SET_LOADING, loading: loading});
  const clearLoading = (loading) => dispatch({type: CLEAR_LOADING, loading: loading })

  return <GithubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos
    }}
  >
   {props.children}
  </GithubContext.Provider>
}

export default GithubState