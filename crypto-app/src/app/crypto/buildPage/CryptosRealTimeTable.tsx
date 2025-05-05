"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { trpcClientComp } from "@/server/trpc.Provider";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { formatNumber, formatPercentChange, formatTimestamp, getPriceChangeStatus } from "./utils";


// Clean interface that matches WebSocket data structure
interface Crypto {
  FROMSYMBOL: string;     // Symbol of the cryptocurrency (e.g., BTC)
  PRICE: number;          // Current price
  VOLUME24HOUR: number;   // Volume traded in the last 24 hours
  VOLUME24HOURTO: number; // Volume in USD traded in the last 24 hours
  CIRCULATINGSUPPLYMKTCAP: number; // Market cap
  LASTTRADEID: string;    // ID of the last trade
  LASTUPDATE: number;     // Last update time (Unix timestamp)
  LASTVOLUME: number;     // Amount in the last trade
  LASTVOLUMETO: number;   // USD amount in the last trade
  TOSYMBOL: string;       // Target currency symbol (e.g., USD)
  TYPE: string;           // Message type
  previousPrice?: number; // Previous price for change calculation
}

export function CryptosRealTimeTable({
  allCryptos,
  userFavorites,
  isFavorite
}: {
  allCryptos: string[];
  userFavorites: string[];
  isFavorite: boolean
}) {
  // State management
  const [cryptosArray, setCryptosArray] = useState<string[] | undefined>(isFavorite ? userFavorites : allCryptos)
  const [favorites, setFavorites] = useState<string[] | undefined>(userFavorites || []);
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [cryptoToRemove, setCryptoToRemove] = useState<string[]>([])

  // Session and mutations
  const session = useSession();
  const userId = Number(session.data?.user.id);

  const { mutateAsync: addCrypto } = trpcClientComp.cryptos.addCryptoForUser.useMutation();
  const { mutateAsync: deleteCrypto } = trpcClientComp.cryptos.deleteFavoriteCrypto.useMutation();
  const { data: favoritesData, refetch } = trpcClientComp.cryptos.getFavoritesCryptos.useQuery(
    { userId },
    { enabled: false }
  );

  // Update favorites when data changes
  useEffect(() => {
    if (favoritesData) {
      setFavorites(favoritesData);
    }
  }, [favoritesData]);

  // Handler for toggling favorites
  const handleCryptoClick = async (crypto: string) => {
    try {
      if (favorites?.includes(crypto)) {
        await deleteCrypto({ crypto: cryptoToRemove, userId });
        // Immediately update local state for UI responsiveness
        setCryptosArray(prev => prev?.filter(item => item !== crypto));
        toast(`${crypto} removed successfully`);
      } else {
        await addCrypto({ crypto });
        // Immediately update local state for UI responsiveness
        setFavorites(prev => [...prev!, crypto]);
        toast(`${crypto} added successfully`);
      }
      // Still refetch to ensure server and client are in sync
      refetch();
    } catch (error) {
      console.error(error);
      toast("Operation failed");
    }
  };

  // WebSocket connection
  useEffect(() => {
    // Only connect if we have cryptos to track
    if (!cryptosArray || cryptosArray.length === 0) return;

    const socket = new WebSocket(
      `wss://streamer.cryptocompare.com/v2?api_key=171fca74d34ef60117c3c5a3e1c4a79de1705327f3d5249cc0d77ba2c70bd181`
    );

    const subs = cryptosArray.map((sym) => `5~CCCAGG~${sym}~${toCurrency}`);

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          action: "SubAdd",
          subs: subs,
        })
      );
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);

      // Only process price updates (TYPE 5)
      if (data.TYPE === "5") {
        setLastUpdate(new Date());

        setCryptos((prev) => {
          const existingIndex = prev.findIndex(
            (crypto) => crypto.FROMSYMBOL === data.FROMSYMBOL
          );

          if (existingIndex >= 0) {
            // Update existing crypto with previous price tracking
            const updated = [...prev];
            updated[existingIndex] = {
              ...data,
              previousPrice: prev[existingIndex].PRICE
            };
            return updated;
          } else {
            // Add new cryptocurrency
            return [...prev, data];
          }
        });
      }
    };

    // Cleanup on unmount or toCurrency/cryptosArray change
    return () => {
      socket.close();
    };
  }, []);


  return (
    <div className="p-6 bg-gray-900 rounded-xl border border-purple-500/30 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="w-32">
          <Input
            placeholder="Currency (USD)"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value.toUpperCase())}
            className="bg-gray-800 text-white"
          />
        </div>

        <h2 className="text-2xl font-bold text-white" onClick={() => console.log(cryptoToRemove)}>Live Crypto Prices ${toCurrency}</h2>

        {lastUpdate && (
          <div className="text-gray-400 text-sm">
            Last updated: {lastUpdate.toLocaleTimeString('en-US')}
          </div>
        )}
      </div>
      {isFavorite && cryptoToRemove.length > 0 && <Button className="bg-red-500 p-3" onClick={async () => {
        await deleteCrypto({ crypto: cryptoToRemove, userId })
        setCryptosArray(prev => prev?.filter(item => !cryptoToRemove.includes(item)));
        toast(`${crypto} removed successfully`);
        refetch()
      }
      }>Delete</Button>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Symbol</TableHead>
            <TableHead className="text-white">Price</TableHead>
            <TableHead className="text-white">Change</TableHead>
            <TableHead className="text-white">Volume (24h)</TableHead>
            <TableHead className="text-white">Volume in USD (24h)</TableHead>
            <TableHead className="text-white">Market Cap</TableHead>
            <TableHead className="text-white">Last Trade</TableHead>
            <TableHead className="text-white">Last Update</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cryptos.map((crypto) => {
            const priceChangeStatus = getPriceChangeStatus(crypto.previousPrice, crypto.PRICE);
            const isInFavorites = favorites?.includes(crypto.FROMSYMBOL);

            
            if (isFavorite) {
              if (isInFavorites) {
                return (
                  <TableRow key={crypto.FROMSYMBOL} className="bg-gray-800/50 border-gray-700">
                    <TableCell className="text-white">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCryptoToRemove((prev) => [...prev, crypto.FROMSYMBOL])
                          } else {
                            setCryptoToRemove((prev) => prev.filter((symbol) => symbol !== crypto.FROMSYMBOL))
                          }
                        }}
                        className="cursor-pointer"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span
                          className={`cursor-pointer ${isInFavorites ? "text-yellow-500" : "text-white"}`}
                          onClick={() => handleCryptoClick(crypto.FROMSYMBOL)}
                        >
                          {isInFavorites ? "★" : "☆"}
                        </span>
                        <span className="bg-purple-800/30 rounded-md px-2 py-1">{crypto.FROMSYMBOL}</span>
                      </div>
                    </TableCell>

                    <TableCell className={`font-bold ${priceChangeStatus === "up" ? "text-green-400" :
                        priceChangeStatus === "down" ? "text-red-400" :
                          "text-white"
                      }`}>
                      ${crypto.PRICE?.toFixed(2)}
                      {priceChangeStatus === "up" && <span className="ml-1">▲</span>}
                      {priceChangeStatus === "down" && <span className="ml-1">▼</span>}
                    </TableCell>

                    <TableCell className={
                      priceChangeStatus === "up" ? "text-green-400" :
                        priceChangeStatus === "down" ? "text-red-400" :
                          "text-white"
                    }>
                      {formatPercentChange(crypto.previousPrice, crypto.PRICE)}
                    </TableCell>

                    <TableCell className="text-white">
                      {formatNumber(crypto.VOLUME24HOUR)}
                    </TableCell>

                    <TableCell className="text-white">
                      ${formatNumber(crypto.VOLUME24HOURTO)}
                    </TableCell>

                    <TableCell className="text-white">
                      ${formatNumber(crypto.CIRCULATINGSUPPLYMKTCAP)}
                    </TableCell>

                    <TableCell className="text-white">
                      <div className="flex flex-col">
                        <span className="truncate max-w-24">{crypto.LASTTRADEID}</span>
                        <span className="text-xs text-gray-400">
                          {formatNumber(crypto.LASTVOLUME)} {crypto.FROMSYMBOL} (${formatNumber(crypto.LASTVOLUMETO)})
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-white">
                      {crypto.LASTUPDATE ? formatTimestamp(crypto.LASTUPDATE) : "-"}
                    </TableCell>
                  </TableRow>
                );
              }
            } else {
              return (
                <TableRow key={crypto.FROMSYMBOL} className="bg-gray-800/50 border-gray-700">

                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span
                        className={`cursor-pointer ${isInFavorites ? "text-yellow-500" : "text-white"}`}
                        onClick={() => handleCryptoClick(crypto.FROMSYMBOL)}
                      >
                        {isInFavorites ? "★" : "☆"}
                      </span>
                      <span className="bg-purple-800/30 rounded-md px-2 py-1">{crypto.FROMSYMBOL}</span>
                    </div>
                  </TableCell>

                  <TableCell className={`font-bold ${priceChangeStatus === "up" ? "text-green-400" :
                      priceChangeStatus === "down" ? "text-red-400" :
                        "text-white"
                    }`}>
                    ${crypto.PRICE?.toFixed(2)}
                    {priceChangeStatus === "up" && <span className="ml-1">▲</span>}
                    {priceChangeStatus === "down" && <span className="ml-1">▼</span>}
                  </TableCell>

                  <TableCell className={
                    priceChangeStatus === "up" ? "text-green-400" :
                      priceChangeStatus === "down" ? "text-red-400" :
                        "text-white"
                  }>
                    {formatPercentChange(crypto.previousPrice, crypto.PRICE)}
                  </TableCell>

                  <TableCell className="text-white">
                    {formatNumber(crypto.VOLUME24HOUR)}
                  </TableCell>

                  <TableCell className="text-white">
                    ${formatNumber(crypto.VOLUME24HOURTO)}
                  </TableCell>

                  <TableCell className="text-white">
                    ${formatNumber(crypto.CIRCULATINGSUPPLYMKTCAP)}
                  </TableCell>

                  <TableCell className="text-white">
                    <div className="flex flex-col">
                      <span className="truncate max-w-24">{crypto.LASTTRADEID}</span>
                      <span className="text-xs text-gray-400">
                        {formatNumber(crypto.LASTVOLUME)} {crypto.FROMSYMBOL} (${formatNumber(crypto.LASTVOLUMETO)})
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-white">
                    {crypto.LASTUPDATE ? formatTimestamp(crypto.LASTUPDATE) : "-"}
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </div>
  );
}