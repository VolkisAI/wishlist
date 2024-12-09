/**
 * Admin Dashboard Page
 * 
 * Main administrative interface for parents to manage their children's wishlists
 * and view submissions. Protected by authentication in layout.js.
 */

import ButtonAccount from "@/components/ButtonAccount";
import AdminTabs from "@/components/AdminTabs";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  return (
    <main className="min-h-screen p-8 pb-24 bg-[#121212]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-100">Santa's Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Manage your children's wishlists and view their messages to Santa</p>
          </div>
          <ButtonAccount />
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-box p-6 shadow-lg">
          <AdminTabs />
        </div>
      </div>
    </main>
  );
}
