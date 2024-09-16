import { useQuery } from '@tanstack/react-query'
import { cmeData, CommonEventData, EventItem, gstData, Instrument } from '@/types.ts'

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY

type NASAData = {
  GST: gstData
  CME: cmeData
  FLR: EventItem[]
  RBE: EventItem[]
  SEP: EventItem[]
  MPC: EventItem[]
  /*IPS: any
  HSS: any
  notifications: any*/
}

type UseNASADataOptions<T extends keyof NASAData> = {
  defaultStartDate?: string
  defaultEndDate?: string
  dataType: T
}

const parseIDFromCommonEventItem = (item: EventItem): string | undefined => {
  if ('flrID' in item) {
    return item.flrID
  } else if ('rbeID' in item) {
    return item.rbeID
  } else if ('sepID' in item) {
    return item.sepID
  } else if ('mpcID' in item) {
    return item.mpcID
  }
  return undefined
}

export function useNASAData<T extends keyof NASAData>({
  defaultStartDate = '2023-08-01',
  defaultEndDate = '2023-09-30',
  dataType,
}: UseNASADataOptions<T>) {
  return (startDate?: Date, endDate?: Date) => {
    if (!['GST', 'CME', 'FLR', 'RBE', 'SEP', 'MPC'].includes(dataType)) {
      throw new Error(`Invalid NASA data type: ${dataType}`)
    }

    const startDateParam = startDate?.toISOString().split('T')[0] || defaultStartDate
    const endDateParam = endDate?.toISOString().split('T')[0] || defaultEndDate

    const { isLoading, error, data } = useQuery<NASAData[T], Error>({
      queryKey: [`${dataType}DATA`, startDateParam, endDateParam],
      queryFn: () =>
        fetch(
          `https://api.nasa.gov/DONKI/${dataType}?startDate=${startDateParam}&endDate=${endDateParam}&api_key=${NASA_API_KEY}`
        ).then((res) => {
          if (res.status === 429) {
            return { error: 'NASA API rate limit exceeded' }
          } else if (res.status !== 200) {
            return { error: 'NASA API error' }
          }
          return res.json()
        }),
    })
    if (['FLR', 'RBE', 'SEP', 'MPC'].includes(dataType)) {
      const normalizedData: CommonEventData[] = (data as EventItem[])?.map(
        (item: EventItem): CommonEventData => {
          return {
            id: parseIDFromCommonEventItem(item) || '',
            time: item.eventTime || item.beginTime || item.peakTime,
            instruments: (item.instruments || []).map(
              (instrument: Instrument) => instrument.displayName
            ),
            linkedEvents: item.linkedEvents || [],
          }
        }
      )

      return { isLoading, error, data: normalizedData }
    }

    return { isLoading, error, data: data as NASAData[T] }
  }
}

export const useNASA = (dataType: string) =>
  useNASAData({ dataType: dataType as keyof NASAData })
export const useCME = useNASAData({ dataType: 'CME', defaultStartDate: '2023-09-14' })

export const useGST = useNASAData({ dataType: 'GST' })
/*export const useIPS = useNASAData({ dataType: 'IPS' })
export const useHSS = useNASAData({ dataType: 'HSS' })
export const useNotifications = useNASAData({ dataType: 'notifications' })
*/
