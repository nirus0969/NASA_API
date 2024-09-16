export type CmeAnalysis = {
  time21_5: string
  latitude: number
  longitude: number
  halfAngle: number
  speed: number
  type: string
  isMostAccurate: boolean
  note: string
  levelOfData: number
  link: string
}

export type CmeActivity = {
  activityID: string
  catalog: string
  startTime: string
  sourceLocation: string
  activeRegionNum: number | null
  link: string
  note: string
  cmeAnalyses: CmeAnalysis[]
}

export type cmeData = CmeActivity[]

type AllKpIndex = {
  observedTime: string
  kpIndex: number
  source: string
}

type LinkedEvent2 = {
  activityID: string
}

type gst = {
  gstID: string
  startTime: string
  allKpIndex: AllKpIndex[]
  linkedEvents: LinkedEvent2[]
  link: string
}

export type gstData = gst[]

export type NasaApodResponse = {
  url: string
  hdurl: string
  media_type: 'image' | 'video'
}

export interface Instrument {
  displayName: string
}

export interface LinkedEvent {
  activityID: string
}

export type CommonEventData = {
  id: string
  time?: string
  instruments: string[]
  linkedEvents: LinkedEvent[]
}

interface BaseEventItem {
  eventTime?: string
  beginTime?: string
  peakTime?: string
  endTime?: string
  instruments: Instrument[]
  linkedEvents: LinkedEvent[]
  link: string
}

interface FlrEvent extends BaseEventItem {
  flrID: string
}

interface RbeEvent extends BaseEventItem {
  rbeID: string
}

interface SepEvent extends BaseEventItem {
  sepID: string
}

interface MpcEvent extends BaseEventItem {
  mpcID: string
}

export type FavLink = {
  route: string
  name: string
  isFavorite: boolean
  toggleFavorite: (link: string) => void
}

export type EventItem = FlrEvent | RbeEvent | SepEvent | MpcEvent
