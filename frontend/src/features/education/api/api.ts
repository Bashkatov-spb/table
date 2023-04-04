import { Education } from '../types/EducationTypes';

export async function loadEducationTypes(): Promise<Education[]> {
  const res = await fetch('/api/educations');
  return res.json();
}

export async function addNewEducationType(newEducation: string): Promise<Education> {
  const res = await fetch('/api/educations', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      education: newEducation,
    }),
  });
  return res.json();
}

export async function removeEducationType(educationId: number): Promise<number> {
  const res = await fetch(`/api/educations/${educationId}`, {
    method: 'DELETE',
  });
  return res.json();
}

export async function updateEducationType(education: Education): Promise<Education> {
  const res = await fetch(`/api/educations/${education.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      education: education.education,
    }),
  });
  return res.json();
}
