export default function Home() {
  return (
    <div className="flex flex-col items-center w-full bg-white selection:bg-black selection:text-white font-sans">
      
      {/* 2. Hero Section (Text Only + Grid Background) */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-6 lg:px-12 pt-20 pb-20 overflow-hidden">
        
        {/* Subtle Check Box / Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-60 pointer-events-none"></div>

        {/* Text Content */}
        <div className="flex flex-col items-center text-center max-w-4xl space-y-8 animate-fade-in-up z-10 relative">
          <h1 className="text-[64px] sm:text-[96px] font-bold tracking-tight text-black leading-[1.05] animate-blur-reveal">
            Master your workflow. <br className="hidden sm:block" />
            <span className="animate-text-shimmer inline-block">Do your best work.</span>
          </h1>
          <p className="text-[20px] sm:text-[24px] text-gray-500 max-w-2xl leading-relaxed font-normal mt-6">
            A smarter way to organize your workflow, collaborate with teams, and track progress from one minimalist platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10 w-full sm:w-auto">
            <a href="/register" className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-10 py-5 rounded-md text-[16px] font-medium transition-transform hover:scale-105 shadow-[0_10px_40px_rgba(0,0,0,0.15)] text-center">Get Started Free</a>
            <a href="#features" className="w-full sm:w-auto bg-white border border-gray-300 hover:border-black text-black px-10 py-5 rounded-md text-[16px] font-medium transition-colors text-center shadow-sm">Explore Features</a>
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section id="features" className="w-full bg-[#FAFAFA] py-32 border-y border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-[40px] font-bold tracking-tight text-black mb-20 animate-fade-in-up">Everything You Need To Stay Organized</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-left shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-shadow animate-fade-in-up">
              <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center mb-8">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              </div>
              <h3 className="text-[20px] font-semibold text-black mb-3">Smart Task Management</h3>
              <p className="text-[16px] text-gray-500 leading-relaxed">Create, organize, prioritize, and track tasks effortlessly. Keep your team aligned and focused on what matters most.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-left shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-shadow animate-fade-in-up delay-100">
              <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center mb-8">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 className="text-[20px] font-semibold text-black mb-3">Team Collaboration</h3>
              <p className="text-[16px] text-gray-500 leading-relaxed">Assign tasks, communicate with teammates, and manage projects together. Built-in permissions ensure security and focus.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-left shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-shadow animate-fade-in-up delay-200">
              <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center mb-8">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="text-[20px] font-semibold text-black mb-3">Productivity Insights</h3>
              <p className="text-[16px] text-gray-500 leading-relaxed">Analyze progress and improve workflow efficiency. Visualize bottlenecks and celebrate team velocity.</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section id="how-it-works" className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-32 text-center">
        <h2 className="text-[40px] font-bold tracking-tight text-black mb-24">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          
          <div className="flex flex-col items-center text-center">
            <div className="text-[80px] font-bold text-gray-100 leading-none mb-6 font-serif">01</div>
            <h3 className="text-[24px] font-semibold text-black mb-4">Create Tasks</h3>
            <p className="text-[16px] text-gray-500 max-w-[280px]">Quickly capture objectives, set priorities, and define due dates in seconds.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="text-[80px] font-bold text-black leading-none mb-6 font-serif">02</div>
            <h3 className="text-[24px] font-semibold text-black mb-4">Assign Responsibilities</h3>
            <p className="text-[16px] text-gray-500 max-w-[280px]">Delegate to the right team members and establish clear accountability across the board.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="text-[80px] font-bold text-gray-100 leading-none mb-6 font-serif">03</div>
            <h3 className="text-[24px] font-semibold text-black mb-4">Complete Projects</h3>
            <p className="text-[16px] text-gray-500 max-w-[280px]">Execute with precision, track real-time progress, and deliver exceptional results.</p>
          </div>
        </div>
      </section>

      {/* 7. Benefits Section */}
      <section id="solutions" className="w-full bg-black py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="flex-1">
            <h2 className="text-[48px] font-bold tracking-tight text-white mb-10 leading-[1.1]">Work Smarter, <br />Not Harder</h2>
            <div className="space-y-6">
              {[
                "Reduce manual organization",
                "Never miss deadlines",
                "Improve team productivity",
                "Track every project easily"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-[18px] text-gray-300 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 w-full bg-[#111] rounded-2xl border border-gray-800 p-8 shadow-2xl">
            {/* Minimal dark mode UI representation */}
            <div className="w-full h-8 flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
               <div className="w-24 h-4 bg-gray-800 rounded"></div>
               <div className="w-8 h-4 bg-gray-700 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="w-full h-16 bg-[#1a1a1a] rounded-lg border border-gray-800 flex items-center px-4">
                 <div className="w-4 h-4 rounded-full border border-gray-600 mr-4"></div>
                 <div className="w-1/2 h-3 bg-gray-500 rounded-sm"></div>
                 <div className="ml-auto w-8 h-8 rounded-full bg-gray-700"></div>
              </div>
              <div className="w-full h-16 bg-[#1a1a1a] rounded-lg border border-gray-800 flex items-center px-4">
                 <div className="w-4 h-4 rounded-full border border-gray-600 mr-4"></div>
                 <div className="w-3/4 h-3 bg-gray-500 rounded-sm"></div>
                 <div className="ml-auto w-8 h-8 rounded-full bg-gray-800"></div>
              </div>
              <div className="w-full h-16 bg-[#1a1a1a] rounded-lg border border-gray-800 flex items-center px-4 opacity-50">
                 <div className="w-4 h-4 rounded-full bg-gray-600 mr-4 flex items-center justify-center">
                   <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <div className="w-1/3 h-3 bg-gray-600 rounded-sm line-through"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final Call-To-Action Section */}
      <section className="w-full bg-gray-50 py-40 border-y border-gray-200">
        <div className="max-w-[800px] mx-auto px-6 text-center flex flex-col items-center">
          <h2 className="text-[48px] font-bold tracking-tight text-black mb-12">Ready to take control of your workflow?</h2>
          <a href="/register" className="bg-black hover:bg-gray-800 text-white px-10 py-5 rounded-md text-[16px] font-medium transition-transform hover:scale-105 shadow-[0_10px_30px_rgba(0,0,0,0.15)] inline-block">Create Free Account</a>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="w-full bg-white py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
          
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-6 h-6 border-[3px] border-black rounded-[4px] relative">
              <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-[2px]"></div>
            </div>
            <span className="text-xl font-bold tracking-tight text-black">TaskFlow</span>
          </div>
          
          <div className="flex gap-8 text-[14px] font-medium text-gray-500">
            <a href="#" className="hover:text-black transition-colors">Product</a>
            <a href="#" className="hover:text-black transition-colors">Resources</a>
            <a href="#" className="hover:text-black transition-colors">Support</a>
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-black hover:text-gray-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="text-black hover:text-gray-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="#" className="text-black hover:text-gray-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
          
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center mt-12 pt-8 border-t border-gray-100 text-[12px] text-gray-400">
          &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
        </div>
      </footer>
      
    </div>
  );
}
