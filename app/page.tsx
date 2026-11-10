'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ClipboardList, Wallet } from 'lucide-react';
import { TotalExpenses } from './components/TotalExpenses';
import { DailyTask } from './components/DailyTask';
import { useAuth } from '@/lib/hooks/useAuth';
import TodoList from './components/TodoList';

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
        <section className="flex flex-col items-center gap-3">
          <div className="flex flex-row gap-2 items-center">
            <span>hello world,</span>
            <div className="flex flex-row gap-1">
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
          {currentDisplay === '' && authData?.authenticated ? (
            <DailyTask />
          ) : (
            currentDisplay === '' && <p>unauthorized!</p>
          )}
          <div className={`${currentDisplay === '' && 'hidden'}`}>
            {currentDisplay === 'expenses' && <TotalExpenses />}
            {currentDisplay === 'todos' && <TodoList />}
          </div>
        </section>
      </main>
    </div>
  );
}
