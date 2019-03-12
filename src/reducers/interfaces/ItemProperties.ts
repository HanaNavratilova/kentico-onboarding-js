export enum ItemStatus {
  NothingIsHappening = 'NothingIsHappening',
  BeingProcessed = 'BeingProcessed',
  SavingFailed = 'SavingFailed',
  DeletionFailed = 'DeletionFailed'
}

export interface ItemProperties {
  readonly status: ItemStatus;
  readonly newText: string;
  readonly errorMessage: string;
}

export const getItemStatusArray = (): ItemStatus[] =>  [ItemStatus.NothingIsHappening, ItemStatus.BeingProcessed, ItemStatus.SavingFailed, ItemStatus.DeletionFailed];
