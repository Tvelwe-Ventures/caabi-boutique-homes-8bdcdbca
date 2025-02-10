
import { motion } from "framer-motion";

export const DashboardFooter = () => {
  return (
    <footer className="pb-6 pt-16 lg:pb-8 lg:pt-24">
      <div className="px-4 lg:px-8">
        <div className="flex justify-start mb-6">
          <img
            src="/lovable-uploads/44f2bccc-e7ea-4068-ad2d-4e6ccefba870.png"
            alt="QuacQOS"
            className="h-6 w-auto"
          />
        </div>
        <div className="border-t mt-6 pt-6 md:mt-4 md:pt-8">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="order-2 md:order-1">
              <ul className="list-none flex flex-wrap -my-1 -mx-2">
                <li className="my-1 mx-2 shrink-0">
                  <a
                    href="/privacy"
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li className="my-1 mx-2 shrink-0">
                  <a
                    href="/terms"
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <nav className="order-1 md:order-2 mb-6 md:mb-0">
              <ul className="list-none flex flex-wrap -my-1 -mx-2 justify-center md:justify-end">
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
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>© 2024 Qogniti AI Labs, A cXentral Company</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
