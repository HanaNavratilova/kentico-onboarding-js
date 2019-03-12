export enum ItemStatus {
  NothingIsHappening = 'NothingIsHappening',
  BeingProcessed = 'BeingProcessed',
  SavingFailed = 'SavingFailed',
  DeletionFailed = 'DeletionFailed'
}

export const getItemStatusArray = (): ItemStatus[] =>  [ItemStatus.NothingIsHappening, ItemStatus.BeingProcessed, ItemStatus.SavingFailed, ItemStatus.DeletionFailed];
