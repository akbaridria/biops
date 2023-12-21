'use client'

import { Arrow, Speed } from "@/components/Icons";
import { listBenefits } from '@/helper'
import { getActiveTradeVolume, getLatestTradeId, getLiquidity } from "@/modules/prepareContract";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [liquidity, setLiquidity] = useState('0')
  const [volume, setVolume] = useState('0')
  const [trades, setTrades] = useState('0')

  useEffect(() => {
    const getData = async () => {
      try {
        await Promise.all([getLiquidity(), getActiveTradeVolume(), getLatestTradeId()]).then((values) => {
          setLiquidity(values[0])
          setVolume(values[1])
          setTrades(values[2] as string)
        })
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [])
  return (
    <main className="container mx-auto min-h-screen p-4">
      <section className="mb-20">
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
            <a href="https://github.com/akbaridria/biops#readme" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
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
              <div className="stat-title">Total Liquidity</div>
              <div className="stat-value text-primary">{ liquidity }</div>
              <div className="stat-desc">Total liquidity on our protocol</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Active Trade Volumes</div>
              <div className="stat-value text-secondary">{ volume }</div>
              <div className="stat-desc">Total active trade volume + total unrealized profit</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Total Trades</div>
              <div className="stat-value text-accent">{ trades }</div>
              <div className="stat-desc">Total trade happen on our protocol</div>
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
