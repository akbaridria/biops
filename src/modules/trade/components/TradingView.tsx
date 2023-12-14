// @ts-nocheck

import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function TradingViewWidget({ asset }: {asset: string}) {
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (document.getElementById("tradingview") && "TradingView" in window) {
        new window.TradingView.widget({
          autosize: true,
          symbol: `PYTH:${asset.replaceAll(' ', '').split('/').join('')}`,
          interval: "1",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "2",
          locale: "en",
          enable_publishing: false,
          allow_symbol_change: false,
          backgroundColor: '#2a323c',
          container_id: "tradingview",
          gridLineColor: 'red',
          hide_top_toolbar: true
        });
      }
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview" className="h-[500px] rounded-box" />
    </div>
  );
}
