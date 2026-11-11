'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ClipboardList, Sparkles, Wallet } from 'lucide-react';
import { TotalExpenses } from './components/TotalExpenses';
import { DailyTask } from './components/DailyTask';
import { useAuth } from '@/lib/hooks/useAuth';
import TodoList from './components/TodoList';
import FragmentList from './components/FragmentList';

export default function Home() {
  const [currentDisplay, setCurrentDisplay] = useState('');
  const { data: authData } = useAuth();

  const setCurrent = (display: string) => {
    if (currentDisplay !== display) {
      // console.log('setCurrentDisplay', display);
      return setCurrentDisplay(display);
    }
    setCurrentDisplay('');
  };

  return (
    <div className="flex flex-col flex-1 p-2 px-4 items-center justify-center font-mono bg-background w-full">
      <main className="flex flex-col items-center w-full max-w-md h-[65vh] gap-4">
        <div className="flex flex-col items-center w-full">
          {/* <div className="flex flex-row items-center">
            <Image
              width={40}
              height={40}
              src={'/Notion_app_logo.png'}
              alt="notion_icon"
            />
            <h2 className="text-lg font-semibold">RAFI&rsquo;s DASHBOARD</h2>
          </div> */}
          <div className="flex flex-row gap-2 items-center">
            <span>hello world,</span>
            <div className="flex flex-row gap-1">
              <button
                className={`${currentDisplay === 'fragments' && 'bg-foreground text-background'} hover:cursor-pointer p-1 rounded-md`}
                onClick={() => setCurrent('fragments')}
              >
                <Sparkles />
              </button>
              <button
                className={`${currentDisplay === 'expenses' && 'bg-foreground text-background'} hover:cursor-pointer p-1 rounded-md`}
                onClick={() => setCurrent('expenses')}
              >
                <Wallet />
              </button>
              <button
                className={`${currentDisplay === 'todos' && 'bg-foreground text-background'} hover:cursor-pointer p-1 rounded-md`}
                onClick={() => setCurrent('todos')}
              >
                <ClipboardList />
              </button>
            </div>
          </div>
        </div>
        <section className="order-first flex flex-col items-center justify-center w-full min-h-0 h-full">
          {currentDisplay === '' && authData?.authenticated ? (
            <DailyTask />
          ) : (
            currentDisplay === '' && <p>unauthorized!</p>
          )}
          <div
            className={`${currentDisplay === '' && 'hidden'} w-full h-full flex justify-center`}
          >
            {currentDisplay === 'expenses' && <TotalExpenses />}
            {currentDisplay === 'todos' && <TodoList />}
            {currentDisplay === 'fragments' && <FragmentList />}
          </div>
        </section>
      </main>
    </div>
  );
}
