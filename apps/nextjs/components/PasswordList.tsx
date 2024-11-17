'use client';

import { configurationAtom } from '@/state/passwordGeneratorConfiguration';
import { generatePasswords } from '@packages/core';
import { useAtomValue } from 'jotai';
import { Copy, RefreshCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

const CopyButton = ({ copyText }: { copyText: string }) => {
  const [copied, setCopied] = useState(false);

  const onClick = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
  };

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(id);
  }, [copied]);

  return copied ? (
    <Label className="leading-10">Copied</Label>
  ) : (
    <Button variant="outline" size="icon" onClick={onClick}>
      <Copy />
      <span className="sr-only">Copy password</span>
    </Button>
  );
};

export const PasswordList = () => {
  const configuration = useAtomValue(configurationAtom);
  const [refresh, setRefresh] = useState(false);
  const passwords = useMemo(() => {
    // used to register as dependency
    refresh;
    return generatePasswords(configuration);
  }, [configuration, refresh]);

  const forceRefresh = () => setRefresh((prev) => !prev);

  return (
    <ScrollArea className="w-full overflow-auto">
      <Table className="text-center">
        <TableCaption className="mt-0 mb-4 caption-top">
          <span className="inline-flex items-center">
            Generated Passwords
            <Button
              variant="ghost"
              size="icon"
              className="ml-1"
              onClick={forceRefresh}
            >
              <RefreshCcw />
              <span className="sr-only">Generate again</span>
            </Button>
          </span>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20 text-center">#</TableHead>
            <TableHead className="text-center">Password</TableHead>
            <TableHead className="w-20 text-center">Copy</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {passwords.map((password, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static table
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="break-all font-mono">{password}</TableCell>
              <TableCell>
                <CopyButton copyText={password} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
