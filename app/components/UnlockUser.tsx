'use client';

import { useState } from 'react';

export default function Unlock() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  async function unlock() {
    const response = await fetch('/api/auth/unlock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
      }),
    });

    if (!response.ok) {
      setError('Invalid code');
      return;
    }

    setCode('');
    setError('');
  }

  return (
    <div className="fixed bottom-4 right-4">
      <input
        type="password"
        value={code}
        onChange={(event) => setCode(event.target.value)}
        placeholder="Access code"
      />

      <button onClick={unlock}>Unlock</button>

      {error && <p>{error}</p>}
    </div>
  );
}
