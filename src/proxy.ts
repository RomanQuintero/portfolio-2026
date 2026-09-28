import { NextResponse, type NextRequest } from "next/server";
import { getProject } from "@/lib/projects";

/** Reject unknown case-study slugs before Next streams a loading response. */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !getProject(slug)) {
    return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
  }
  return NextResponse.next();
}
export const config = { matcher: "/projects/:slug" };
