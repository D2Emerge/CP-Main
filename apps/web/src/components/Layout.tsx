import Link from 'next/link';

import {nunito} from '@src/assets/fonts/fonts';
import {MagnifyingGlass} from '@src/assets/icons/MagnifyingGlass';

import {LogoWithText} from './core/LogoWithText';

export function Layout({children}: {children: React.ReactNode}) {
  return (
    <div
      className={`min-h-screen bg-gray-50 font-nunito ${nunito.variable} flex flex-col`}>
      <div className="text-white text-sm py-2 px-4 text-center">
        <span className="text-dark">
          Trust Or Verify? - The Risks Lurking in AI-Generated Code | LIVE
          Webinar
        </span>
        <button className="ml-4 bg-additional px-3 py-1 rounded text-xs font-medium">
          Register Now
        </button>
      </div>

      <header className="bg-main-yellow shadow-sm h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <Link href="/">
              <LogoWithText />
            </Link>

            <div className="flex items-center">
              <Link
                href="/login"
                className="border border-dark px-5 py-3 rounded-full rounded-2xl">
                <p> Sign in</p>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex space-x-8">
              <Link
                href="/"
                className="text-txt-secondary px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link
                href="/articles"
                className="text-txt-secondary hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Articles
              </Link>
              <Link
                href="/quick-answers"
                className="text-txt-secondary hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Quick answers
              </Link>
              <Link
                href="/discussions"
                className="text-txt-secondary hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Discussions
              </Link>
              <Link
                href="/newsletter"
                className="text-txt-secondary hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Newsletter
              </Link>
              <Link
                href="/community"
                className="text-txt-secondary hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Community
              </Link>
              <Link
                href="/faq"
                className="text-txt-secondary hover:text-gray-900 px-3 py-2 text-sm font-medium">
                FAQ
              </Link>
            </div>

            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <MagnifyingGlass />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
        <div className="flex gap-6">
          <main className="flex-1">{children}</main>
        </div>
      </div>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center mb-8">
            <LogoWithText
              mainTextClassName="text-white"
              subTextClassName="text-white"
              logoClassName=""
              width={45}
              height={45}
            />
          </div>

          <div className="flex justify-center space-x-6 mb-6">
            <Link
              href="/advertise"
              className="text-white hover:text-white text-sm">
              Advertise
            </Link>
            <Link href="/about" className="text-white hover:text-white text-sm">
              About Us
            </Link>
            <Link
              href="/privacy"
              className="text-white hover:text-white text-sm">
              Privacy
            </Link>
            <Link
              href="/cookies"
              className="text-white hover:text-white text-sm">
              Cookies
            </Link>
            <Link href="/terms" className="text-white hover:text-white text-sm">
              Terms Of Use
            </Link>
          </div>

          <div className="text-center text-txt-secondary text-xs">
            Copyright 1999-{new Date().getFullYear()} © CodeProject. All Rights
            Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
