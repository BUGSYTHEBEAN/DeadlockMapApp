import { useState } from 'react'
import {
  Button,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router'
import supabase from '../../clients/supabase'

// Header component
// ref: https://tailwindui.com/components/marketing/elements/headers
export default function Header(props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="bg-neutral-900">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          {/*
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">DeadlockMini</span>
            <img
              alt=""
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
          */}
          <a href="/" className="-m-1.5 p-1.5 text-pretty text-lg font-medium text-neutral-100 sm:text-xl/8">
              dlkmap.com
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a href="#" className="text-lg/8 font-semibold text-neutral-100">
            Library
          </a>
          <a href="#" className="text-lg/8 font-semibold text-neutral-100">
            Community
          </a>
          <a href="/about" className="text-lg/8 font-semibold text-neutral-100" onClick={(e) => {
            e.preventDefault()
            navigate('/about')
          }}>
            About
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {
            props.session
              ? <button className="text-lg/8 font-semibold text-sky-400" onClick={() => setIsLogoutOpen(true)}>Logout</button>
              : <a href="/login" className="text-lg/8 font-semibold text-sky-400" onClick={(e) => {
                e.preventDefault()
                navigate('/login')
              }}>
                  Log In <span aria-hidden="true">&rarr;</span>
                </a>

          }
          <Dialog open={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} className={''}>
            <div className="fixed inset-0 flex w-screen items-center justify-center">
                <DialogPanel className="max-w-lg space-y-2 border-2 bg-neutral-950 p-6 text-white rounded-3xl">
                    <DialogTitle className="flex flex-row font-bold text-2xl">
                        <div className='text-transparent bg-clip-text bg-gradient-to-br from-rose-600 to-purple-500'>Logout</div>
                    </DialogTitle>
                    <Description className={'text-gray-400 text-md'}>Would you like to log out?</Description>
                    <div className='flex flex-row'>
                        <Button 
                            className={`rounded-md py-0.5 px-3 mr-2 w-32 text-sm/6 font-semibold text-neutral-100 border-2 shadow-inner shadow-white/20 focus:outline-none data-[hover]:bg-sky-700`}
                            onClick={() => setIsLogoutOpen(false)}
                        >
                            Back
                        </Button>
                        <Button 
                            className={`rounded-md py-0.5 px-3 w-32 text-sm/6 font-semibold text-neutral-100 border-2 shadow-inner shadow-white/20 focus:outline-none data-[hover]:bg-rose-700`}
                            onClick={() => {
                              setIsLogoutOpen(false)
                              supabase.auth.signOut({scope: 'local'})
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </DialogPanel>
            </div>
          </Dialog>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-neutral-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-neutral-100/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-neutral-100"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-neutral-100/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-neutral-100 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-neutral-100 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-neutral-100 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-neutral-100 hover:bg-gray-50"
                >
                  Coming Soon ...
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}