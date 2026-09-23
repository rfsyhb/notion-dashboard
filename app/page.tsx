import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-mono bg-background">
      <main className='flex flex-row gap-2 items-center'>
        <Image
          width={40}
          height={40}
          src={'/Notion_app_logo.png'}
          alt="notion_icon"
        />
        <h2 className='text-lg font-semibold'>Rafi&rsquo;s Dashboard</h2>
      </main>
    </div>
  );
}
