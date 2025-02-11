import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { request } from 'http';

const isRoutePublic = createRouteMatcher(['/sign-in', '/sign-in/(.*)']);

export default clerkMiddleware(async (auth, request) => {
  console.log("Middleware triggered for:", request.nextUrl.pathname);
  
  if (!isRoutePublic(request)) {
    console.log("Protected route, enforcing auth.");
    await auth.protect();
  } else {
    console.log("Public route, no auth required.");
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}