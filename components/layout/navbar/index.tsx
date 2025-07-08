import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import {getMenu, getMenuWithChildren} from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenuWithChildren('home-menu');
  // TODO: fix style et enlever mb-8 sur nav
  return (
    <nav className="relative flex items-center justify-between p-4 lg:py-6 lg:px-6 mb-8">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex flex-col w-full items-center">
        <div className="flex w-full">
          <div className="flex w-full md:w-1/3">
            <Link
                href="/"
                prefetch={true}
                className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
              <LogoSquare/>
              <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
                {SITE_NAME}
              </div>
            </Link>
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            <Suspense fallback={<SearchSkeleton/>}>
              <Search/>
            </Suspense>
          </div>
          <div className="flex justify-end md:w-1/3">
            <CartModal/>
          </div>
        </div>
        {menu.length ? (
            <ul className="hidden p-6 gap-6 text-sm md:flex md:items-center">
              {menu.map((item) => (
                  <li key={item.title} className="relative group">
                    <Link
                        href={item.path}
                        prefetch={true}
                        className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                      {item.title}
                    </Link>
                    {item.items && (
                        <ul className="absolute left-0 top-full mt-0 bg-white shadow-lg rounded-md py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                          {item.items.map((subItem) => (
                              <li key={subItem.title} className="px-4 py-2 hover:bg-gray-100">
                                <Link href={subItem.path} className="text-neutral-500 hover:text-black">
                                  {subItem.title}
                                </Link>
                              </li>
                          ))}
                        </ul>
                    )}
                  </li>
              ))}
            </ul>
        ) : null}
      </div>
    </nav>
  );
}
