// import { get } from "svelte/store";
// import { user } from "$lib/authStore";

// export const handle = ({ event, resolove }) => {
//   const isAuth = get(user)
//   const protectedRoutes = ['/']

//   if (protectedRoutes.includes(event.url.pathname) && !isAuth) {
//     return Response.redirect('/login', 302);
//   }

//   return resolove(event)
// }