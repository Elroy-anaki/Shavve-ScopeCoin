"use client";

import { useEffect, useState } from "react";

// Updated interface to match the actual data structure from the WebSocket
interface Crypto {
  FROMSYMBOL: string;     // Symbol of the cryptocurrency (e.g., BTC)
  PRICE: number;          // Current price
  VOLUME24HOUR: number;   // Volume of cryptocurrency traded in the last 24 hours
  VOLUME24HOURTO: number; // Volume in USD traded in the last 24 hours
  CIRCULATINGSUPPLYMKTCAP: number; // Market cap (available coins * price)
  CURRENTSUPPLYMKTCAP: number;     // Market cap based on current total supply
  MAXSUPPLYMKTCAP: number;         // Market cap if all potential coins were available
  LASTTRADEID: string;    // ID of the last trade
  LASTUPDATE: number;     // Last update time (Unix timestamp)
  LASTVOLUME: number;     // Amount of cryptocurrency in the last trade
  LASTVOLUMETO: number;   // Amount in USD in the last trade
  MARKET: string;         // Market (usually CCCAGG - average from multiple exchanges)
  MEDIAN: number;         // Median price value
  TOSYMBOL: string;       // Symbol of the currency being converted to (e.g., USD)
  TYPE: string;           // Message type (5 = price update)
  VOLUMEDAY: number;      // Volume traded today
  VOLUMEDAYTO: number;    // Volume in USD traded today
  VOLUMEHOUR: number;     // Volume traded in the last hour
  VOLUMEHOURTO: number;   // Volume in USD traded in the last hour
  FLAGS: number;          // Various flags describing the update type
  
  // Additional fields for internal calculations
  previousPrice?: number; // Previous price to track changes
}



import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

  
export  function StockPricesRealTime() {

  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [toCurrency, setToCurrency] = useState<string>("USD")

  // Function to format Unix timestamp to readable date
  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US');
  };

  // Function to format large numbers
  const formatNumber = (num: number | undefined): string => {
    if (num === undefined) return "-";
    
    // For very large numbers (millions and above)
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    }
    
    // For thousands
    if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    }
    
    // Small numbers with different precision based on size
    if (num < 0.01) return num.toFixed(8);
    if (num < 1) return num.toFixed(4);
    return num.toFixed(2);
  };

  // Function to convert price change to percentage string with appropriate sign
  const formatPercentChange = (previous: number | undefined, current: number | undefined): string => {
    if (previous === undefined || current === undefined) return "0.00%";
    
    const percentChange = ((current - previous) / previous) * 100;
    const sign = percentChange > 0 ? '+' : '';
    return `${sign}${percentChange.toFixed(2)}%`;
  };

  // Helper function to check if price increased, decreased or remained unchanged
  const getPriceChangeStatus = (previous: number | undefined, current: number | undefined): string => {
    if (previous === undefined || current === undefined) return "neutral";
    if (current > previous) return "up";
    if (current < previous) return "down";
    return "neutral";
  };

  useEffect(() => {
    const socket = new WebSocket(
      `wss://streamer.cryptocompare.com/v2?api_key=171fca74d34ef60117c3c5a3e1c4a79de1705327f3d5249cc0d77ba2c70bd181`
    );

    const symbols = ["BTC", "ETH", "SOL", "XRP", "LTC", "DOGE", "ADA", "BNB", "AVAX", "DOT"];
    

    const subs = symbols.map((sym) => `5~CCCAGG~${sym}~${toCurrency}`);
    
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
      
      console.log("Received data from WebSocket:", data);

      // Only process messages with TYPE 5 (price updates)
      if (data.TYPE === "5") {
        setLastUpdate(new Date());
        
        setCryptos((prev) => {
          const existingIndex = prev.findIndex(
            (crypto) => crypto.FROMSYMBOL === data.FROMSYMBOL
          );
          
          if (existingIndex >= 0) {
            // Save previous price before updating
            const previousPrice = prev[existingIndex].PRICE;
            
            const updated = [...prev];
            updated[existingIndex] = {
              ...data,
              previousPrice: previousPrice // Keep track of previous price
            };
            return updated;
          } else {
            // New cryptocurrency - no previous price
            return [...prev, data];
          }
        });
      }
    };

    return () => {
      socket.close();
    };
  }, [toCurrency]);

  return (
    <div className="p-6 bg-gray-900 rounded-xl border border-purple-500/30 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <Input onChange={(e) => {
            setToCurrency(e.target.value)
        } }/>
        
        <h2 className="text-2xl font-bold text-white">Live Crypto Prices ${toCurrency}</h2>
        {lastUpdate && (
          <div className="text-gray-400 text-sm">
            Last updated: {lastUpdate.toLocaleTimeString('en-US')}
          </div>
        )}
      </div>
      
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
            
            return (
              <TableRow key={crypto.FROMSYMBOL} className="bg-gray-800/50 border-gray-700">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-white" onClick={() => alert(crypto.FROMSYMBOL)}>@</span>
                    <span className="bg-purple-800/30 rounded-md px-2 py-1">{crypto.FROMSYMBOL}</span>
                  </div>
                </TableCell>
                
                <TableCell className={`font-bold ${
                  priceChangeStatus === "up" ? "text-green-400" : 
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
                    <span>ID: {crypto.LASTTRADEID}</span>
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
          })}
          
        </TableBody>
      </Table>
    </div>
  );
}