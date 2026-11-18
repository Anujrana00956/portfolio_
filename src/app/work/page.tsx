import { redirect } from "next/navigation";

/** Legacy multi-page route → single-page hash */
export default function WorkRedirect() {
  redirect("/#projects");
}
