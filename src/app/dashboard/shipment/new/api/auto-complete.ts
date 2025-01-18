// "use client";
"use server";
import {  LatLngLiteral } from "@googlemaps/google-maps-services-js";
import axios from "axios";

export const SearchRoadPlace = async (term: string) => {
  const data = await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${term}&location=20.5937,78.9629&radius=2000000&strictbounds=true&region=in&key=AIzaSyBwQ27PyhasAE4WkZxCR-gG5O8rDGkCGhA`
  );
  return data.data.predictions.map((item: any) => ({
    label: item.description,
    value: item.description,
  }));
};

export const searchAirport = async (term: string) => {
  const data = await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${term}&types=airport&key=AIzaSyBwQ27PyhasAE4WkZxCR-gG5O8rDGkCGhA`
  );
  return data.data.predictions.map((item: any) => ({
    label: item.description,
    value: item.description,
  }));
};

export const geoCodeLocation = async (address: string) => {
  // https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters
  const data = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  return data.data.results[0].geometry.location as LatLngLiteral;
};

export const searchTrainStation = async (term: string) => {
  const data = await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${term}&types=train_station&key=${process.env.GOOGLE_MAPS_API_KEY}&location=20.5937,78.9629&radius=2000000&strictbounds=true&region=in`
  );
  return data.data.predictions.map((item: any) => ({
    label: item.description,
    value: item.description,
  }));
}