import { useEffect, useRef } from 'react'
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
          font: '12px changa',
          offsetX: 123,
          offsetY: 40,
          rotation: 0,
          rotateWithView: false,
          keepUpright: false,
          fill: new Fill({ color: '#ffffff' }),
          backgroundFill: new Fill({ color: 'rgba(0, 0, 0, 0.85)' }),
          backgroundStroke: new Stroke({
            color: '#da0032',
            width: 2
          }),
          padding: [8, 12, 8, 12]
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

  return (
    <div
      ref={mapRef}
      className="absolute top-0 left-0 w-full h-full overflow-hidden"
      role="application"
      aria-label={`Interactive map showing location of ${address}`}
      tabIndex={0}
      aria-describedby="map-instructions"
    >
      <p id="map-instructions" className="sr-only">
        Interactive map. Use arrow keys to pan, plus and minus to zoom. Location: {address}
      </p>
    </div>
  )
}

export default OrchMapLight
