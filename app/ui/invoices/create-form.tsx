'use client'

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction}>
      <div className="bg-gray-50 p-4 md:p-6 rounded-md">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="block mb-2 font-medium text-sm">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="block border-gray-200 py-2 pl-10 border rounded-md w-full text-sm placeholder:text-gray-500 cursor-pointer outline-2 peer"
              defaultValue=""
              aria-describedby='customer-error'
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="top-1/2 left-3 absolute w-[18px] h-[18px] text-gray-500 -translate-y-1/2 pointer-events-none" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-red-500 text-sm" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="block mb-2 font-medium text-sm">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="block border-gray-200 py-2 pl-10 border rounded-md w-full text-sm placeholder:text-gray-500 outline-2 peer"
                aria-describedby='amount-error'
              />
              <CurrencyDollarIcon className="top-1/2 left-3 absolute w-[18px] h-[18px] text-gray-500 peer-focus:text-gray-900 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p className="mt-2 text-red-500 text-sm" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="block mb-2 font-medium text-sm">
            Set the invoice status
          </legend>
          <div className="border-gray-200 bg-white px-[14px] py-3 border rounded-md">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="border-gray-300 bg-gray-100 focus:ring-2 w-4 h-4 text-gray-600 cursor-pointer"
                  aria-describedby='status-error'
                />
                <label
                  htmlFor="pending"
                  className="flex items-center gap-1.5 bg-gray-100 ml-2 px-3 py-1.5 rounded-full font-medium text-gray-600 text-xs cursor-pointer"
                >
                  Pending <ClockIcon className="w-4 h-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="border-gray-300 bg-gray-100 focus:ring-2 w-4 h-4 text-gray-600 cursor-pointer"
                  aria-describedby='status-error'
                />
                <label
                  htmlFor="paid"
                  className="flex items-center gap-1.5 bg-green-500 ml-2 px-3 py-1.5 rounded-full font-medium text-white text-xs cursor-pointer"
                >
                  Paid <CheckIcon className="w-4 h-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-red-500 text-sm" key={error}>
                  {error}
                </p>
              ))}
          </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Link
          href="/dashboard/invoices"
          className="flex items-center bg-gray-100 hover:bg-gray-200 px-4 rounded-lg h-10 font-medium text-gray-600 text-sm transition-colors"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}