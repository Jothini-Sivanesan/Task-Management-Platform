import './globals.css';

export const metadata = {
  title: 'TaskFlow',
  description: 'Organize Your Work. Achieve Your Goals.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white selection:bg-black selection:text-white">
        <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 w-full border-b border-gray-200">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-[72px]">
              
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer">
                {/* Minimal Geometric Icon */}
                <div className="w-6 h-6 border-[3px] border-black rounded-[4px] relative">
                  <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-[2px]"></div>
                </div>
                <span className="text-xl font-bold tracking-tight text-black">TaskFlow</span>
              </div>
              
              {/* Navigation Links */}
              <div className="hidden md:flex space-x-10">
                <a href="/" className="text-[14px] font-medium text-black transition-colors">Home</a>
                <a href="#features" className="text-[14px] font-medium text-gray-500 hover:text-black transition-colors">Features</a>
                <a href="#how-it-works" className="text-[14px] font-medium text-gray-500 hover:text-black transition-colors">How It Works</a>
                <a href="#solutions" className="text-[14px] font-medium text-gray-500 hover:text-black transition-colors">Solutions</a>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-6">
                <a href="/login" className="text-[14px] font-medium text-gray-600 hover:text-black transition-colors">Login</a>
                <a href="/register" className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-md text-[14px] font-medium transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.1)]">Get Started</a>
              </div>
              
            </div>
          </div>
        </nav>
        <main className="flex-grow w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
