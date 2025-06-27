import {useState} from 'react';
import Link from 'next/link';

import {nunito} from '@src/assets/fonts/fonts';
import {MagnifyingGlass} from '@src/assets/icons/MagnifyingGlass';
import {useBreakpoint} from '@src/hooks/useBreakPoint';
import {isLowerOrEqualThan} from '@src/utils/breakpoints';

import {LogoWithText} from './core/LogoWithText';

export function Layout({children}: {children: React.ReactNode}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const breakpoint = useBreakpoint();

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

      <header className="bg-main-yellow shadow-sm h-16 sm:h-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <Link href="/" className="flex-shrink-0">
              <LogoWithText withText={!isLowerOrEqualThan(breakpoint, 'sm')} />
            </Link>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                href="/search"
                className="sm:hidden p-2 text-gray-500 hover:text-gray-700">
                <MagnifyingGlass />
              </Link>

              <Link
                href="/login"
                className="border border-dark px-3 py-2 sm:px-5 sm:py-3 rounded-full text-sm">
                <span className="text-dark">Sign in</span>
              </Link>

              <button
                className="sm:hidden p-2 text-gray-700"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="hidden sm:flex items-center justify-between h-16">
            <div className="flex space-x-4 lg:space-x-8">
              <Link
                href="/"
                className="text-txt-secondary px-3 py-2 text-sm font-medium hover:text-gray-900">
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

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b">
            <div className="py-4 space-y-1 px-3">
              <Link
                href="/"
                className="block text-txt-secondary hover:text-gray-900 px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link
                href="/articles"
                className="block text-txt-secondary hover:text-gray-900 px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}>
                Articles
              </Link>
              <Link
                href="/quick-answers"
                className="block text-txt-secondary hover:text-gray-900 px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}>
                Quick answers
              </Link>
              <Link
                href="/discussions"
                className="block text-txt-secondary hover:text-gray-900 px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}>
                Discussions
              </Link>
              <Link
                href="/newsletter"
                className="block text-txt-secondary hover:text-gray-900 px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}>
                Newsletter
              </Link>
              <Link
                href="/community"
                className="block text-txt-secondary hover:text-gray-900 px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}>
                Community
              </Link>
              <Link
                href="/faq"
                className="block text-txt-secondary hover:text-gray-900 px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}>
                FAQ
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 flex-1">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <main className="flex-1">{children}</main>
        </div>
      </div>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <LogoWithText
              mainTextClassName="text-white"
              subTextClassName="text-white"
              logoClassName=""
              width={45}
              height={45}
            />
          </div>

          <div className="grid grid-cols-2 sm:flex sm:justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
            <Link
              href="/advertise"
              className="text-white hover:text-gray-300 text-sm text-center">
              Advertise
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-gray-300 text-sm text-center">
              About Us
            </Link>
            <Link
              href="/privacy"
              className="text-white hover:text-gray-300 text-sm text-center">
              Privacy
            </Link>
            <Link
              href="/cookies"
              className="text-white hover:text-gray-300 text-sm text-center">
              Cookies
            </Link>
            <Link
              href="/terms"
              className="text-white hover:text-gray-300 text-sm text-center col-span-2 sm:col-span-1">
              Terms Of Use
            </Link>
          </div>

          <div className="text-center text-txt-secondary text-xs px-4">
            Copyright 1999-{new Date().getFullYear()} © CodeProject. All Rights
            Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
