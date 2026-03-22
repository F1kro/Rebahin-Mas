from pathlib import Path

replacements = [
    ('src/pages/Home.jsx', 'text-black drop-shadow-[3px_3px_0px_rgba(255,215,0,1)]', 'text-black drop-shadow-[3px_3px_0px_rgba(255,215,0,1)] dark:text-white'),
    ('src/pages/Home.jsx', 'text-sm font-bold block md:inline md:ml-2 not-italic tracking-normal text-gray-500', 'text-sm font-bold block md:inline md:ml-2 not-italic tracking-normal text-gray-500 dark:text-gray-300'),
    ('src/pages/Home.jsx', 'className= group flex items-center space-x-2 font-black uppercase italic text-sm border-b-4 border-black hover:text-[#FF0000] transition-colors', 'className=group flex items-center space-x-2 font-black uppercase italic text-sm border-b-4 border-black hover:text-[#FF0000] transition-colors dark:text-white'),
    ('src/pages/Home.jsx', 'text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-black>, text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-black dark:text-white>'),
    ('src/pages/Home.jsx', 'text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none, text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none dark:text-white'),
    ('src/pages/Movies.jsx', 'className=mt-4 bg-white border-2 border-black inline-block px-4 py-1 shadow-[3px_3px_0_0_rgba 0 0 0 1 ] rotate-1', 'className=mt-4 bg-white border-2 border-black inline-block px-4 py-1 shadow-[3px_3px_0_0_rgba 0 0 0 1 ] rotate-1 dark:bg-slate-900 dark:border-slate-700'),
    ('src/pages/Movies.jsx', 'className=font-bold text-black uppercase tracking-widest text-xs md:text-sm', 'className=font-bold text-black uppercase tracking-widest text-xs md:text-sm dark:text-white'),
    ('src/pages/Movies.jsx', '<span>Prev Page</span>', '<span class=dark:text-white>Prev Page</span>'),
    ('src/pages/Movies.jsx', '<span>Next Page</span>', '<span class=dark:text-white>Next Page</span>'),
    ('src/pages/Movies.jsx', 'className=text-center py-32 bg-white border-[4px] border-black shadow-[10px_10px_0_0_rgba 0 0 0 1 ] ', 'className= text-center py-32 bg-white border-[4px] border-black shadow-[10px_10px_0_0_rgba 0 0 0 1 ] dark:bg-slate-900 dark:border-slate-700'),
    ('src/pages/Movies.jsx', '<h2 class=text-5xl font-black uppercase italic tracking-tighter mb-4>Empty Panel!</h2>', '<h2 class=text-5xl font-black uppercase italic tracking-tighter mb-4 dark:text-white>Empty Panel!</h2>'),
    ('src/pages/Movies.jsx', '<p class=text-xl font-bold text-gray-500>No movies found in this section.</p>', '<p class=text-xl font-bold text-gray-500 dark:text-gray-300>No movies found in this section.</p>'),
    ('src/components/Footer.jsx', 'text-3xl font-black uppercase italic tracking-tighter, text-3xl font-black uppercase italic tracking-tighter dark:text-white'),
    ('src/components/Footer.jsx', 'font-bold text-sm uppercase leading-tight text-gray-600', 'font-bold text-sm uppercase leading-tight text-gray-600 dark:text-gray-300'),
    ('src/components/Footer.jsx', 'font-bold text-[10px] text-gray-400 uppercase tracking-widest', 'font-bold text-[10px] text-gray-400 uppercase tracking-widest dark:text-gray-400'),
    ('src/pages/PlayerAlternative.jsx', 'bg-white border-[4px] border-black p-10 shadow-[8px_8px_0_0_rgba(0,0,0,1)] text-center', 'bg-white border-[4px] border-black p-10 shadow-[8px_8px_0_0_rgba(0,0,0,1)] text-center dark:bg-slate-900 dark:border-slate-700'),
]

for path, old, new in replacements:
    data = Path(path).read_text()
    if old not in data:
        raise SystemExit(f'Missing pattern in {path}: {old}')
    Path(path).write_text(data.replace(old, new))
