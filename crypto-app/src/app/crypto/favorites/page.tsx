import { Button } from "@/components/ui/button"
import { CryptosRealTimeTable } from "../buildPage/CryptosRealTimeTable"
import Link from "next/link"
import { trpcServerComp } from "@/server/trpc.Provider"
import { getServerSession } from "next-auth"
import { authOptions, isSession } from "@/utils/auth"
import { redirect } from "next/navigation"

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
    <div className="flex flex-col gap-6 p-4">
      {/* Navigation tabs */}
      <div className="flex justify-center items-center gap-4">
        <Link href="/crypto/favorites">
          <Button
            disabled
            className="w-32"
          >
            My Favorites
          </Button>
        </Link>
        <Link href="/crypto/allCryptos">
          <Button className="w-32">
            All Cryptos
          </Button>
        </Link>
      </div>

      {/* Crypto table showing only favorites */}
      <div>
        <CryptosRealTimeTable
          allCryptos={allCryptos}
          userFavorites={favorites}
          isFavorite={true}
        />
      </div>
    </div>
  )
}