import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import {
  CustomersTableType,
  FormattedCustomersTable,
} from '@/app/lib/definitions';

export default async function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Search placeholder="Search customers..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="bg-gray-50 p-2 md:pt-0 rounded-md overflow-hidden">
              <div className="md:hidden">
                {customers?.map((customer) => (
                  <div
                    key={customer.id}
                    className="bg-white mb-2 p-4 rounded-md w-full"
                  >
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center gap-3">
                            <Image
                              src={customer.image_url}
                              className="rounded-full"
                              alt={`${customer.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p>{customer.name}</p>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-5 border-b w-full">
                      <div className="flex flex-col w-1/2">
                        <p className="text-xs">Pending</p>
                        <p className="font-medium">{customer.total_pending}</p>
                      </div>
                      <div className="flex flex-col w-1/2">
                        <p className="text-xs">Paid</p>
                        <p className="font-medium">{customer.total_paid}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{customer.total_invoices} invoices</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden rounded-md min-w-full text-gray-900 md:table">
                <thead className="bg-gray-50 rounded-md font-normal text-left text-sm">
                  <tr>
                    <th scope="col" className="px-4 py-5 sm:pl-6 font-medium">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Invoices
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Pending
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Total Paid
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="group">
                      <td className="bg-white py-5 pr-3 pl-4 sm:pl-6 group-first-of-type:rounded-md group-last-of-type:rounded-md text-black text-sm whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Image
                            src={customer.image_url}
                            className="rounded-full"
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{customer.name}</p>
                        </div>
                      </td>
                      <td className="bg-white px-4 py-5 text-sm whitespace-nowrap">
                        {customer.email}
                      </td>
                      <td className="bg-white px-4 py-5 text-sm whitespace-nowrap">
                        {customer.total_invoices}
                      </td>
                      <td className="bg-white px-4 py-5 text-sm whitespace-nowrap">
                        {customer.total_pending}
                      </td>
                      <td className="bg-white px-4 py-5 group-first-of-type:rounded-md group-last-of-type:rounded-md text-sm whitespace-nowrap">
                        {customer.total_paid}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
