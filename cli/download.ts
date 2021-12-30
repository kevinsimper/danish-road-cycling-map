import fetch from "node-fetch";
import { writeFileSync } from "fs";

type SportsData = {
  EventId: number; // 10103,
  Name: string; //'RENT LIV Løbet Skive 2022 UCI ME 1.2',
  Date: string; // '2022-08-28',
  // RawDate: '/Date(1661637600000)/',
  // IsLiveResults: false,
  // IsEntryOpen: false,
  // IsEntryOpeningLater: true,
  // EntryOpeningLaterText: 'Åbner senere',
  // EventType: 3,
  // EventTypeIcon: '/images/eventtypes/ico_bike_256.png',
  // RegStatus: 1,
  // SecondaryButtonTitle: null,
  // SecondaryButtonLink: null,
  EventTypeName: string; // 'Landevejscykling',
  // LinkEvent: '/event/10103/app',
  // LinkEventMain: null,
  // LinkResults: '/event/10103/app/results',
  // LinkNewWindow: false,
  Location: string; // 'Vesthimmerlands Cykle Klub',
  // LocationRegion: null,
  // CustomText: null,
  // HasResults: false,
  DcuRegion: string; // 'west',
  // IsSkoleOL: false,
  // RegFlags: 16384,
  // RegFlags2: 6,
  // EntryEndDate: '/Date(1661723940000)/'
};

async function main() {
  const url =
    "https://www.sportstiming.dk/app/dcu/searchevents?type=Coming&keyword=&maxResults=250&page=0&federation=DCU%20Request%20Method:%20GET";
  const req = await fetch(url);
  const json = (await req.json()) as {
    Events: SportsData[];
  };
  writeFileSync(
    "../data/raw.js",
    "export default " +
      JSON.stringify(
        json.Events.map(
          ({ EventId, Name, Date, EventTypeName, Location, DcuRegion }) => ({
            EventId,
            Name,
            Date,
            EventTypeName,
            Location,
            DcuRegion,
          })
        ),
        null,
        2
      )
  );
}

main();
