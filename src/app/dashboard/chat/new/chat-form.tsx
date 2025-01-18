"use client";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUp, Bot, RotateCw, Star, User, Clipboard } from "lucide-react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { remark } from "remark";
import html from "remark-html";
import { Icons } from "@/components/ui/icons";
import Image from "next/image";
import AIChart from "./bar-chart";
// import { text } from "stream/consumers";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
const PROMPTS = [
  {
    label: "Emission for NCR Region",
    prompt: "Emission for NCR Region and explain your deduction.",
  },
  {
    label: "Transit routes analysis",
    prompt:
      "Give me the traveled transit routes analysis in the provided eway bills.",
  },
  {
    prompt:
      "How is the emission distributed amongst various freight methods, and how has EVs reduced emissions?",
    label: "Emission distribution",
  },
  {
    prompt: "Propose the areas in which charging stations should be put up.",
    label: "Charging stations strategy",
  },
  {
    label: "Total Emissions",
    prompt: "What are the total reported emission for the ewaybill data",
  },
  {
    label: "Low Emission Zones",
    prompt:
      "Given your ewaybill data, deduce proposed low emission zones and give your reasoning",
  },
];
function ChatForm() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function runChat() {
    setLoading(true);
    console.log("Prompt:", prompt);
    const gemini = new GoogleGenerativeAI(API_KEY);
    const model = gemini.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
    const system_prompt = `You are an AI designed to analyze and provide helpful insights based on EWayBill shipment record data.  Your job is to answer questions based on the five questions and answers provided below.  If a question is directly related to one of the provided Q&As, provide the corresponding answer with more formal wording in JSON format, including the relevant image URLs if available. If a question partially overlaps with or is similar to one of the provided Q&As,  provide the most relevant answer and clearly state that it's a partial match. If a question is entirely outside the context of these questions, reply in the text part of json that this is outside your context and explain the questions you can talk about. Your JSON response should have these keys: 'text' (for the text response), 'images' (an array of image URLs), and 'qNo' (between 1-6).  Do not include any Markdown formatting or backticks. Replace the backticks inside the text part of json with newlines.

    Q1. What are the total reported emission for the ewaybill data
    A1. Text: Analysis of Truck Emissions for 2024. The amount emissions estimated are around 2622 MT CO2e based on 30,000 EWayBills. Image: nil
    Q2. Emission for NCR Region.
    A2. Text: To refine the analysis of truck emissions and provide a spatial understanding of their impact, we leveraged geospatial data, including shape files representing major urban hubs like.
    The methodology for estimating emissions based on geospatial factors is detailed below:
    Integration of Shape Files:
    Shape files defining the geographical boundaries of key freight hubs (e.g., NCR) were incorporated into the analysis.
    These files helped spatially map E-way bill data, linking emissions to specific locations based on truck activity within these boundaries.
    Classification of Hubs by Activity Levels:
    Freight hubs were categorized based on activity intensity derived from E-way bills, such as the volume of consignments and frequency of truck movements.
    Locations with dense activity (warehouses, distribution centers, industrial areas) were identified as hotspots for emissions.
    Spatial Emission Estimation:
    Emissions from trucks entering, exiting, or transiting through these hubs were aggregated.
    By combining E-way bill data with geospatial analysis, we provided a detailed and location-specific view of freight emissions, enabling data-driven decision-making for sustainability in transportation.
    Using the above metrics and guidelines we were able to derive
    Total Emissions in Delhi & NCR Region: 1219 MT CO2e.
    Q3. Give me the traveled transit routes analysis in the provided eway bills.
    A3. Text: Certainly, after analyzing 30,000 EWayBill records in FY23-24, I'm providing you with traveled routes based on the intensity. Image: Transit.png
    Q4. Given your ewaybill data, deduce proposed low emission zones and give your reasoning.
    A4. Text: After analyzing the density of various areas in India, along with transit routes and emissions, the highlighted are the areas which should become LEZs. These are calculated using density based spacial clustering scan. Image: LEZ.png
    Q5. How is the emission distributed amongst various freight methods, and how has EVs reduced emissions?
    A5. Text: Providing the breakdown - Roadways trucking: 80% emissions summing at 2,097MT emissions. Airways add upto the rest 10% of summation at 262MT. Waterways stand at 6% emissions 156 MT and around 140 MT is railway. The average intensity for trucking operations is 13.3 KG CO2e / MT load with avg emission being 130 KG CO2e. EVs ran an equivalent of 200 such operations. They reduced 26 MT of emissions. 
    Q6. Propose the areas in which charging stations should be put up.
    A6. Text: Based on the EWayBills wherein electric trucks were transporting goods, the provided map highlights areas with the highest intensity of EV routes. Image: EV.png
    Your Prompt is: `;

    const chat = model.startChat({
      generationConfig,
    });

    setResponse((prev) => [...prev, { user: prompt }]);
    setPrompt("");

    try {
      const result = await chat.sendMessage(`${system_prompt}\n${prompt}`);
      const response = result.response;
      const responseText = response.candidates[0].content.parts[0].text; //Access the correct field

      // Extract the JSON string
      const jsonStart = responseText.indexOf("```json\n") + "```json\n".length;
      const jsonEnd = responseText.lastIndexOf("\n```\n");
      const jsonString = responseText.substring(jsonStart, jsonEnd);

      // Parse the JSON string
      let data;
      try {
        data = JSON.parse(jsonString);
        console.log(data);
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError, jsonString); // Log the JSON string for debugging
        setResponse((prev) => [
          ...prev,
          { bot: "AI response was not in the expected JSON format." },
        ]);
        return; // Stop execution if parsing fails
      }

      const textResponse = data.text;
      const imageUrls = data.images || [];
      const reasoning = data.reasoning || "";
      const qNo = data.qNo || 0;

      console.log(textResponse);
      setResponse((prev) => [
        ...prev,
        {
          bot: {
            text: textResponse,
            images: imageUrls,
            reasoning,
            qNo,
          },
        },
      ]);
    } catch (error) {
      console.error("Error fetching or processing response:", error);
      setResponse((prev) => [
        ...prev,
        { bot: "Error: Could not fetch response." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`flex gap-4 items-center transition-all min-h-[calc(100vh_-_7.5rem)] w-full max-w-[1024px] mx-auto flex-col ${
        response.length > 0 ? "justify-end" : "justify-center"
      }`}
    >
      {response.length > 0 &&
        response.map((res, i) => (
          <Fragment>
            <div key={i} className="flex gap-4 w-full justify-start relative">
              <div className="h-8 w-8 aspect-square flex justify-center items-center">
                {res.user && <User className="h-6 w-6 text-primary" />}
                {res.bot && <Bot className="h-6 w-6 text-primary" />}
              </div>
              <div
                className={`px-4 py-2 rounded-lg ${
                  res.user ? "bg-primary text-white" : "bg-muted"
                } w-auto`}
                dangerouslySetInnerHTML={{ __html: res.bot?.text ?? res.user }}
              ></div>
            </div>
            {res.bot && res.bot.images?.length > 0 && (
              <Image
                alt="something"
                src={`/ulip/${res.bot.images[0]}`}
                width={500}
                height={500}
              />
            )}
            {res.bot?.qNo === 5 && <AIChart />}
          </Fragment>
        ))}
      {loading && (
        <div className="flex gap-4 w-full justify-start relative">
          <div className="h-8 w-8 aspect-square flex justify-center items-center">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <div className={`px-4 py-2 rounded-lg bg-muted w-auto`}>
            <Icons.spinner className="animate-spin h-4 w-4" />
          </div>
        </div>
      )}
      <Card
        className={`h-min transition-all duration-300 ease-in-out transform min-w-[50rem] w-full ${
          response.length > 0 ? "w-full" : ""
        }`}
      >
        {response.length === 0 && (
          <CardHeader className="bg-muted/50 pb-4 w-full text-center">
            <CardTitle className="text-lg">
              Greetings <br />
            </CardTitle>
          </CardHeader>
        )}
        <CardContent className="pt-6">
          <div className="rounded-md bg-muted flex gap-2 px-4 py-2 h-full">
            <AutosizeTextarea
              placeholder="Chat with me to track your shipments, unlock shipping analytics, and optimize your logistics strategy."
              autoFocus
              className={`bg-transparent border-none resize-none ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0`}
              value={prompt ?? null}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button
              className="h-8 w-8 p-0 rounded-lg mt-2"
              onClick={() => runChat()}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
          <div className="rounded-b-md mx-4 bg-muted/40 flex gap-2 px-4 py-6 h-full flex-wrap ">
            {PROMPTS.map((p, i) => (
              <div
                key={i}
                className="relative shadow-sm cursor-pointer hover:text-black"
                onClick={async () => {
                  setPrompt(p.prompt);
                  // await new Promise((resolve) => setTimeout(resolve, 100));
                  // runChat();
                }}
              >
                <svg
                  className="pointer-events-none absolute right-full top-full -mr-[0.1875rem] -mt-[0.1875rem] -translate-y-1/2 translate-x-1/2"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  stroke="currentColor"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  strokeWidth="0.5"
                >
                  <circle
                    className="opacity-70"
                    cx="7.5"
                    cy="4.5"
                    r="4"
                  ></circle>
                  <circle
                    className="opacity-50"
                    cx="2"
                    cy="9.5"
                    r="1.5"
                  ></circle>
                </svg>
                <div className=" p-1 border rounded-sm bg-muted text-xs text-muted-foreground relative hover:text-black">
                  {p.label}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChatForm;
