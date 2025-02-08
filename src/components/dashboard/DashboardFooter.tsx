
import { motion } from "framer-motion";

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
          <div className="mt-6 flex items-center justify-center gap-6">
            <img
              src="/lovable-uploads/44f2bccc-e7ea-4068-ad2d-4e6ccefba870.png"
              alt="QuacQOS"
              className="h-6 w-auto"
            />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built by</span>
              <img
                src="/lovable-uploads/4d90cbfe-2d43-4fcd-b896-0717319eaf6e.png"
                alt="Qogniti AI"
                className="h-4 w-auto"
              />
              <span>&</span>
              <img
                src="/lovable-uploads/c6c34a31-9708-4577-af77-f4a8ca48259e.png"
                alt="Mounntn Design Studio"
                className="h-4 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
