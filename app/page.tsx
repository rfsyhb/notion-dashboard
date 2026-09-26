'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ClipboardList, Wallet } from 'lucide-react';
import { TotalExpenses } from './components/TotalExpenses';

export default function Home() {
  const [currentDisplay, setCurrentDisplay] = useState('expenses');

  return (
    <div className="flex flex-col flex-1 p-2 px-4 items-center justify-center font-mono bg-background">
      <main className="flex flex-col gap-2 items-center">
        <div className="flex flex-roww items-center gap-2">
          <Image
            width={40}
            height={40}
            src={'/Notion_app_logo.png'}
            alt="notion_icon"
          />
          <h2 className="text-lg font-semibold">RAFI&rsquo;s DASHBOARD</h2>
        </div>
        <section className="flex flex-col items-center gap-1 min-h-34">
          <div className="flex flex-row gap-2 items-center">
            <span>hello world,</span>
            <div className="flex flex-row gap-1">
              <button
                className={`${currentDisplay === 'expenses' && 'bg-foreground text-background'} hover:cursor-pointer p-1 rounded-md`}
                onClick={() => setCurrentDisplay('expenses')}
              >
                <Wallet />
              </button>
              <button
                className={`${currentDisplay === 'todos' && 'bg-foreground text-background'} hover:cursor-pointer p-1 rounded-md`}
                onClick={() => setCurrentDisplay('todos')}
              >
                <ClipboardList />
              </button>
            </div>
          </div>
          {currentDisplay === 'expenses' && <TotalExpenses />}
          {currentDisplay === 'todos' && <p>tba, todo list</p>}
        </section>
      </main>
    </div>
  );
}
