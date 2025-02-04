import { Github, Star, Users } from "lucide-react";
import { Button } from "../ui/button";

export const DashboardFooter = () => {
  return (
    <footer className="pb-6 pt-16 lg:pb-8 lg:pt-24">
      <div className="px-4 lg:px-8">
        <div className="border-t mt-6 pt-6 md:mt-4 md:pt-8">
          <nav className="lg:mt-0">
            <ul className="list-none flex flex-wrap -my-1 -mx-2 justify-center">
              <li className="my-1 mx-2 shrink-0">
                <a
                  href="/dashboard"
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  Dashboard
                </a>
              </li>
              <li className="my-1 mx-2 shrink-0">
                <a
                  href="/dashboard/financial-management"
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  Financial Management
                </a>
              </li>
              <li className="my-1 mx-2 shrink-0">
                <a
                  href="/dashboard/guest-management"
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  Guest Management
                </a>
              </li>
            </ul>
          </nav>
          <div className="mt-6 text-sm leading-6 text-muted-foreground text-center">
            © 2024 Caabi Boutique Homes. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};