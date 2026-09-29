export default function PageLoader() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-black/[0.06] flex items-center px-8 lg:px-16">
        <div className="w-28 h-5 bg-black/8 rounded-md animate-pulse" />
        <div className="ml-auto hidden md:flex items-center gap-6">
          <div className="w-16 h-4 bg-black/6 rounded animate-pulse" />
          <div className="w-16 h-4 bg-black/6 rounded animate-pulse" />
          <div className="w-16 h-4 bg-black/6 rounded animate-pulse" />
          <div className="w-24 h-8 bg-black/8 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="pt-16 h-[55vh] bg-black/[0.04] animate-pulse" />

      {/* Content skeleton */}
      <div className="max-w-5xl mx-auto px-8 lg:px-16 py-16 w-full flex-1">
        <div className="space-y-4 mb-10">
          <div className="w-24 h-3 bg-black/6 rounded animate-pulse" />
          <div className="w-2/3 h-8 bg-black/8 rounded-lg animate-pulse" />
          <div className="w-1/2 h-5 bg-black/5 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-black/[0.06]">
              <div className="h-52 bg-black/[0.05] animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
              <div className="p-5 space-y-3">
                <div className="w-3/4 h-5 bg-black/6 rounded animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
                <div className="w-full h-3 bg-black/4 rounded animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
                <div className="w-2/3 h-3 bg-black/4 rounded animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
