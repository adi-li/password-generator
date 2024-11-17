'use client';

import {
  type Configuration,
  configurationAtom,
} from '@/state/passwordGeneratorConfiguration';
import { zodResolver } from '@hookform/resolvers/zod';
import { DEFAULT_SYMBOLS } from '@packages/core';
import { useAtom } from 'jotai';
import { Settings } from 'lucide-react';
import { useState } from 'react';
import { type Control, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Switch } from './ui/switch';

const commonSchema = z.object({
  length: z.number().min(6).max(256),
  count: z.number().min(1).max(100),
});

const formSchema = z.discriminatedUnion('mode', [
  commonSchema.extend({
    mode: z.literal('advanced'),
    chars: z.string().min(2).max(1024),
  }),
  commonSchema.extend({
    mode: z.literal('lite'),
    upper: z.boolean().default(true),
    lower: z.boolean().default(true),
    digits: z.boolean().default(true),
    symbols: z.string().min(0).optional(),
  }),
]);

const ModeBasedConfiguration = ({
  control,
}: { control: Control<Configuration> }) => {
  const mode = useWatch({ control, name: 'mode' });
  return mode === 'advanced' ? (
    <>
      <FormField
        control={control}
        name="chars"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Characters to be used</FormLabel>
            <FormControl>
              <Input {...field} value={field.value ?? ''} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  ) : (
    <div className="grid grid-cols-2 gap-8">
      <FormField
        control={control}
        name="upper"
        render={({ field }) => (
          <FormItem className="flex justify-between max-sm:col-span-2">
            <div>
              <FormLabel>Uppercase</FormLabel>
              <FormDescription>
                {field.value ? 'Include' : 'Exclude'} uppercase characters
              </FormDescription>
              <FormMessage />
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="lower"
        render={({ field }) => (
          <FormItem className="flex justify-between max-sm:col-span-2">
            <div>
              <FormLabel>Lowercase</FormLabel>
              <FormDescription>
                {field.value ? 'Include' : 'Exclude'} lowercase characters
              </FormDescription>
              <FormMessage />
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="digits"
        render={({ field }) => (
          <FormItem className="flex justify-between max-sm:col-span-2">
            <div>
              <FormLabel>Digits</FormLabel>
              <FormDescription>
                {field.value ? 'Include' : 'Exclude'} numberic characters
              </FormDescription>
              <FormMessage />
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="symbols"
        render={({ field }) => (
          <FormItem className="col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between">
              <FormLabel>Symbols</FormLabel>
              <Button
                variant="outline"
                type="button"
                onClick={() => field.onChange(DEFAULT_SYMBOLS)}
              >
                Reset to default
              </Button>
            </div>
            <FormControl>
              <Input {...field} value={field.value ?? ''} />
            </FormControl>
            <FormDescription>
              Specify other characters you want to use.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export const PasswordGeneratorConfigurator = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [configuration, setConfiguration] = useAtom(configurationAtom);
  const form = useForm<Configuration>({
    resolver: zodResolver(formSchema),
    values: configuration,
    defaultValues: configuration,
  });

  const onSubmit = (values: Configuration) => {
    setConfiguration(values);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="mx-auto flex">
          Change Settings
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90%] max-w-[95%] overflow-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Edit Settings</DialogTitle>
              <DialogDescription>
                Change the rules of generating passwords
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FormField
                control={form.control}
                name="count"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <div>
                        <FormLabel>Generate Count</FormLabel>
                        <FormDescription>
                          Number of passwords going to generate
                        </FormDescription>
                      </div>
                      <FormControl className="mx-2">
                        <Input
                          {...field}
                          className="w-12"
                          type="number"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          onChange={(e) => {
                            const newValue = Number.parseInt(
                              e.currentTarget.value,
                            );
                            field.onChange(
                              Number.isNaN(newValue) ? e : newValue,
                            );
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <div>
                        <FormLabel>Password Length</FormLabel>
                        <FormDescription>
                          Number of characters in a single password
                        </FormDescription>
                      </div>
                      <FormControl className="mx-2">
                        <Input
                          {...field}
                          className="w-12"
                          type="number"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          onChange={(e) => {
                            const newValue = Number.parseInt(
                              e.currentTarget.value,
                            );
                            field.onChange(
                              Number.isNaN(newValue) ? e : newValue,
                            );
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem className="flex justify-between">
                  <div>
                    <FormLabel>Lite mode</FormLabel>
                    <FormDescription>
                      {field.value === 'advanced'
                        ? 'Fully control what characters to be used'
                        : 'Use default characters settings'}
                    </FormDescription>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Switch
                      name={field.name}
                      disabled={field.disabled}
                      checked={field.value === 'lite'}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? 'lite' : 'advanced')
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <ModeBasedConfiguration control={form.control} />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
