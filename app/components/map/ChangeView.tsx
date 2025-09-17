"use client"
import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface ChangeViewProps {
  center: [number, number];
  zoom: number;
}
export

const ChangeView = ({ center, zoom }: ChangeViewProps) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 1 });
  }, [center, zoom, map]);
  return null;
}