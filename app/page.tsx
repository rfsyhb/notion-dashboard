import Image from 'next/image';
import { TotalExpenses } from './components/TotalExpenses';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-mono bg-background">
      <main className="flex flex-col gap-2 items-center">
        <div className="flex flex-roww items-center gap-2">
          <Image
            width={40}
            height={40}
            src={'/Notion_app_logo.png'}
            alt="notion_icon"
          />
          <h2 className="text-lg font-semibold">Rafi&rsquo;s Dashboard</h2>
        </div>
        <span className='flex flex-row items-center gap-3'>
          total spending <TotalExpenses />
        </span>
      </main>
    </div>
  );
}
