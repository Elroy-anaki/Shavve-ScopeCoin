import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
  type CryptoItem = {
    id: number
    name: string
    symbol: string
  }
  
  type SelectCryptoProps = {
    data: CryptoItem[] | null | any
    fn: (value: string) => void
  }
  
  export function SelectCrypto({ data, fn }: SelectCryptoProps) {
    return (
      <Select onValueChange={(value) => fn(value)}>
        <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600 text-white hover:bg-gray-600 focus:ring-purple-500 focus:border-purple-500">
          <SelectValue placeholder="Select Crypto" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700 text-white">
          {data?.map((coin: CryptoItem ) => (
            <SelectItem
              key={coin.id}
              value={String(coin.id)}
              className="hover:bg-gray-700 focus:bg-gray-700"
            >
              {coin.symbol} - {coin.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }
  