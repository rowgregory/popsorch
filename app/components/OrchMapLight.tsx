import React, { useEffect, useRef } from 'react'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { Fill, Stroke, Style, Text } from 'ol/style'
import CircleStyle from 'ol/style/Circle'

const OrchMapLight = ({ latitude, longitude, address }: { latitude: number; longitude: number; address: string }) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return
    // Initialize the map centered at the listing's coordinates
    const tile = new TileLayer({
      source: new OSM({ attributions: [] })
    })
    const map = new Map({
      target: mapRef.current,
      layers: [tile],
      view: new View({
        center: fromLonLat([longitude, latitude]),
        zoom: 14 // Adjust the zoom level as needed
      })
    })

    // Create a marker for the single listing
    const marker = new Feature({
      geometry: new Point(fromLonLat([longitude, latitude]))
    })

    marker.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 10,
          fill: new Fill({ color: '#da0032' })
        })
      })
    )

    const label = new Feature({
      geometry: new Point(fromLonLat([longitude, latitude]))
    })

    label.setStyle(
      new Style({
        text: new Text({
          text: address,
          font: '14px Arial', // Font style
          offsetX: 123, // Position text to the right of the marker
          offsetY: 40, // Adjust vertical position
          rotation: 0, // Set rotation (optional)
          rotateWithView: false, // Optional property to control rotation behavior
          keepUpright: false, // Optional to keep text upright
          backgroundFill: new Fill({ color: 'rgba(200, 200, 200, 0.5)' }), // Background color
          backgroundStroke: new Stroke({
            color: 'rgba(155, 155, 155, 0.49)', // Border color with opacity
            width: 2 // Border width
          }),
          padding: [20, 20, 20, 20] // Padding around the text,
        })
      })
    )

    // Create a vector source and add the marker
    const vectorSource = new VectorSource({
      features: [marker, label]
    })

    // Create a vector layer to display the marker
    const vectorLayer = new VectorLayer({
      source: vectorSource
    })

    // Add the vector layer to the map
    map.addLayer(vectorLayer)

    // Clean up when component unmounts
    return () => map.setTarget(undefined)
  }, [address, latitude, longitude])

  return <div ref={mapRef} className="bg-lavendermist absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden" />
}

export default OrchMapLight
