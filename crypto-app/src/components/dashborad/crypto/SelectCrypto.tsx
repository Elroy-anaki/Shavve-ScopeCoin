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
  
  interface SelectCryptoProps  {
    data: CryptoItem[] | null | any
    fn: (value: string) => void,
    valueInsert:string
  }
  
  export function SelectCrypto({ data, fn, valueInsert }: SelectCryptoProps) {
    return (
      <Select onValueChange={(value) => fn(value)}>
        <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600 text-white hover:bg-gray-600 focus:ring-purple-500 focus:border-purple-500">
          <SelectValue placeholder="Select Crypto" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700 text-white">
          {data?.map((coin: CryptoItem ) => (
            <SelectItem
              key={coin.id}
              value={valueInsert === "id" ? String(coin.id) : coin.symbol}
              className="hover:bg-gray-700 focus:bg-gray-700"
            >
              {coin.symbol} - {coin.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }
  