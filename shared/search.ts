export type OMDbEntryType = 'movie' | 'series' | 'episode';
export type PlotType = 'short' | 'full'


export type OMDbSearchQuery = {
    s: string;
    y?: number;
    type?: OMDbEntryType;
    plot?: PlotType;
    tomatoes?: boolean;
}