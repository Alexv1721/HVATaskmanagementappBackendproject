import{Navigate }from'react-router-dom'
const ProtectedRoute=({children,allowedRole})=>
{
const token =localStorage.getItem('taskstoken')
   const role=localStorage.getItem('role')
   console.log("ROLE:", role, "ALLOWED:", allowedRole)

if(!token){
return<Navigate to="/login" />
  }
if(allowedRole &&role!==allowedRole) {
  return <Navigate to="/"/>
}

 return children
}

export default ProtectedRoute
