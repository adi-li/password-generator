import { generatePasswords } from '@packages/core';
import { type NextRequest, NextResponse } from 'next/server';

const getFlag = (str: string | null, defaultValue: boolean) =>
  str == null ? defaultValue : str === '1' || str === 'true';

const getNumber = (str: string | null, defaultValue: number) => {
  if (str == null) return defaultValue;
  const num = Number.parseInt(str);
  if (Number.isNaN(num)) return defaultValue;
  return num;
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const input = {
    chars: searchParams.get('chars') || undefined,
    symbols: searchParams.get('symbols') ?? undefined,
    upper: getFlag(searchParams.get('upper'), true),
    lower: getFlag(searchParams.get('lower'), true),
    digits: getFlag(searchParams.get('digits'), true),
    length: getNumber(searchParams.get('length'), 20),
    count: getNumber(searchParams.get('count'), 10),
  };
  return NextResponse.json({
    passwords: generatePasswords(input),
  });
}
