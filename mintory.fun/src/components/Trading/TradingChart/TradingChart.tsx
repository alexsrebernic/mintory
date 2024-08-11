// components/Trading/TradingChart/TradingChart.tsx

import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, UTCTimestamp, IChartApi, ISeriesApi } from 'lightweight-charts';
import { useContractRead, useReadContract } from 'wagmi';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import PAIR_ABI from '@/data/abis/pair.abi.json';
import { useNetworkConfig } from '@/hooks/useNetworkConfig';

interface ChartProps {
  pairAddress: `0x${string}`;
}

const TradingChart: React.FC<ChartProps> = ({ pairAddress }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<IChartApi | null>(null);
  const [candleSeries, setCandleSeries] = useState<ISeriesApi<"Candlestick"> | null>(null);
  
  const networkConfig = useNetworkConfig();

  const { data: currentPrice } = useReadContract({
    address: pairAddress,
    abi: PAIR_ABI,
    functionName: 'price',
    query: {
      refetchInterval: 5000,
    }
  });

  useEffect(() => {
    if (chartContainerRef.current) {
      const newChart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
        layout: {
          background: { type: ColorType.Solid, color: '#ffffff' },
          textColor: '#333',
        },
        grid: {
          vertLines: { color: '#f0f0f0' },
          horzLines: { color: '#f0f0f0' },
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
      });

      const newCandleSeries = newChart.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      });

      setChart(newChart);
      setCandleSeries(newCandleSeries);

      return () => {
        newChart.remove();
      };
    }
  }, []);

  useEffect(() => {
    const fetchPythData = async () => {
      if (candleSeries && networkConfig.pyth_address && networkConfig.pyth_pricefeed_eth_usd) {
        const connection = new EvmPriceServiceConnection(
          'https://hermes.pyth.network'  // You might want to make this dynamic based on the network
        );
        
        try {
          const priceFeeds = await connection.getLatestPriceFeeds([networkConfig.pyth_pricefeed_eth_usd]);
          if (priceFeeds && priceFeeds.length > 0) {
            const priceFeed = priceFeeds[0];
            const price = priceFeed.getPriceNoOlderThan(60);  // Get price no older than 60 seconds
            
            if (price) {
              const now = Math.floor(Date.now() / 1000) as UTCTimestamp;
              const priceValue = price.price * Math.pow(10, price.expo);
              
              candleSeries.update({
                time: now,
                open: priceValue,
                high: priceValue,
                low: priceValue,
                close: priceValue,
              });
            }
          }
        } catch (error) {
          console.error('Error fetching Pyth data:', error);
        }
      }
    };

    const interval = setInterval(fetchPythData, 5000);  // Fetch every 5 seconds

    return () => clearInterval(interval);
  }, [candleSeries, networkConfig]);

  useEffect(() => {
    const handleResize = () => {
      if (chart && chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [chart]);

  return <div ref={chartContainerRef} />;
};

export default TradingChart;