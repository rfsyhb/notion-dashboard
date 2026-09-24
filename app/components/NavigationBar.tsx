'use client';

import { ClipboardList, House, Wallet } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    href: '/',
    label: 'Home',
    icon: House,
  },
  {
    href: '/expenses',
    label: 'Expenses',
    icon: Wallet,
  },
  {
    href: '/todo',
    label: 'Tasks',
    icon: ClipboardList
  }
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 md:left-0 md:h-screen md:w-fit w-full md:py-0 py-2 flex justify-center items-center px-2">
      <ul className="flex md:flex-col md:gap-2 gap-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <li
              key={href}
              className={`border rounded-lg ${
                isActive
                  ? 'bg-foreground text-background'
                  : 'bg-background text-foreground'
              }`}
            >
              <Link
                href={href}
                className={`flex flex-row items-center gap-1 px-2 py-1`}
              >
                <Icon size={20} />
                <span className='md:block hidden'>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
