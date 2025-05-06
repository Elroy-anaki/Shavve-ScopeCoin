import { Button } from "@/components/ui/button"
import { CryptosRealTimeTable } from "@/components/dashborad/crypto/CryptosRealTimeTable"
import Link from "next/link"
import { trpcServerComp } from "@/server/trpc.Provider"
import { getServerSession } from "next-auth"
import { authOptions} from "@/utils/auth"
import { redirect } from "next/navigation"
import { ConvertCryptoSection } from "@/components/dashborad/crypto/ConvertCryptoSection"

export default async function FavoritesPage() {

  // Get user session and favorites
  const session = await getServerSession(authOptions)
  if(!session) {
    redirect(`/auth/signIn`)
  }
  const favorites = session?.user.id
    ? await trpcServerComp.cryptos.getFavoritesCryptos.query({ userId: Number(session.user.id) })
    : []
    
  // List of all available cryptos for reference
  const allCryptos = ["BTC", "ETH", "SOL", "XRP", "LTC", "DOGE", "ADA", "BNB", "AVAX", "DOT"]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main content */}
      <div className="container mx-auto p-4">
        {/* Navigation tabs */}
        <div className="flex justify-center items-center gap-4 my-6">
          <Link href="/crypto/favorites">
            <Button className="bg-gray-800 hover:bg-purple-700 text-white border border-purple-500/30 px-6 py-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-purple-500/20" disabled>
            
              My Favorites
            </Button>
          </Link>
          <Link href="/crypto/allCryptos">
            <Button 
              
             className="bg-gray-800 hover:bg-purple-700 text-white border border-purple-500/30 px-6 py-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-purple-500/20"
            >
              All Cryptos
            </Button>
          </Link>
        </div>
        
        {/* Responsive layout for table and converter */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Crypto table */}
          <div className="w-full lg:w-2/3 xl:w-3/4">
            <div className="rounded-xl overflow-hidden shadow-xl border border-purple-500/30 bg-gray-900">
              <CryptosRealTimeTable 
                allCryptos={allCryptos}
                userFavorites={favorites}
                isFavorite={true}
              />
            </div>
          </div>
          
          {/* Converter card */}
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <div className="rounded-xl overflow-hidden shadow-xl border border-purple-500/30 bg-gray-900">
              <div className="bg-gradient-to-r from-purple-900 to-purple-800 py-3 px-4">
                <h2 className="text-xl font-bold text-white text-center">Crypto Converter </h2>
              </div>
              <ConvertCryptoSection />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-12 py-6 border-t border-purple-900/50 bg-gray-900">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2025 Crypto Dashboard. Real-time data powered by CryptoCompare.</p>
        </div>
      </div>
    </div>
  )
}