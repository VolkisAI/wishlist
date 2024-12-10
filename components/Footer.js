import Link from "next/link";
import config from "@/config";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-content/10">
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex flex-col gap-8">
          <div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-base-content/80">
                <div>
                  <div className="text-lg font-medium">{config.appName}</div>
                  <div className="text-sm text-base-content/60">
                    Making Christmas magical for families everywhere
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            <div className="flex flex-col gap-2">
              <div className="text-base-content/60 uppercase text-sm font-medium">
                Legal
              </div>
              <Link href="/privacy-policy" className="link link-hover">
                Privacy Policy
              </Link>
              <Link href="/tos" className="link link-hover">
                Terms of Service
              </Link>
            </div>
          </div>

          <div className="text-sm text-base-content/80 pt-8">
            © {new Date().getFullYear()} {config.appName}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
