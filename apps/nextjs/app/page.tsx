import { ClientOnly } from '@/components/ClientOnly';
import { PasswordGeneratorConfigurator } from '@/components/PasswordGeneratorConfigurator';
import { PasswordList } from '@/components/PasswordList';
import { Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex h-svh flex-col items-center justify-center gap-16 pt-8 pb-20 sm:p-20">
      <main className="flex min-h-0 w-full flex-col items-center gap-8 sm:items-start">
        <h1 className="w-full px-4 text-center font-bold text-3xl">
          Password Generator
        </h1>
        <ClientOnly>
          <PasswordGeneratorConfigurator />
          <PasswordList />
        </ClientOnly>
      </main>
      <footer className="flex shrink-0 flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/adi-li/password-generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Globe className="w-4" />
          See source code →
        </a>
      </footer>
    </div>
  );
}
