import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer,
  Polyline,
} from "@react-google-maps/api";
import { Icons } from "@/components/ui/icons";
import { map_styles } from "./map-styles";

function EWayMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBwQ27PyhasAE4WkZxCR-gG5O8rDGkCGhA",
  });

  const [routes, setRoutes] = useState([
    {
      origin: {
        lat: 29.3917, // More precise Panipat coordinates
        lng: 76.9744,
      },
      destination: {
        lat: 28.6448, // More precise Delhi coordinates (near city center)
        lng: 77.373,
      },
      mode: "Road",
      travelMode: "DRIVING",
      directions: null,
    },

    {
      origin: {
        lat: 12.9716, // Bangalore City Railway Station
        lng: 77.5946,
      },
      destination: {
        lat: 8.582553, // Chennai Port
        lng: 76.843905,
      },
      mode: "Rail",
      travelMode: "TRANSIT",
      directions: null,
    },
    {
      origin: {
        lat: 28.6109073,
        lng: 77.1123723,
      },
      destination: {
        lat: 12.9716, // Bangalore City Railway Station
        lng: 77.5946,
      },
      mode: "Air",
      travelMode: "FLYING",
      directions: null,
    },
    {
      origin: {
        lat: 18.895615, // Mumbai Port
        lng: 72.810473,
      },
      destination: {
        lat: 8.582553, // Chennai Port
        lng: 76.843905,
      },
      mode: "Sea",
      travelMode: "SEA", // Custom mode for waterways
      directions: null,
    },
  ]);

  const [markerPosition, setMarkerPosition] = useState(0);
  const easeInOutQuad = (t: number) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  // const animateMarker = () => {
  //   const duration = 3000;
  //   const startTime = performance.now();

  //   const updatePosition = (currentTime: number) => {
  //     const elapsedTime = currentTime - startTime;
  //     const progress = elapsedTime / duration;

  //     if (progress <= 1) {
  //       const easedProgress = easeInOutQuad(progress);
  //       setMarkerPosition(easedProgress * 100);
  //       requestAnimationFrame(updatePosition);
  //     } else {
  //     }
  //   };

  //   requestAnimationFrame(updatePosition);
  // };

  // useEffect(() => {
  //   animateMarker();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const directionsCallback = (response: any, index: number) => {
    if (response !== null) {
      if (response.status === "OK") {
        if (routes[index].directions === null) {
          const updatedRoutes = [...routes];
          updatedRoutes[index] = {
            ...updatedRoutes[index],
            directions: response,
          };
          setRoutes(updatedRoutes);
        }
      } else {
        console.error(
          `Directions request failed for route ${index} due to ` +
            response.status
        );
      }
    }
  };

  const colors = [
    {
      mode: "Road",
      color: "#FF6B6B", // Bright Coral Red for Road
      textColor: "#FFFFFF",
    },
    {
      mode: "Air",
      color: "#4ECDC4", // Turquoise for Air
      textColor: "#FFFFFF",
    },
    {
      mode: "Rail",
      color: "#45B7D1", // Vibrant Blue for Rail
      textColor: "#FFFFFF",
    },
    {
      mode: "Sea",
      color: "#1A535C", // Deep Teal for Sea
      textColor: "#FFFFFF",
    },
  ];
  const renderRoute = (route, index) => {
    // Existing rendering for Road, Rail, and Air routes
    if (route.mode === "Road" || route.mode === "Rail") {
      return (
        route.directions && (
          <DirectionsRenderer
            key={index}
            options={{
              hideRouteList: true,
              directions: route.directions,
              suppressMarkers: true,
              suppressInfoWindows: true,
              polylineOptions: {
                strokeColor: colors.find((color) => color.mode === route.mode)
                  ?.color,
                zIndex: 1,
                strokeOpacity: 1,
                strokeWeight: 3,
              },
            }}
          />
        )
      );
    }

    // For Air routes, use a straight line Polyline
    if (route.mode === "Air") {
      return (
        <Polyline
          key={index}
          path={[route.origin, route.destination]}
          options={{
            strokeColor: colors.find((color) => color.mode === route.mode)
              ?.color,
            strokeOpacity: 0.8,
            strokeWeight: 3,
            icons: [
              {
                icon: {
                  path: "M 0,-1 0,1",
                  strokeOpacity: 1,
                  scale: 4,
                },
                offset: "0",
                repeat: "20px",
              },
            ],
          }}
        />
      );
    }

    // For Sea routes, create a polyline along the coastline
    if (route.mode === "Sea") {
      const calculateExternalParabolicRoute = (start, end) => {
        // Number of points to create the curve
        const numPoints = 10;
        const parabolicPath = [];

        // Calculate the midpoint
        const midLat = (start.lat + end.lat) / 2;
        const midLng = (start.lng + end.lng) / 2;

        // Calculate the control point to create a high-arching parabolic arc
        const controlPointHeight = 0; // Height above the map
        const controlPoint = {
          lat: midLat + controlPointHeight,
          lng: Math.min(start.lng, end.lng) - 1, // Far to the left of both points
        };

        // Generate points along the parabolic curve using quadratic Bézier interpolation
        for (let i = 0; i <= numPoints; i++) {
          const t = i / numPoints;

          // Quadratic Bézier curve formula
          const lat =
            (1 - t) * (1 - t) * start.lat +
            2 * (1 - t) * t * controlPoint.lat +
            t * t * end.lat;

          const lng =
            (1 - t) * (1 - t) * start.lng +
            2 * (1 - t) * t * controlPoint.lng +
            t * t * end.lng;

          parabolicPath.push({ lat, lng });
        }

        return parabolicPath;
      };

      const seaRoutePath = calculateExternalParabolicRoute(
        route.origin,
        route.destination
      );

      return (
        <Polyline
          key={index}
          path={seaRoutePath}
          options={{
            strokeColor: colors.find((color) => color.mode === route.mode)
              ?.color,
            strokeOpacity: 0.8,
            strokeWeight: 3,
            geodesic: true, // Ensures the curve follows the Earth's curvature
            icons: [
              {
                icon: {
                  path: "M 0,-1 0,1",
                  strokeOpacity: 1,
                  scale: 4,
                },
                offset: "0",
                repeat: "20px",
              },
            ],
          }}
        />
      );
    }

    return null;
  };
  useEffect(() => {
    console.log("Routes", routes);
  }, [routes]);

  return isLoaded ? (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div className="absolute top-2 right-2 bg-white flex items-center gap-2 z-[50] py-1 px-2 rounded-full justify-center">
        {colors.map((color) => (
          <p key={color.mode} className="text-xs">
            <span
              className="inline-block w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: color.color }}
            ></span>
            {color.mode}
          </p>
        ))}
      </div>
      <GoogleMap
        mapContainerClassName="w-full h-[400px] rounded-lg relative"
        onLoad={(map) => {
          const bounds = new window.google.maps.LatLngBounds();

          routes.forEach((route) => {
            bounds.extend(route.origin);
            bounds.extend(route.destination);
          });

          map.fitBounds(bounds);
        }}
        options={{
          styles: map_styles,
          disableDefaultUI: true,
          zoomControl: false,
          cameraControl: false,
          maxZoom: 16,
          minZoom: 2,
        }}
      >
        {routes
          .filter((route) => route.mode !== "Air")
          .map((route, index) => (
            <DirectionsService
              options={{
                destination: route.destination,
                origin: route.origin,
                travelMode: route.travelMode as google.maps.TravelMode,
                transitOptions:
                  route.mode === "Rail"
                    ? {
                        modes: [
                          google.maps.TransitMode.TRAIN, // Specifically use TRAIN for Indian Railways
                          google.maps.TransitMode.RAIL,
                        ],
                        routingPreference:
                          google.maps.TransitRoutePreference.FEWER_TRANSFERS,
                      }
                    : undefined,
              }}
              callback={(e) => directionsCallback(e, index)}
              key={index}
            />
          ))}
        {routes.map(renderRoute)}
      </GoogleMap>
    </div>
  ) : (
    <div className="w-full h-[400px] flex justify-center items-center">
      <Icons.spinner className="animate-spin h-8 w-8" />
    </div>
  );
}

export default React.memo(EWayMap);
