import ButtonSignin from "@/components/ButtonSignin";
import ChristmasButton from "@/components/ChristmasButton";
import Image from "next/image";
import ChristmasCountdown from "@/components/ChristmasCountdown";
import PreviewLetterForm from "@/components/PreviewLetterForm";
import NavigationButton from "@/components/NavigationButton";
import Link from "next/link";
import MobileWarningPopup from '@/components/MobileWarningPopup';

export default function Page() {
  return (
    <>
      <MobileWarningPopup />
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/50">
        <div className="p-4 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            {/* Santa Image Left */}
            <div className="relative w-10 h-10">
              <Image
                src="/blog/introducing-supabase/effects/Santa.png"
                alt="Santa"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="text-2xl font-bold text-white">SantasWishlist</div>
          </div>
          <ButtonSignin text="Login" href="/signin" />
        </div>
      </header>

      <main className="min-h-screen bg-[#121212] pt-20">
        {/* Snow Effect Container */}
        <div className="snow-container fixed inset-0 pointer-events-none z-10">
          {[...Array(150)].map((_, i) => (
            <div 
              key={i} 
              className="snow"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * -20}s`
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <section className="relative px-4 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[#121212]" />
          
          {/* World Map Background */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'url("/blog/introducing-supabase/effects/dotted-world-white.png")',
              backgroundSize: '50%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              opacity: 0.05,
              maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent), linear-gradient(to bottom, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent), linear-gradient(to bottom, black 80%, transparent)',
            }}
          />

          {/* Left Side Santa Image */}
          <div className="absolute left-[calc(5%+100px)] top-1/4 hidden lg:block">
            <div className="relative w-72 h-72 animate-float">
              <Image
                src="/blog/introducing-supabase/effects/Santa.png"
                alt="Santa - Left Hand Side"
                width={288}
                height={288}
                className="object-contain transform rotate-[350deg]"
              />
            </div>
          </div>

          {/* Right Side Presents Image */}
          <div className="absolute right-[calc(5%+100px)] top-1/4 hidden lg:block">
            <div className="relative w-72 h-72 animate-float">
              <Image
                src="/blog/introducing-supabase/effects/presents.png"
                alt="Presents - Right Hand Side"
                width={288}
                height={288}
                className="object-contain transform rotate-[10deg]"
              />
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative max-w-7xl mx-auto text-center space-y-6 z-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-white">
              <span>🎄</span>
              <span>Help Santa know exactly what to bring this Christmas</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight">
              Write to Santa and Make Your
              <br />
              Christmas Wishes Come True!
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Create your magical Christmas wishlist, write a special letter to Santa, 
              and receive a personal reply from the North Pole! Parents can easily keep 
              track of all their children&apos;s Christmas dreams in one magical place.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Countdown To Christmas</h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ChristmasCountdown />
            </div>

            <div className="flex flex-col gap-4 justify-center items-center">
              <NavigationButton 
                variant="default"
                href="/signin"
              >
                Create a Family Wishlist
                <span>→</span>
              </NavigationButton>
              <p className="text-white italic font-medium text-sm">No credit card required</p>
            </div>

            <div className="mt-48">
              <div className="relative max-w-4xl mx-auto">
                <PreviewLetterForm />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative px-4 py-24 bg-[#121212]">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Making Christmas Dreams Come True
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Everything you need to create magical Christmas memories for your family
              </p>
            </div>

            <div className="relative">
              {/* Curved Dotted Lines */}
              <div className="absolute top-1/3 left-[20%] right-[20%] h-24 hidden md:block">
                <svg className="w-full h-full" viewBox="0 0 400 100">
                  <path
                    d="M 50,50 C 150,20 250,80 350,50"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="4,6"
                    className="text-white/20 animate-dash"
                    strokeWidth="2"
                  />
                  {/* Add sparkles along the path */}
                  <circle cx="50" cy="50" r="2" className="text-white/40 animate-twinkle" />
                  <circle cx="200" cy="35" r="2" className="text-white/40 animate-twinkle" />
                  <circle cx="350" cy="50" r="2" className="text-white/40 animate-twinkle" />
                </svg>
              </div>
              <div className="absolute bottom-1/3 left-[20%] right-[20%] h-24 hidden md:block">
                <svg className="w-full h-full" viewBox="0 0 400 100">
                  <path
                    d="M 50,50 C 150,80 250,20 350,50"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="4,6"
                    className="text-white/20 animate-dash"
                    strokeWidth="2"
                  />
                  {/* Add sparkles along the path */}
                  <circle cx="50" cy="50" r="2" className="text-white/40 animate-twinkle" />
                  <circle cx="200" cy="65" r="2" className="text-white/40 animate-twinkle" />
                  <circle cx="350" cy="50" r="2" className="text-white/40 animate-twinkle" />
                </svg>
              </div>

              {/* Steps Grid */}
              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                {[
                  {
                    step: 1,
                    title: "Create Your Family Wishlist",
                    description: "Create a family wishlist, personalising a message from Santa to the kids",
                    icon: "🎄"
                  },
                  {
                    step: 2,
                    title: "Share the Magic",
                    description: "Send the link to your kids, they receive the letter from Santa (addressed to them), and leave their reply",
                    icon: "✉️"
                  },
                  {
                    step: 3,
                    title: "Track Christmas Wishes",
                    description: "View their Christmas wish lists and manage all their children&apos;s Christmas dreams in one place",
                    icon: "🎁"
                  }
                ].map((step, i) => (
                  <div 
                    key={i}
                    className="relative backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 shadow-xl"
                  >
                    {/* Snow Cap */}
                    <div 
                      className="absolute -top-[33px] left-0 w-full h-24 z-10"
                      style={{
                        borderImageSource: 'url("/blog/introducing-supabase/effects/white-snow-cap-clipart-md.png")',
                        borderImageSlice: 'calc(20 * 56 / 20) fill',
                        borderImageWidth: 'calc(96px / 3)',
                        borderImageRepeat: 'round',
                        filter: 'drop-shadow(0 2px 1px rgba(0,0,0,0.25))',
                        transform: step.step === 2 ? 'scaleX(-1)' : 'none',
                      }}
                    />

                    {/* Step Number */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold shadow-lg z-20">
                      {step.step}
                    </div>

                    <div className="space-y-4 pt-4">
                      <div className="text-4xl">{step.icon}</div>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-24 bg-[#121212]">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Start Creating Christmas Magic Today
            </h2>
            <p className="text-xl text-gray-400">
              Free for families to create and manage wishlists
            </p>
            <NavigationButton 
              variant="default"
              href="/signin"
              className="mx-auto py-3 px-8 min-w-0 w-auto"
            >
              Get Started For Free
              <span>🎄</span>
            </NavigationButton>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-500">
          <p>© 2024 SantaList. Making Christmas magical for families everywhere.</p>
        </div>
      </footer>
    </>
  );
}
