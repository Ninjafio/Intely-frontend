export interface IPickupPoint {
    id: string;
    address: string;
    type: string;
    schedule: string;
}

export const MOCK_PICKUPS: IPickupPoint[] = [
  {
    id: '1',
    address: 'г. Челябинск, ул. Разина, д. 3 офис 908/19',
    type: 'Магазин',
    schedule: 'Круглосуточно'
  },
  {
    id: '2',
    address: 'г. Челябинск, ул. Разина, д. 3 офис 908/19',
    type: 'Магазин',
    schedule: 'Круглосуточно'
  },
  {
    id: '3',
    address: 'г. Челябинск, ул. Разина, д. 3 офис 908/19',
    type: 'Магазин',
    schedule: 'Круглосуточно'
  },
  {
    id: '4',
    address: 'г. Челябинск, ул. Разина, д. 3 офис 908/19',
    type: 'Магазин',
    schedule: 'Круглосуточно'
  },
]