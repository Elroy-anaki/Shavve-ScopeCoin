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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { trpcClientComp } from "@/server/trpcProvider";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { formatNumber, formatPercentChange, formatTimestamp, getPriceChangeStatus } from "@/utils/client/crypto/utils";
import CryptoChart from "./CryptoChart";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");


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
        await deleteCrypto({ crypto: [crypto], userId });
        // Immediately update local state for UI responsiveness
        setFavorites(prev => prev?.filter(item => item !== crypto));
        toast(`${crypto} removed from favorites`, {
          style: {
            backgroundColor: "#16A34A", 
            color: "#fff"
            
          }
        });
        
      } else {
        await addCrypto({ crypto });
        // Immediately update local state for UI responsiveness
        setFavorites(prev => [...prev!, crypto]);
        toast(`${crypto} added to favorites`, {
          style: {
            backgroundColor: "#16A34A", 
            color: "#fff"
            
          }
        });
        
      }
      // Still refetch to ensure server and client are in sync
      refetch();
    } catch (error) {
      console.error(error);
      
      toast("Operation failed", {
        style: {
          backgroundColor: "#DC2626", 
          color: "#fff"
          
        }
      });
      
    }
  };

  // Handler for bulk remove
  const handleBulkRemove = async () => {
    if (cryptoToRemove.length === 0) return;
    
    try {
      await deleteCrypto({ crypto: cryptoToRemove, userId });
      setCryptosArray(prev => prev?.filter(item => !cryptoToRemove.includes(item)));
      setFavorites(prev => prev?.filter(item => !cryptoToRemove.includes(item)));
      setCryptoToRemove([]);
      toast(`${cryptoToRemove.length} cryptocurrencies removed`, {
        style: {
          backgroundColor: "#16A34A", 
          color: "#fff"
          
        }
      });
  
      refetch();
    } catch (error) {
      console.error(error);
      toast("Failed to remove selected cryptocurrencies", {
        style: {
          backgroundColor: "#DC2626", 
          color: "#fff"
          
        }
      });
      
    }
  };

  // WebSocket connection
  useEffect(() => {
    // Only connect if we have cryptos to track
    if (!cryptosArray || cryptosArray.length === 0) return;

    setIsLoading(true);
    
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
        setIsLoading(false);

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
  }, [cryptosArray, toCurrency]);

  // Filter cryptos based on search term
  const filteredCryptos = cryptos.filter(crypto => 
    crypto.FROMSYMBOL.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-purple-500/30">
      <div className="ml-10 pt-3">
      <Dialog>
  <DialogTrigger>Chart</DialogTrigger>
  <DialogContent className="bg-transparent border-none">
    

      <DialogDescription>
        <CryptoChart />
      </DialogDescription>
    
  </DialogContent>
</Dialog>
      </div>
      
      <div className="p-6 space-y-4">
        {/* Header section with search and filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Input
                placeholder="Search cryptocurrencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 text-white border-gray-700 focus:ring-purple-500 focus:border-purple-500 pl-8"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2.5 top-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-gray-400 text-sm">Currency:</span>
              <Input
                placeholder="USD"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value.toUpperCase())}
                className="bg-gray-800 text-white border-gray-700 focus:ring-purple-500 focus:border-purple-500 w-24"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <h2 className="text-xl font-bold text-white hidden md:block">
              Live Crypto Prices 
              <span className="text-purple-400 ml-1">${toCurrency}</span>
            </h2>
            
            {lastUpdate && (
              <div className="text-gray-400 text-sm">
                Last updated: {lastUpdate.toLocaleTimeString('en-US')}
              </div>
            )}
          </div>
        </div>

        {/* Bulk actions for favorites mode */}
        {isFavorite && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              {cryptoToRemove.length > 0 ? (
                <span>{cryptoToRemove.length} selected</span>
              ) : (
                <span>Select cryptocurrencies to remove</span>
              )}
            </div>
            
            {cryptoToRemove.length > 0 && (
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                onClick={handleBulkRemove}
              >
                Delete Selected
              </Button>
            )}
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}

        {/* Table */}
        {!isLoading && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-800">
                  {isFavorite && (
                    <TableHead className="text-purple-300 font-medium"></TableHead>
                  )}
                  <TableHead className="text-purple-300 font-medium">Symbol</TableHead>
                  <TableHead className="text-purple-300 font-medium">Price</TableHead>
                  <TableHead className="text-purple-300 font-medium">Change</TableHead>
                  <TableHead className="text-purple-300 font-medium">Volume (24h)</TableHead>
                  <TableHead className="text-purple-300 font-medium">Volume in {toCurrency} (24h)</TableHead>
                  <TableHead className="text-purple-300 font-medium">Market Cap</TableHead>
                  <TableHead className="text-purple-300 font-medium">Last Trade</TableHead>
                  <TableHead className="text-purple-300 font-medium">Last Update</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCryptos.length > 0 ? (
                  filteredCryptos.map((crypto) => {
                    const priceChangeStatus = getPriceChangeStatus(crypto.previousPrice, crypto.PRICE);
                    const isInFavorites = favorites?.includes(crypto.FROMSYMBOL);
                    
                    // Render different rows based on favorite mode
                    if (isFavorite) {
                      if (isInFavorites) {
                        return (
                          <TableRow key={crypto.FROMSYMBOL} className="bg-gray-800/30 hover:bg-gray-800/50 border-t border-gray-800 transition-colors">
                            <TableCell>
                              <input
                                type="checkbox"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setCryptoToRemove((prev) => [...prev, crypto.FROMSYMBOL])
                                  } else {
                                    setCryptoToRemove((prev) => prev.filter((symbol) => symbol !== crypto.FROMSYMBOL))
                                  }
                                }}
                                checked={cryptoToRemove.includes(crypto.FROMSYMBOL)}
                                className="rounded border-gray-700 text-purple-600 focus:ring-purple-500 cursor-pointer"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`cursor-pointer text-xl ${isInFavorites ? "text-yellow-500" : "text-gray-400"}`}
                                  onClick={() => handleCryptoClick(crypto.FROMSYMBOL)}
                                >
                                  {isInFavorites ? "★" : "☆"}
                                </span>
                                <span className="bg-purple-800/30 rounded-md px-2 py-1 font-bold">{crypto.FROMSYMBOL}</span>
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
                      return null; // Don't show non-favorites in favorite mode
                    } else {
                      // All cryptos mode
                      return (
                        <TableRow key={crypto.FROMSYMBOL} className="bg-gray-800/30 hover:bg-gray-800/50 border-t border-gray-800 transition-colors">
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <span
                                className={`cursor-pointer text-xl ${isInFavorites ? "text-yellow-500" : "text-gray-400"}`}
                                onClick={() => handleCryptoClick(crypto.FROMSYMBOL)}
                              >
                                {isInFavorites ? "★" : "☆"}
                              </span>
                              <span className="bg-purple-800/30 rounded-md px-2 py-1 font-bold">{crypto.FROMSYMBOL}</span>
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
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={isFavorite ? 9 : 8} className="text-center py-12 text-gray-400">
                      {searchTerm ? (
                        <div>
                          <p className="text-lg">No cryptocurrencies match "{searchTerm}"</p>
                          <p className="text-sm mt-2">Try a different search term</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-lg">No cryptocurrency data available</p>
                          <p className="text-sm mt-2">Waiting for WebSocket data...</p>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}