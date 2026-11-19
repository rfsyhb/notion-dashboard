export function AlertCenter({ text }: { text: string }) {
  return (
    <p className="font-mono flex justify-center items-center h-full w-full">
      {text}
    </p>
  );
}
