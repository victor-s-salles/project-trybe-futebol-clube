import User from "../../database/models/userModel"


const login = {
  email: "email@email.com",
  password: "1234567"
}

const loginInvalidPassword = {
  email: "admin@admin.com",
  password: "123"
}

const loginnvalidEmail = {
  email: "email.com",
  password: "secret_admin"
}
const user = {
    id: 1,
    email: "email@email.com",
    username: "email",
    password: "12345678",
    role: "user"
  } as User
  

const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjgwMjA1NTMyLCJleHAiOjE2ODAyMTI3MzJ9.fVR0a96xjJV-9ExRSgzq2rF0OAebO1gns2y2eGmYiJs'

export {login, loginInvalidPassword, loginnvalidEmail, tokenMock, user}