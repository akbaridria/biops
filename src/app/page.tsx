import { Arrow, Speed } from "@/components/Icons";
import { listBenefits } from '@/helper'
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto min-h-screen p-4">
      <section>
        <div className="grid grid-cols-1 gap-4 items-center justify-center text-center w-[800px] max-w-full mx-auto">
          <h1 className="text-[2rem] md:text-[3.625rem] font-bold">
            Unveiling Mode Blockchain&apos;s <br /> Perpetual Oracle Market
          </h1>
          <h3 className="font-semibold opacity-[0.5]">
            Embark on a groundbreaking journey within the Mode blockchain&apos;s domain with our Perpetual Oracle Market.
            This cutting-edge platform revolutionizes trading dynamics, offering users an exhilarating chance to forecast asset prices
          </h3>
          <div className="flex items-center justify-center gap-4 mt-2">
            <Link href="/trade" role="button" className="btn btn-primary btn-sm">Lunch app</Link>
            <a href="http://" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <div>Read more</div>
              <Arrow customClass="w-4 h-4 rotate-[315deg]" />
            </a>
          </div>
        </div>
      </section>

      <section className="my-20">
        <div>
          <div className="stats shadow w-full">
            <div className="stat place-items-center">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </div>
              <div className="stat-title">Total Likes</div>
              <div className="stat-value text-primary">25.6K</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div className="stat-title">Page Views</div>
              <div className="stat-value text-secondary">2.6M</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div className="stat-title">Page Views</div>
              <div className="stat-value text-secondary">2.6M</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider my-10">
        <Speed customClass="w-12 h-12 fill-primary" />
      </div>

      <section className="mb-24">
        <div className="text-center font-bold text-[1.875rem] md:text-[2.5rem] mt-20 mb-16">
          The Benefit of Biops
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {
            listBenefits.map((item) => {
              return (
                <div key={item.title} className="flex items-center justify-center">
                  <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="flex items-center justify-center">
                      { item.icon() }
                    </div>
                    <div className="card-body text-center">
                      <h2 className="font-semibold text-xl">{ item.title }</h2>
                      <p className="opacity-[0.5]">{ item.description }</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>

      <div className="divider my-10">
        <Speed customClass="w-12 h-12 fill-primary" />
      </div>
    </main>
  )
}
