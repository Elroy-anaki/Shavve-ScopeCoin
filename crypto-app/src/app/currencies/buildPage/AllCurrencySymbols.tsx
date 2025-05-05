import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
export function AllCurrenciesSymbols({symbols, fn}: any) {
    return (
      <Select onValueChange={(value) => fn(value)}>
        <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600 text-white hover:bg-gray-600 focus:ring-purple-500 focus:border-purple-500">
          <SelectValue placeholder="Select Currency" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700 text-white">
          {Object.entries(symbols || {}).map(([code, name]) => (
            <SelectItem key={code} value={code} className="hover:bg-gray-700 focus:bg-gray-700">
              {code} - {name as string}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }