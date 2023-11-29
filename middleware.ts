import {authMiddleware, redirectToSignIn} from "@clerk/nextjs";
import {NextResponse} from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    publicRoutes: ["/"],
    afterAuth(auth, req ) {

        // If the user is logged in and is trying to access a public route, redirect them to the org selection page
        if(auth.userId && auth.isPublicRoute) {
            let path = "/select-org";

            // If the user is already in an org, redirect them to that org
            if(auth.orgId) {
                path = `/organization/${auth.orgId}`;
            }

            const orgSelection = new URL(path, req.url);
            return NextResponse.redirect(orgSelection.href);
        }

        // If the user is not logged in and is trying to access a protected route, redirect them to the sign-in page, then redirect them back to the protected route
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({
                returnBackUrl: req.url,
            });
        }

        // If the user is logged in but does not have an org, and page path isn't select-org, redirect them to the org selection page
        if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
            const orgSelection = new URL("/select-org", req.url);
            return NextResponse.redirect(orgSelection);
        }

    }
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
