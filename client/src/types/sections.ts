export enum SectionsId {
    daily = 'daily',
    average = 'average',
    hourly = 'hourly',
}

export interface ISection {
    id: SectionsId;
    visible: boolean;
}

export interface ISectionView {
    id: string;
    component: string;
    visible: boolean;
}
