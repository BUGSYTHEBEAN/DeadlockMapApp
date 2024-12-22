export default function About() {
    return (
      <div className="bg-neutral-900 min-h-screen">
        <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-sky-400 sm:text-7xl">
              About
            </h1>
            <p className="mt-6 text-pretty text-lg font-medium text-neutral-100 sm:text-xl/8">
              Hi, I play deadlock and made this site for fun :D
            </p>
            <p className="mt-2 text-pretty text-lg font-small text-neutral-100 sm:text-lg/8">
              Feel free to use the images as you like but please don't edit out the watermark.
            </p>
            <p className="mt-2 text-pretty text-lg font-small text-neutral-100 sm:text-lg/8">
              working on new features and changes coming soon
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/"
                className="rounded-md bg-sky-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </a>
              <a href="#" className="text-sm font-semibold text-sky-400">
                Contact support (we don't have support) <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
      </div>
    )
  }