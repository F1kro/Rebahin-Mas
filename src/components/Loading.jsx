const Loading = () => {
  return (
    /* h-[70vh] memastikan container ini punya tinggi 70% dari layar 
       sehingga konten di dalamnya bisa benar-benar di tengah */
    <div className="flex justify-center items-center h-[70vh] w-full bg-transparent">
      <div className="relative flex flex-col items-center">
        {/* Comic Thinking Bubble / Blast Effect */}
        <div className="relative group">
          <div className="absolute inset-0 bg-black rounded-none translate-x-2 translate-y-2"></div>
          
          <div className="relative bg-white border-[4px] border-black px-8 py-6 flex flex-col items-center animate-bounce">
            <div className="flex space-x-2 mb-3">
              <div className="w-4 h-4 bg-[#FF0000] border-2 border-black animate-[ping_1s_infinite]"></div>
              <div className="w-4 h-4 bg-[#FFD700] border-2 border-black animate-[ping_1.2s_infinite]"></div>
              <div className="w-4 h-4 bg-[#00FFFF] border-2 border-black animate-[ping_1.4s_infinite]"></div>
            </div>
            
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-black">
              Loading<span className="animate-pulse">...</span>
            </h2>
            
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-black rotate-45"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-[#FF0000] border-2 border-black -rotate-12"></div>
          </div>
        </div>

        <p className="mt-8 font-bold text-black uppercase tracking-widest text-xs bg-yellow-300 px-3 py-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          Please wait for the action!
        </p>
      </div>
    </div>
  );
};

export default Loading;