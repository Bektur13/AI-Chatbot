// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher([
//   "/",
//   "/auth/sign-in(.*)",
//   "/auth/sign-up(.*)",
// ]);

// export default clerkMiddleware(async (auth, req) => {
//   console.log("Incoming request:", req.url); // Debugging log
//   const { userId } = await auth();

//   if (!isPublicRoute(req) && !userId) {
//     console.log("Unauthorized, redirecting...");
//     return Response.redirect(new URL("/auth/sign-in", req.url), 307);
//   }
// });


// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }

import { clerkMiddleware, createRouteMatcher  } from "@clerk/nextjs/server";
const isPublicRoute = createRouteMatcher(["/auth/sign-in(.*)", "/auth/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/dashboard", 
    "/((?!_next/static|favicon.ico|.*\\..*).*)", // Excludes static files
    "/(api|trpc)(.*)", 
  ],
};