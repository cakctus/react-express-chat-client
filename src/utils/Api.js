const host = "http://localhost:5000"
const RegisterRoute = `${host}/api/auth/register`
const LoginRoute = `${host}/api/auth/login`
const setAvatarRoute = `${host}/api/auth/setAvatar`
const allUsersRoute = `${host}/api/auth/allusers`
const sendMessageRoute = `${host}/api/messages/addmsg`
const getAllMessageRoute = `${host}/api/messages/getmsg`

export default {
  RegisterRoute,
  LoginRoute,
  setAvatarRoute,
  allUsersRoute,
  sendMessageRoute,
  getAllMessageRoute,
  host,
}
