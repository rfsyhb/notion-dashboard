import { GetFragmentsPayload } from "./types";

export async function getFragments(): Promise<GetFragmentsPayload> {
  const response = await fetch('/api/fragments');

  if (!response.ok) {
    throw new Error('Failed to fetch fragments');
  }

  return response.json();
}
