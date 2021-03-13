export  interface User {
  id:number,
  email:string
  first_name: string,
  last_name: string,
  username:string,
  token:string,
  logged: boolean,
  error:boolean,
  errorMessage:string,
  success:boolean
}
