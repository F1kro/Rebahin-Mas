import { Film, Github, Instagram, Facebook, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t-[6px] border-black bg-white pt-16 pb-8">
      {/* "The End" Style Badge */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#FF0000] border-[4px] border-black px-10 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-2">
        <span className="text-white font-black text-2xl uppercase italic tracking-tighter">
          To Be Continued...
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                <Film className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-black uppercase italic tracking-tighter">
                REBAHIN-MAS
              </span>
            </Link>
            <p className="font-bold text-sm uppercase leading-tight text-gray-600 max-w-xs mx-auto md:mx-0">
              Streaming platform gratis dengan vibe komik modern. Nonton film tanpa ribet!
            </p>
            {/* API Source Credit */}
            <a 
              href="https://zeldvorik.ru/rebahin21" 
              target="_blank" 
              className="inline-flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-black uppercase transition-colors"
            >
              <Database size={12} /> Legacy API Source: Zeldvorik
            </a>
          </div>

          {/* Social Media - Your Personal Links */}
          <div className="flex justify-center gap-4">
            {[
              { 
                icon: Github, 
                color: 'bg-[#00FFFF]', 
                url: 'https://github.com/F1kro' 
              },
              { 
                icon: Instagram, 
                color: 'bg-[#FF00FF]', 
                url: 'https://instagram.com/_fiqro' 
              },
              { 
                icon: Facebook, 
                color: 'bg-[#FFD700]', 
                url: 'https://facebook.com/fikro.najiah.7' 
              }
            ].map((social, idx) => (
              <a 
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} p-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center`}
              >
                <social.icon size={24} strokeWidth={3} className="text-black" />
              </a>
            ))}
          </div>

          {/* Copyright Area */}
          <div className="text-center md:text-right">
            <div className="inline-block border-2 border-black bg-yellow-300 p-2 rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-black text-xs uppercase italic text-black">
                © 2026 REBAHIN-MAS. ALL RIGHTS RESERVED.
              </p>
            </div>
            <p className="mt-4 font-bold text-[10px] text-gray-400 uppercase tracking-widest">
              Crafted with Power by Masfiq - Informatics UNRAM
            </p>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="mt-16 pt-8 border-t-2 border-dashed border-gray-300 flex justify-center opacity-20">
           <div className="flex gap-2">
             {[...Array(5)].map((_, i) => (
               <div key={i} className="w-3 h-3 bg-black rotate-45"></div>
             ))}
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;